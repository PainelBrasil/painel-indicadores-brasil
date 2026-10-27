#!/usr/bin/env python3
"""Coleta os indicadores oficiais e gera data/data.json e data/data.js.

Fontes automáticas:
  - IBGE, API de dados agregados (SIDRA): https://servicodados.ibge.gov.br/api/docs/agregados?versao=3
  - Banco Central, SGS: https://dadosabertos.bcb.gov.br

Fontes manuais: data/manual/valores.csv (uma linha por indicador e período).

Uso:
  python scripts/atualizar_dados.py            # coleta tudo
  python scripts/atualizar_dados.py --sem-rede # só reaplica os valores manuais

Usa apenas a biblioteca padrão do Python (nada para instalar).
"""
import argparse
import csv
import datetime as dt
import json
import os
import sys
import time
from urllib import error, request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CATALOGO = os.path.join(RAIZ, "scripts", "catalogo.json")
MANUAL = os.path.join(RAIZ, "data", "manual", "valores.csv")
SAIDA_JSON = os.path.join(RAIZ, "data", "data.json")
SAIDA_JS = os.path.join(RAIZ, "data", "data.js")
CABECALHOS = {"User-Agent": "painel-indicadores-brasil/1.0", "Accept": "application/json"}


INICIO = time.monotonic()
LIMITE_TOTAL = 900  # segundos; depois disso as consultas restantes são abandonadas


def log(texto):
    print(texto, flush=True)


def http_json(url, tentativas=2, espera=2, timeout=30):
    ultimo = None
    for i in range(tentativas):
        if time.monotonic() - INICIO > LIMITE_TOTAL:
            raise RuntimeError("tempo total da coleta esgotado")
        try:
            log(f"  consultando (tentativa {i + 1}): {url[:120]}")
            req = request.Request(url, headers=CABECALHOS)
            with request.urlopen(req, timeout=timeout) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except Exception as exc:  # noqa: BLE001 - qualquer falha de rede ou leitura
            ultimo = exc
            log(f"  falhou: {exc}")
            time.sleep(espera * (i + 1))
    raise RuntimeError(f"falha ao acessar {url}: {ultimo}")


def rotulo_periodo_sidra(codigo, periodicidade):
    """Converte o código de período do SIDRA em rótulo ordenável."""
    if periodicidade == "mensal":
        ano, mes = codigo[:4], int(codigo[4:6])
        if not 1 <= mes <= 12:
            raise ValueError(f"mês inválido no período {codigo}")
        return f"{ano}-{mes:02d}"
    if periodicidade == "trimestral":
        ano, tri = codigo[:4], int(codigo[4:6])
        if not 1 <= tri <= 4:
            raise ValueError(f"trimestre inválido no período {codigo}")
        return f"{ano}-T{tri}"
    return codigo[:4]


def numero(texto):
    try:
        return float(str(texto).replace(",", "."))
    except ValueError:
        return None  # "-", "..." e "X" indicam dado ausente ou sigiloso


def interpretar_sidra(dados, periodicidade):
    """Extrai (nome, unidade, [(período, valor), ...]) da resposta da API do IBGE."""
    variavel = dados[0]
    resultados = variavel["resultados"]
    if len(resultados) != 1:
        raise ValueError(f"esperava 1 resultado, a API devolveu {len(resultados)}")
    series = resultados[0]["series"]
    if len(series) != 1:
        raise ValueError(f"esperava 1 localidade, a API devolveu {len(series)}")
    pontos = []
    for codigo, valor in series[0]["serie"].items():
        v = numero(valor)
        if v is not None:
            pontos.append((rotulo_periodo_sidra(codigo, periodicidade), v))
    pontos.sort()
    return variavel.get("variavel", ""), variavel.get("unidade", ""), pontos


def interpretar_apisidra(dados, periodicidade, filtro_var=None):
    """Interpreta a resposta do endereço alternativo apisidra.ibge.gov.br."""
    cab, linhas = dados[0], dados[1:]
    chave = next((k for k, v in cab.items() if k.endswith("C") and any(
        t in v for t in ("Mês", "Trimestre", "Ano"))), None)
    if not chave:
        raise ValueError("resposta do apisidra sem coluna de período")
    chave_var = next((k for k, v in cab.items() if v == "Variável" and k.endswith("N")), None)
    pontos, vistos = [], set()
    for l in linhas:
        if filtro_var and (not chave_var or filtro_var.lower() not in l.get(chave_var, "").lower()):
            continue
        v = numero(l["V"])
        if v is None:
            continue
        rot = rotulo_periodo_sidra(l[chave], periodicidade)
        if rot in vistos:
            raise ValueError(f"período repetido ({rot}): a consulta devolveu mais de uma série; filtro insuficiente")
        vistos.add(rot)
        pontos.append((rot, v))
    pontos.sort()
    if not pontos and filtro_var:
        nomes = sorted({l.get(chave_var, "?") for l in linhas})[:8] if chave_var else []
        log(f"  DIAGNÓSTICO: filtro '{filtro_var}' não achou nada. Cabeçalho: {cab}")
        log(f"  DIAGNÓSTICO: {len(linhas)} linhas; variáveis: {nomes}; exemplo: {linhas[:2]}")
    return cab.get("V", ""), cab.get("MN", ""), pontos


IBGE_FORA = False  # apisidra também falhou nesta execução
V3_FORA = False  # o endereço principal (servicodados) falhou; não insistir nos demais


def coletar_sidra(ind):
    global IBGE_FORA, V3_FORA
    c = ind["coleta"]
    if IBGE_FORA:
        raise RuntimeError("IBGE fora do ar nesta execução (já falhou antes)")
    if not V3_FORA and not c.get("variavel_nome"):
        url = (
            f"https://servicodados.ibge.gov.br/api/v3/agregados/{c['agregado']}"
            f"/periodos/all/variaveis/{c['variavel']}?localidades=N1[all]"
        )
        if c.get("classificacao"):
            url += f"&classificacao={c['classificacao']}"
        try:
            dados = http_json(url, tentativas=1, timeout=45)
            nome, unidade, pontos = interpretar_sidra(dados, ind["periodicidade"])
            if not pontos:
                raise ValueError("a API não devolveu valores")
            return pontos, {"nomeNaFonte": nome, "unidadeNaFonte": unidade}
        except Exception as exc:  # noqa: BLE001 - tenta o endereço alternativo
            V3_FORA = True
            log(f"  endereço principal falhou ({exc}); usando apisidra daqui em diante")
    import re
    var = c.get("variavel_nome") and "all" or c["variavel"]
    alt = f"https://apisidra.ibge.gov.br/values/t/{c['agregado']}/n1/all/v/{var}/p/all"
    if c.get("classificacao"):
        for cl, cat in re.findall(r"(\d+)\[([^\]]+)\]", c["classificacao"]):
            alt += f"/c{cl}/{cat}"
    try:
        dados = http_json(alt, tentativas=1, timeout=60)
    except Exception:
        IBGE_FORA = True
        raise
    nome, unidade, pontos = interpretar_apisidra(dados, ind["periodicidade"], c.get("variavel_nome"))
    if not pontos:
        raise ValueError("a API não devolveu valores")
    return pontos, {"nomeNaFonte": nome, "unidadeNaFonte": unidade}


def interpretar_sgs(registros):
    """Agrupa a série diária do BCB em valor do último dia de cada mês."""
    por_dia = {}
    for r in registros:
        dia, mes, ano = r["data"].split("/")
        v = numero(r["valor"])
        if v is not None:
            por_dia[f"{ano}-{mes}-{dia}"] = v
    por_mes = {}
    for dia in sorted(por_dia):
        por_mes[dia[:7]] = por_dia[dia]
    return sorted(por_mes.items())


def coletar_sgs(ind):
    c = ind["coleta"]
    inicio = dt.date.fromisoformat(c.get("inicio", "2000-01-01"))
    hoje = dt.date.today()
    registros = []
    janela_ini = inicio
    # O SGS limita consultas de séries diárias a 10 anos; usamos blocos de 5.
    while janela_ini <= hoje:
        janela_fim = min(dt.date(janela_ini.year + 4, 12, 31), hoje)
        url = (
            f"https://api.bcb.gov.br/dados/serie/bcdata.sgs.{c['serie']}/dados?formato=json"
            f"&dataInicial={janela_ini:%d/%m/%Y}&dataFinal={janela_fim:%d/%m/%Y}"
        )
        try:
            registros.extend(http_json(url, tentativas=3, espera=4, timeout=40))
            time.sleep(1)
        except RuntimeError as exc:
            if "404" in str(exc):  # o SGS responde 404 quando a série não tem dados no período
                log("  sem dados neste período (404); seguindo")
            else:
                raise
        janela_ini = dt.date(janela_fim.year + 1, 1, 1)
    pontos = interpretar_sgs(registros)
    if not pontos:
        raise ValueError("a API não devolveu valores")
    return pontos, {}


def ler_manuais():
    manuais = {}
    if not os.path.exists(MANUAL):
        return manuais
    with open(MANUAL, newline="", encoding="utf-8") as f:
        for linha in csv.DictReader(f):
            if not linha.get("indicador") or linha["indicador"].startswith("#"):
                continue
            manuais.setdefault(linha["indicador"].strip(), []).append(linha)
    return manuais


def carregar_anterior():
    if os.path.exists(SAIDA_JSON):
        try:
            with open(SAIDA_JSON, encoding="utf-8") as f:
                antigo = json.load(f)
            return {i["id"]: i for i in antigo.get("indicadores", [])}
        except (ValueError, KeyError):
            pass
    return {}


def montar(sem_rede=False):
    with open(CATALOGO, encoding="utf-8") as f:
        catalogo = json.load(f)
    manuais = ler_manuais()
    anterior = carregar_anterior()
    hoje = dt.date.today().isoformat()
    ids = {i["id"] for i in catalogo["indicadores"]}
    for desconhecido in sorted(set(manuais) - ids):
        print(f"AVISO: valores.csv cita o indicador '{desconhecido}', que não está no catálogo.")

    saida, falhas, tentativas = [], 0, 0
    for ind in catalogo["indicadores"]:
        item = {k: v for k, v in ind.items() if k != "coleta"}
        tipo = ind["coleta"]["tipo"]
        antigo = anterior.get(ind["id"], {})
        item["serie"], item["status"], item["coletadoEm"] = [], "aguardando", None
        item["origem"] = "manual" if tipo == "manual" else "api"

        if tipo == "manual":
            linhas = manuais.get(ind["id"], [])
            pontos = sorted((l["periodo"].strip(), float(l["valor"])) for l in linhas)
            item["serie"] = [[p, v] for p, v in pontos]
            fontes = {}
            for l in linhas:
                fontes[(l["fonte"], l["link"])] = l.get("verificacao", "secundaria").strip()
            item["fontesManuais"] = [
                {"fonte": f, "link": lk, "verificacao": vf} for (f, lk), vf in fontes.items()
            ]
            if pontos:
                conferir = any(vf != "primaria" for vf in fontes.values())
                item["status"] = "manual_conferir" if conferir else "manual_oficial"
                item["coletadoEm"] = hoje
        else:
            linhas = manuais.get(ind["id"], [])  # valores iniciais, usados só enquanto a API não responde

            def usar_valores_iniciais():
                pontos = sorted((l["periodo"].strip(), float(l["valor"])) for l in linhas)
                item["serie"] = [[p, v] for p, v in pontos]
                item["status"] = "inicial"
                item["coletadoEm"] = hoje
                item["fontesManuais"] = [
                    {"fonte": l["fonte"], "link": l["link"], "verificacao": l.get("verificacao", "secundaria").strip()}
                    for l in linhas[:1]
                ]

            if sem_rede:
                if antigo.get("serie"):
                    item.update({k: antigo[k] for k in ("serie", "status", "coletadoEm") if k in antigo})
                elif linhas:
                    usar_valores_iniciais()
            else:
                tentativas += 1
                log(f"BUSCA {ind['id']} ({tipo}), {time.monotonic() - INICIO:.0f}s desde o início")
                try:
                    coletor = coletar_sidra if tipo == "sidra" else coletar_sgs
                    try:
                        pontos, extra = coletor(ind)
                    except Exception as exc_principal:  # noqa: BLE001
                        alt = ind["coleta"].get("alt_sgs")
                        if not alt:
                            raise
                        log(f"  fonte principal falhou ({exc_principal}); usando Banco Central SGS {alt['serie']}")
                        pontos, extra = coletar_sgs({"coleta": {"serie": alt["serie"], "inicio": alt.get("inicio", "2000-01-01")}})
                        if alt.get("trimestral"):
                            pontos = [(f"{p[:4]}-T{int(p[5:7]) // 3}", v) for p, v in pontos if int(p[5:7]) % 3 == 0]
                        extra = {"fonteAlternativa": f"Banco Central (SGS {alt['serie']}), que republica a série do IBGE"}
                    item["serie"] = [[p, v] for p, v in pontos]
                    item["status"] = "api"
                    item["coletadoEm"] = hoje
                    item.update(extra)
                    log(f"OK    {ind['id']}: {len(pontos)} pontos, último {pontos[-1]}")
                except Exception as exc:  # noqa: BLE001 - registrar e seguir com os demais
                    falhas += 1
                    log(f"ERRO  {ind['id']}: {exc}")
                    if antigo.get("serie"):
                        item["serie"] = antigo["serie"]
                        item["coletadoEm"] = antigo.get("coletadoEm")
                    elif linhas:
                        usar_valores_iniciais()
                    item["status"] = "erro"
                    item["erro"] = str(exc)[:300]
        saida.append(item)

    return {
        "geradoEm": dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "pilares": catalogo["pilares"],
        "indicadores": saida,
    }, falhas, tentativas


def diagnosticar(tabelas):
    """Só registra no log como são as tabelas (para escolher filtros). Não altera os dados."""
    for t in tabelas:
        log(f"DIAGNOSTICO tabela {t}")
        try:
            meta = http_json(f"https://servicodados.ibge.gov.br/api/v3/agregados/{t}/metadados", tentativas=1, timeout=20)
            log(f"  nome: {meta.get('nome')}")
            log("  variaveis: " + "; ".join(f"{v['id']}={v['nome']}" for v in meta.get("variaveis", [])))
            for cl in meta.get("classificacoes", []):
                cats = ", ".join(f"{c['id']}={c['nome']}" for c in cl.get("categorias", [])[:25])
                log(f"  classificacao {cl['id']} ({cl['nome']}): {cats}")
            continue
        except Exception as exc:  # noqa: BLE001
            log(f"  metadados indisponíveis: {exc}")
        sondar([f"https://apisidra.ibge.gov.br/desctabapi.aspx?c={t}"])
        try:
            dados = http_json(f"https://apisidra.ibge.gov.br/values/t/{t}/n1/all/v/all/p/last", tentativas=1, timeout=45)
            log("  cabecalho: " + json.dumps(dados[0], ensure_ascii=False))
            for l in dados[1:6]:
                log("  linha: " + json.dumps(l, ensure_ascii=False))
        except Exception as exc:  # noqa: BLE001
            log(f"  apisidra indisponível: {exc}")


def sondar(urls):
    """Só testa se o GitHub alcança estes endereços e registra o início da resposta no log."""
    import re
    for u in urls:
        log(f"SONDA {u}")
        try:
            req = request.Request(u, headers=CABECALHOS)
            with request.urlopen(req, timeout=25) as r:
                corpo = r.read(200000).decode("utf-8", "replace")
                tipo = r.headers.get("Content-Type", "")
                log(f"  status {r.status}, tipo {tipo}, {len(corpo)} caracteres lidos")
                limpo = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", corpo)) if "html" in tipo else corpo
                log("  início: " + limpo[:1500])
        except error.HTTPError as exc:
            log(f"  HTTP {exc.code}")
        except Exception as exc:  # noqa: BLE001
            log(f"  falhou: {exc}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--sem-rede", action="store_true", help="não acessa as APIs; reaplica só os valores manuais")
    args = ap.parse_args()

    dados, falhas, tentativas = montar(sem_rede=args.sem_rede)
    if not args.sem_rede:
        with open(CATALOGO, encoding="utf-8") as f:
            cat = json.load(f)
        diagnosticar(cat.get("diagnostico_sidra", []))
        sondar(cat.get("sondas", []))
    texto = json.dumps(dados, ensure_ascii=False, indent=1)
    with open(SAIDA_JSON, "w", encoding="utf-8") as f:
        f.write(texto + "\n")
    with open(SAIDA_JS, "w", encoding="utf-8") as f:
        f.write("window.PAINEL = " + texto + ";\n")
    print(f"Gerado: {SAIDA_JS}")
    if tentativas and falhas == tentativas:
        print("Nenhuma coleta automática funcionou.")
        sys.exit(2)


if __name__ == "__main__":
    main()

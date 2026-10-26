# Painel Indicadores Brasil

Painel de indicadores oficiais do Brasil (nível nacional), com evolução ao longo do tempo, fonte e data de coleta em cada número.

## Como funciona

- `index.html`: o painel. Lê os dados de `data/data.js` e não precisa de servidor.
- `data/data.js` e `data/data.json`: dados gerados. Não edite à mão.
- `scripts/catalogo.json`: lista dos indicadores (nome, fonte, tabela de origem, periodicidade).
- `scripts/atualizar_dados.py`: busca as séries nas APIs oficiais (IBGE/SIDRA e Banco Central/SGS) e gera os arquivos de `data/`. Usa só a biblioteca padrão do Python.
- `data/manual/valores.csv`: valores de indicadores sem API simples (segurança, saúde, educação). Uma linha por indicador e período, com fonte, link e se foi conferido na fonte primária (`primaria` ou `secundaria`).
- `.github/workflows/atualizar-dados.yml`: roda o script todo dia às 06h (Brasília) no GitHub e salva os dados novos no repositório. Também pode ser disparado manualmente na aba Actions.

## Indicadores automáticos

IPCA mensal e em 12 meses, desocupação (PNAD Contínua), PIB trimestral e em 4 trimestres, meta Selic e dólar. Enquanto a primeira coleta automática não rodar, o painel mostra apenas os valores iniciais registrados em `valores.csv`.

## Atualizar um valor manual

1. Abra `data/manual/valores.csv`.
2. Acrescente uma linha: `indicador,periodo,valor,fonte,link,verificacao`.
   - Períodos: anual `2025`, mensal `2026-09`, trimestral `2026-T2`.
   - Decimal com ponto (`19.1`).
   - Use `primaria` só se o valor foi conferido no documento do próprio órgão.
3. Rode `python scripts/atualizar_dados.py --sem-rede` (ou aguarde a rotina diária).

## Testar no computador

```
python scripts/atualizar_dados.py
```

Depois abra `index.html` no navegador.

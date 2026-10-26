window.PAINEL = {
 "geradoEm": "2026-10-26T21:49:19Z",
 "pilares": [
  {
   "id": "economia",
   "nome": "Economia e trabalho"
  },
  {
   "id": "seguranca",
   "nome": "Segurança pública"
  },
  {
   "id": "saude",
   "nome": "Saúde"
  },
  {
   "id": "educacao",
   "nome": "Educação"
  }
 ],
 "indicadores": [
  {
   "id": "ipca_mensal",
   "pilar": "economia",
   "nome": "IPCA, variação mensal",
   "unidade": "% ao mês",
   "sufixo": " %",
   "casas": 2,
   "periodicidade": "mensal",
   "fonte": "IBGE",
   "fonte_detalhe": "IPCA, Sistema SIDRA, tabela 1737",
   "url_fonte": "https://sidra.ibge.gov.br/tabela/1737",
   "nota": "Índice oficial de inflação. Valores negativos indicam queda média de preços no mês.",
   "serie": [
    [
     "2026-08",
     -0.32
    ],
    [
     "2026-09",
     0.82
    ]
   ],
   "status": "inicial",
   "coletadoEm": "2026-10-26",
   "origem": "api",
   "fontesManuais": [
    {
     "fonte": "IBGE, Painel de Indicadores (valores iniciais até a primeira coleta automática), lido em 26/10/2026",
     "link": "https://www.ibge.gov.br/indicadores",
     "verificacao": "primaria"
    }
   ]
  },
  {
   "id": "ipca_12m",
   "pilar": "economia",
   "nome": "IPCA acumulado em 12 meses",
   "unidade": "% em 12 meses",
   "sufixo": " %",
   "casas": 2,
   "periodicidade": "mensal",
   "fonte": "IBGE",
   "fonte_detalhe": "IPCA, Sistema SIDRA, tabela 1737",
   "url_fonte": "https://sidra.ibge.gov.br/tabela/1737",
   "nota": "Inflação acumulada nos 12 meses até o mês indicado.",
   "serie": [
    [
     "2026-09",
     4.58
    ]
   ],
   "status": "inicial",
   "coletadoEm": "2026-10-26",
   "origem": "api",
   "fontesManuais": [
    {
     "fonte": "IBGE, Painel de Indicadores (valores iniciais até a primeira coleta automática), lido em 26/10/2026",
     "link": "https://www.ibge.gov.br/indicadores",
     "verificacao": "primaria"
    }
   ]
  },
  {
   "id": "desocupacao",
   "pilar": "economia",
   "nome": "Taxa de desocupação",
   "unidade": "% da força de trabalho",
   "sufixo": " %",
   "casas": 1,
   "periodicidade": "trimestral",
   "fonte": "IBGE",
   "fonte_detalhe": "PNAD Contínua trimestral, Sistema SIDRA, tabela 4099",
   "url_fonte": "https://sidra.ibge.gov.br/tabela/4099",
   "nota": "Pessoas de 14 anos ou mais sem trabalho que procuraram emprego, em relação à força de trabalho.",
   "serie": [
    [
     "2026-T1",
     6.1
    ],
    [
     "2026-T2",
     5.4
    ]
   ],
   "status": "inicial",
   "coletadoEm": "2026-10-26",
   "origem": "api",
   "fontesManuais": [
    {
     "fonte": "IBGE, Painel de Indicadores (valores iniciais até a primeira coleta automática), lido em 26/10/2026",
     "link": "https://www.ibge.gov.br/indicadores",
     "verificacao": "primaria"
    }
   ]
  },
  {
   "id": "pib_trimestral",
   "pilar": "economia",
   "nome": "PIB, variação sobre o trimestre anterior",
   "unidade": "% (com ajuste sazonal)",
   "sufixo": " %",
   "casas": 1,
   "periodicidade": "trimestral",
   "fonte": "IBGE",
   "fonte_detalhe": "Contas Nacionais Trimestrais, Sistema SIDRA, tabela 5932",
   "url_fonte": "https://sidra.ibge.gov.br/tabela/5932",
   "nota": "PIB a preços de mercado, índice de volume, comparado ao trimestre imediatamente anterior.",
   "serie": [],
   "status": "aguardando",
   "coletadoEm": null,
   "origem": "api"
  },
  {
   "id": "pib_4tri",
   "pilar": "economia",
   "nome": "PIB, acumulado em 4 trimestres",
   "unidade": "% em 4 trimestres",
   "sufixo": " %",
   "casas": 1,
   "periodicidade": "trimestral",
   "fonte": "IBGE",
   "fonte_detalhe": "Contas Nacionais Trimestrais, Sistema SIDRA, tabela 5932",
   "url_fonte": "https://sidra.ibge.gov.br/tabela/5932",
   "nota": "Variação do volume do PIB nos últimos quatro trimestres contra os quatro anteriores.",
   "serie": [
    [
     "2026-T2",
     1.9
    ]
   ],
   "status": "inicial",
   "coletadoEm": "2026-10-26",
   "origem": "api",
   "fontesManuais": [
    {
     "fonte": "IBGE, Painel de Indicadores (valores iniciais até a primeira coleta automática), lido em 26/10/2026",
     "link": "https://www.ibge.gov.br/indicadores",
     "verificacao": "primaria"
    }
   ]
  },
  {
   "id": "selic_meta",
   "pilar": "economia",
   "nome": "Meta da taxa Selic",
   "unidade": "% ao ano",
   "sufixo": " %",
   "casas": 2,
   "periodicidade": "mensal",
   "degrau": true,
   "fonte": "Banco Central do Brasil",
   "fonte_detalhe": "Meta Selic definida pelo Copom, SGS série 432 (valor do último dia de cada mês)",
   "url_fonte": "https://dadosabertos.bcb.gov.br/dataset/432-taxa-de-juros---meta-selic-definida-pelo-copom",
   "nota": "A série oficial é diária; o painel mostra o valor vigente no último dia de cada mês.",
   "serie": [],
   "status": "aguardando",
   "coletadoEm": null,
   "origem": "api"
  },
  {
   "id": "dolar_venda",
   "pilar": "economia",
   "nome": "Dólar comercial, cotação de venda",
   "unidade": "R$ por US$",
   "prefixo": "R$ ",
   "casas": 2,
   "periodicidade": "mensal",
   "fonte": "Banco Central do Brasil",
   "fonte_detalhe": "Taxa de câmbio livre, dólar americano (venda), SGS série 1 (valor do último dia de cada mês)",
   "url_fonte": "https://dadosabertos.bcb.gov.br/dataset?q=taxa+de+c%C3%A2mbio+livre+d%C3%B3lar",
   "nota": "A série oficial é diária; o painel mostra a cotação do último dia de cada mês.",
   "serie": [],
   "status": "aguardando",
   "coletadoEm": null,
   "origem": "api"
  },
  {
   "id": "mvi_total",
   "pilar": "seguranca",
   "nome": "Mortes violentas intencionais (MVI)",
   "unidade": "mortes por ano",
   "casas": 0,
   "periodicidade": "anual",
   "fonte": "Fórum Brasileiro de Segurança Pública",
   "fonte_detalhe": "Anuário Brasileiro de Segurança Pública",
   "url_fonte": "https://forumseguranca.org.br/anuario-brasileiro-de-seguranca-publica/",
   "nota": "Soma de homicídios dolosos, latrocínios, lesões corporais seguidas de morte e mortes por intervenção policial. Os números diferem entre FBSP, Sinesp e DATASUS por diferenças de metodologia.",
   "serie": [
    [
     "2024",
     44127.0
    ],
    [
     "2025",
     40775.0
    ]
   ],
   "status": "manual_conferir",
   "coletadoEm": "2026-10-26",
   "origem": "manual",
   "fontesManuais": [
    {
     "fonte": "Anuário Brasileiro de Segurança Pública 2026 (FBSP), lido em reportagem do Jornal do Brasil de 24/07/2026",
     "link": "https://www.jb.com.br/brasil/2026/07/1060384-brasil-tem-menor-taxa-de-mortes-violentas-intencionais-desde-2012.html",
     "verificacao": "secundaria"
    }
   ]
  },
  {
   "id": "mvi_taxa",
   "pilar": "seguranca",
   "nome": "Taxa de MVI por 100 mil habitantes",
   "unidade": "por 100 mil habitantes",
   "casas": 1,
   "periodicidade": "anual",
   "fonte": "Fórum Brasileiro de Segurança Pública",
   "fonte_detalhe": "Anuário Brasileiro de Segurança Pública",
   "url_fonte": "https://forumseguranca.org.br/anuario-brasileiro-de-seguranca-publica/",
   "nota": "Taxa de mortes violentas intencionais em relação à população.",
   "serie": [
    [
     "2012",
     27.7
    ],
    [
     "2025",
     19.1
    ]
   ],
   "status": "manual_conferir",
   "coletadoEm": "2026-10-26",
   "origem": "manual",
   "fontesManuais": [
    {
     "fonte": "Anuário Brasileiro de Segurança Pública 2026 (FBSP), lido em reportagem do Jornal do Brasil de 24/07/2026",
     "link": "https://www.jb.com.br/brasil/2026/07/1060384-brasil-tem-menor-taxa-de-mortes-violentas-intencionais-desde-2012.html",
     "verificacao": "secundaria"
    }
   ]
  },
  {
   "id": "feminicidios",
   "pilar": "seguranca",
   "nome": "Feminicídios",
   "unidade": "vítimas por ano",
   "casas": 0,
   "periodicidade": "anual",
   "fonte": "Fórum Brasileiro de Segurança Pública",
   "fonte_detalhe": "Anuário Brasileiro de Segurança Pública",
   "url_fonte": "https://forumseguranca.org.br/anuario-brasileiro-de-seguranca-publica/",
   "nota": "Mulheres mortas por razões de gênero, conforme registros policiais.",
   "serie": [
    [
     "2025",
     1571.0
    ]
   ],
   "status": "manual_conferir",
   "coletadoEm": "2026-10-26",
   "origem": "manual",
   "fontesManuais": [
    {
     "fonte": "Anuário Brasileiro de Segurança Pública 2026 (FBSP), lido em reportagem do Jornal do Brasil de 24/07/2026",
     "link": "https://www.jb.com.br/brasil/2026/07/1060384-brasil-tem-menor-taxa-de-mortes-violentas-intencionais-desde-2012.html",
     "verificacao": "secundaria"
    }
   ]
  },
  {
   "id": "letalidade_policial",
   "pilar": "seguranca",
   "nome": "Mortes por intervenção policial",
   "unidade": "mortes por ano",
   "casas": 0,
   "periodicidade": "anual",
   "fonte": "Fórum Brasileiro de Segurança Pública",
   "fonte_detalhe": "Anuário Brasileiro de Segurança Pública",
   "url_fonte": "https://forumseguranca.org.br/anuario-brasileiro-de-seguranca-publica/",
   "pendente": "Falta o número anual absoluto. A reportagem consultada informa apenas alta de 5,4% em 2025.",
   "serie": [],
   "status": "aguardando",
   "coletadoEm": null,
   "origem": "manual",
   "fontesManuais": []
  },
  {
   "id": "populacao_carceraria",
   "pilar": "seguranca",
   "nome": "População carcerária e vagas",
   "unidade": "pessoas privadas de liberdade",
   "casas": 0,
   "periodicidade": "semestral",
   "fonte": "Secretaria Nacional de Políticas Penais (Senappen/MJSP)",
   "fonte_detalhe": "Sisdepen, estatísticas penitenciárias",
   "url_fonte": "https://www.gov.br/senappen/pt-br/servicos/sisdepen",
   "pendente": "Falta baixar o relatório oficial do Sisdepen e registrar a série.",
   "serie": [],
   "status": "aguardando",
   "coletadoEm": null,
   "origem": "manual",
   "fontesManuais": []
  },
  {
   "id": "mortalidade_infantil",
   "pilar": "saude",
   "nome": "Mortalidade infantil",
   "unidade": "óbitos por mil nascidos vivos",
   "casas": 1,
   "periodicidade": "anual",
   "fonte": "Ministério da Saúde",
   "fonte_detalhe": "SIM e SINASC (DATASUS); dado recente é preliminar",
   "url_fonte": "https://datasus.saude.gov.br/",
   "pendente": "Falta a série do Ministério da Saúde (óbitos de menores de 1 ano por mil nascidos vivos). Fonte escolhida: SIM/SINASC, com aviso de dado preliminar.",
   "serie": [],
   "status": "aguardando",
   "coletadoEm": null,
   "origem": "manual",
   "fontesManuais": []
  },
  {
   "id": "expectativa_vida",
   "pilar": "saude",
   "nome": "Expectativa de vida ao nascer",
   "unidade": "anos",
   "sufixo": " anos",
   "casas": 1,
   "periodicidade": "anual",
   "fonte": "IBGE",
   "fonte_detalhe": "Tábuas Completas de Mortalidade",
   "url_fonte": "https://www.ibge.gov.br/estatisticas/sociais/populacao/9126-tabuas-completas-de-mortalidade.html",
   "nota": "A série foi revista pelo IBGE após o Censo 2022. Valores de edições antigas da tábua não são comparáveis com os atuais.",
   "serie": [
    [
     "2022",
     75.5
    ],
    [
     "2023",
     76.4
    ]
   ],
   "status": "manual_conferir",
   "coletadoEm": "2026-10-26",
   "origem": "manual",
   "fontesManuais": [
    {
     "fonte": "IBGE, Tábuas Completas de Mortalidade 2023 (divulgada em 29/11/2024), lida em reportagem de A Gazeta",
     "link": "https://www.agazeta.com.br/brasil/expectativa-de-vida-ao-nascer-no-brasil-sobe-para-764-anos-em-2023-1124",
     "verificacao": "secundaria"
    }
   ]
  },
  {
   "id": "cobertura_vacinal",
   "pilar": "saude",
   "nome": "Cobertura vacinal",
   "unidade": "% da população-alvo",
   "casas": 1,
   "periodicidade": "anual",
   "fonte": "Ministério da Saúde",
   "fonte_detalhe": "Programa Nacional de Imunizações (PNI)",
   "url_fonte": "https://datasus.saude.gov.br/",
   "pendente": "Falta definir quais vacinas acompanhar (por exemplo, tríplice viral e poliomielite) e registrar a série do PNI.",
   "serie": [],
   "status": "aguardando",
   "coletadoEm": null,
   "origem": "manual",
   "fontesManuais": []
  },
  {
   "id": "cobertura_aps",
   "pilar": "saude",
   "nome": "Cobertura da Atenção Primária",
   "unidade": "% da população",
   "casas": 1,
   "periodicidade": "mensal",
   "fonte": "Ministério da Saúde",
   "fonte_detalhe": "e-Gestor Atenção Básica",
   "url_fonte": "https://egestorab.saude.gov.br/",
   "pendente": "Falta registrar a série de cobertura de Atenção Primária do e-Gestor.",
   "serie": [],
   "status": "aguardando",
   "coletadoEm": null,
   "origem": "manual",
   "fontesManuais": []
  },
  {
   "id": "ideb_anos_iniciais",
   "pilar": "educacao",
   "nome": "Ideb, anos iniciais do fundamental",
   "unidade": "nota de 0 a 10",
   "casas": 1,
   "periodicidade": "bienal",
   "fonte": "Inep / MEC",
   "fonte_detalhe": "Índice de Desenvolvimento da Educação Básica",
   "url_fonte": "https://www.gov.br/inep/pt-br/areas-de-atuacao/pesquisas-estatisticas-e-indicadores/ideb",
   "nota": "Combina taxa de aprovação e desempenho no Saeb. Divulgado a cada dois anos.",
   "serie": [
    [
     "2023",
     6.0
    ],
    [
     "2025",
     6.3
    ]
   ],
   "status": "manual_conferir",
   "coletadoEm": "2026-10-26",
   "origem": "manual",
   "fontesManuais": [
    {
     "fonte": "Ideb 2025, divulgado pelo MEC em 05/08/2026, lido em reportagem de O Povo",
     "link": "https://www.opovo.com.br/noticias/brasil/2026/08/05/ideb-mostra-avanco-da-educacao-basica-no-pais.html",
     "verificacao": "secundaria"
    }
   ]
  },
  {
   "id": "ideb_anos_finais",
   "pilar": "educacao",
   "nome": "Ideb, anos finais do fundamental",
   "unidade": "nota de 0 a 10",
   "casas": 1,
   "periodicidade": "bienal",
   "fonte": "Inep / MEC",
   "fonte_detalhe": "Índice de Desenvolvimento da Educação Básica",
   "url_fonte": "https://www.gov.br/inep/pt-br/areas-de-atuacao/pesquisas-estatisticas-e-indicadores/ideb",
   "nota": "Combina taxa de aprovação e desempenho no Saeb. Divulgado a cada dois anos.",
   "serie": [
    [
     "2023",
     5.0
    ],
    [
     "2025",
     5.3
    ]
   ],
   "status": "manual_conferir",
   "coletadoEm": "2026-10-26",
   "origem": "manual",
   "fontesManuais": [
    {
     "fonte": "Ideb 2025, divulgado pelo MEC em 05/08/2026, lido em reportagem de O Povo",
     "link": "https://www.opovo.com.br/noticias/brasil/2026/08/05/ideb-mostra-avanco-da-educacao-basica-no-pais.html",
     "verificacao": "secundaria"
    }
   ]
  },
  {
   "id": "ideb_ensino_medio",
   "pilar": "educacao",
   "nome": "Ideb, ensino médio",
   "unidade": "nota de 0 a 10",
   "casas": 1,
   "periodicidade": "bienal",
   "fonte": "Inep / MEC",
   "fonte_detalhe": "Índice de Desenvolvimento da Educação Básica",
   "url_fonte": "https://www.gov.br/inep/pt-br/areas-de-atuacao/pesquisas-estatisticas-e-indicadores/ideb",
   "nota": "Combina taxa de aprovação e desempenho no Saeb. Divulgado a cada dois anos.",
   "serie": [
    [
     "2023",
     4.3
    ],
    [
     "2025",
     4.5
    ]
   ],
   "status": "manual_conferir",
   "coletadoEm": "2026-10-26",
   "origem": "manual",
   "fontesManuais": [
    {
     "fonte": "Ideb 2025, divulgado pelo MEC em 05/08/2026, lido em reportagem de O Povo",
     "link": "https://www.opovo.com.br/noticias/brasil/2026/08/05/ideb-mostra-avanco-da-educacao-basica-no-pais.html",
     "verificacao": "secundaria"
    }
   ]
  },
  {
   "id": "analfabetismo",
   "pilar": "educacao",
   "nome": "Analfabetismo, 15 anos ou mais",
   "unidade": "% da população",
   "sufixo": " %",
   "casas": 1,
   "periodicidade": "anual",
   "fonte": "IBGE",
   "fonte_detalhe": "PNAD Contínua, suplemento de Educação",
   "url_fonte": "https://www.ibge.gov.br/estatisticas/sociais/educacao/17270-pnad-continua.html",
   "serie": [
    [
     "2024",
     5.3
    ],
    [
     "2025",
     4.9
    ]
   ],
   "status": "manual_oficial",
   "coletadoEm": "2026-10-26",
   "origem": "manual",
   "fontesManuais": [
    {
     "fonte": "IBGE, Painel de Indicadores (PNAD Contínua Educação), lido em 26/10/2026",
     "link": "https://www.ibge.gov.br/indicadores",
     "verificacao": "primaria"
    }
   ]
  },
  {
   "id": "escolarizacao",
   "pilar": "educacao",
   "nome": "Escolarização, 6 a 14 anos",
   "unidade": "% que frequenta escola",
   "sufixo": " %",
   "casas": 1,
   "periodicidade": "anual",
   "fonte": "IBGE",
   "fonte_detalhe": "PNAD Contínua, suplemento de Educação",
   "url_fonte": "https://www.ibge.gov.br/estatisticas/sociais/educacao/17270-pnad-continua.html",
   "serie": [
    [
     "2024",
     99.5
    ],
    [
     "2025",
     99.5
    ]
   ],
   "status": "manual_oficial",
   "coletadoEm": "2026-10-26",
   "origem": "manual",
   "fontesManuais": [
    {
     "fonte": "IBGE, Painel de Indicadores (PNAD Contínua Educação), lido em 26/10/2026",
     "link": "https://www.ibge.gov.br/indicadores",
     "verificacao": "primaria"
    }
   ]
  },
  {
   "id": "pisa_matematica",
   "pilar": "educacao",
   "nome": "PISA, matemática",
   "unidade": "pontos",
   "casas": 0,
   "periodicidade": "trienal",
   "fonte": "OCDE",
   "fonte_detalhe": "Programa Internacional de Avaliação de Estudantes",
   "url_fonte": "https://www.oecd.org/pt/publications/resultdos-do-pisa-2025-volume-i_afb355f4-pt/brasil_c7e013c5-pt",
   "pendente": "Resultados de 2025 publicados em 08/09/2026. Falta registrar as pontuações a partir da nota oficial do Brasil na OCDE.",
   "serie": [],
   "status": "aguardando",
   "coletadoEm": null,
   "origem": "manual",
   "fontesManuais": []
  },
  {
   "id": "pisa_leitura",
   "pilar": "educacao",
   "nome": "PISA, leitura",
   "unidade": "pontos",
   "casas": 0,
   "periodicidade": "trienal",
   "fonte": "OCDE",
   "fonte_detalhe": "Programa Internacional de Avaliação de Estudantes",
   "url_fonte": "https://www.oecd.org/pt/publications/resultdos-do-pisa-2025-volume-i_afb355f4-pt/brasil_c7e013c5-pt",
   "pendente": "Falta registrar as pontuações a partir da nota oficial do Brasil na OCDE.",
   "serie": [],
   "status": "aguardando",
   "coletadoEm": null,
   "origem": "manual",
   "fontesManuais": []
  },
  {
   "id": "pisa_ciencias",
   "pilar": "educacao",
   "nome": "PISA, ciências",
   "unidade": "pontos",
   "casas": 0,
   "periodicidade": "trienal",
   "fonte": "OCDE",
   "fonte_detalhe": "Programa Internacional de Avaliação de Estudantes",
   "url_fonte": "https://www.oecd.org/pt/publications/resultdos-do-pisa-2025-volume-i_afb355f4-pt/brasil_c7e013c5-pt",
   "pendente": "Falta registrar as pontuações a partir da nota oficial do Brasil na OCDE.",
   "serie": [],
   "status": "aguardando",
   "coletadoEm": null,
   "origem": "manual",
   "fontesManuais": []
  },
  {
   "id": "abandono_escolar",
   "pilar": "educacao",
   "nome": "Abandono e reprovação escolar",
   "unidade": "% de alunos",
   "casas": 1,
   "periodicidade": "anual",
   "fonte": "Inep",
   "fonte_detalhe": "Censo Escolar, taxas de rendimento",
   "url_fonte": "https://www.gov.br/inep/pt-br/areas-de-atuacao/pesquisas-estatisticas-e-indicadores/censo-escolar",
   "pendente": "Falta baixar as taxas de rendimento do Censo Escolar e registrar a série nacional.",
   "serie": [],
   "status": "aguardando",
   "coletadoEm": null,
   "origem": "manual",
   "fontesManuais": []
  }
 ]
};

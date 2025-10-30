# 📅 Sprint <N> — <Título resumido da sprint>

## 🎯 Objetivo Geral
Descreva em 2–3 linhas o foco da sprint e o valor de negócio esperado.

> Exemplo:  
> “Permitir sincronização entre Admin e Loja via API, substituindo o uso localStorage por persistência real no backend.”

---

## 🔗 Requisitos e Dependências (Resumo)
| REQ | Descrição | Depende de | Entrega para |
|------|------------|-------------|----------------|
| REQ-001 | Criar endpoint /config para salvar JSON da loja | — | Front |
| REQ-002 | Conectar Admin e Loja à API /config | Back | QA |
| REQ-003 | Testar fluxo Admin ↔ Loja (E2E) | Back + Front | DevOps |
| REQ-004 | Integrar pipeline com coverage | QA | Todos |

---

## 🧩 Ordem de Execução Técnica

| Ordem | Time | Justificativa |
|--------|------|----------------|
| 1️⃣ | **Backend** | Cria base e contratos da API |
| 2️⃣ | **Frontend** | Implementa UI e consome endpoints |
| 3️⃣ | **QA** | Valida integração e rastreabilidade |
| 4️⃣ | **DevOps** | Automatiza pipeline e coverage |
| 5️⃣ | **Docs / Segurança** | Atualiza OpenAPI, ADRs e rastreabilidade |

---

## 🧱 Prompt — Backend

**Objetivo técnico:**  
(Descrever o que deve ser criado no backend nesta sprint.)

**Tarefas:**
1. Implementar endpoints necessários:  
   - [ ] `GET /...`
   - [ ] `POST /...`
2. Criar modelos e persistência.
3. Atualizar documentação `backend/docs/openapi.yaml`.
4. Publicar ADR se houver decisão nova (ex.: stack, modelo de dados).

**Dependências:** Nenhuma  
**Entrega para:** Frontend e QA  
**Arquivos de saída:** `/backend/src/...`, `/backend/docs/openapi.yaml`  
**DoD:**
- Endpoint funcional e testado (manual ou unitário).  
- Contrato atualizado e validado.  
- Dados compatíveis com consumo do front.

---

## 💻 Prompt — Frontend

**Objetivo técnico:**  
(Descrever o que deve ser feito na interface ou integração.)

**Tarefas:**
1. Conectar componentes à nova API.
2. Criar feedbacks de sucesso/erro.
3. Ajustar layout e estados de carregamento.
4. Validar comportamento com dados reais.

**Depende de:** Backend  
**Entrega para:** QA  
**Arquivos de saída:** `/frontend/...` ou `/admin/...`  
**DoD:**
- Interface funcionando com dados reais.  
- Fluxos testados manualmente.  
- Nenhum erro visual ou de integração.

---

## 🧪 Prompt — QA

**Objetivo técnico:**  
(Definir testes automatizados e rastreabilidade.)

**Tarefas:**
1. Criar testes de API e E2E conforme REQs.
2. Atualizar `map.json` e `matrix.md` (REQ ↔ API ↔ Teste).
3. Gerar relatório de execução e coverage.
4. Notificar DevOps sobre resultados críticos.

**Depende de:** Backend + Frontend  
**Entrega para:** DevOps  
**Arquivos de saída:** `/qa/features/`, `/qa/reports/`  
**DoD:**
- Todos os cenários passam no CI.  
- Rastreabilidade atualizada.  
- Relatório Allure ou HTML anexado.

---

## ⚙️ Prompt — DevOps

**Objetivo técnico:**  
(Configurar e garantir estabilidade da entrega.)

**Tarefas:**
1. Atualizar pipeline `devops/ci/` para rodar testes e build.  
2. Implementar geração de relatório de coverage (`/reports/coverage/`).  
3. Validar ambiente QA e logs.  
4. Publicar métricas no release report.

**Depende de:** QA  
**Entrega para:** Todos os times  
**Arquivos de saída:** `/devops/ci/`, `/reports/coverage/`  
**DoD:**
- Pipeline executando com sucesso.  
- Build estável e rastreável.  
- Coverage acima do mínimo definido.

---

## 📚 Prompt — Docs / Segurança

**Objetivo técnico:**  
(Manter documentação, rastreabilidade e compliance atualizadas.)

**Tarefas:**
1. Atualizar ADRs impactadas.  
2. Validar `openapi.yaml` e `map.json`.  
3. Gerar `/docs/releases/release-<data>.md` com status e métricas.  
4. Publicar lições aprendidas no final da sprint.

**Depende de:** Todos  
**Entrega para:** Próxima sprint  
**Arquivos de saída:** `/docs/adr/`, `/docs/releases/`, `/docs/traceability/`  
**DoD:**
- Documentação sincronizada.  
- Rastreabilidade 100% atualizada.  
- Release report publicado.

---

## 📊 Métricas a Monitorar nesta Sprint
- [ ] % de REQs concluídas  
- [ ] Tempo médio de merge  
- [ ] Coverage médio Back/Front  
- [ ] Bugs reportados vs resolvidos  
- [ ] Aderência ao DoD

---

## 🔁 Encerramento da Sprint
> Gerar arquivo:  
> `/docs/releases/release-<data>.md`  
> contendo:
> - REQs entregues  
> - Métricas coletadas  
> - Riscos e mitigação  
> - Próximas ações  

---

## 🧠 Observações do P.O/TL
- (Espaço para notas, riscos, ajustes ou decisões rápidas a levar para ADR.)

# LGPD — Checklist Mínimo

## Bases Legais
| Dado | Finalidade | Base Legal | Retenção |
|------|-------------|-------------|-----------|
| Nome e telefone (cliente) | Contato e entrega | Execução de contrato | 12 meses |
| Endereço (opcional) | Entrega | Consentimento | 12 meses |
| Histórico de pedidos | Controle interno | Interesse legítimo | 24 meses |

---

## Consentimento
- Checkbox explícito ao enviar pedido via WhatsApp.  
- Logs de consentimento armazenados (timestamp + IP).  

---

## Minimização de Dados
- Coletar apenas informações essenciais para cada operação.  
- Proibir armazenamento de dados sensíveis (CPF, RG, etc.).  

---

## Direitos do Titular
- Solicitar consulta, correção ou exclusão via canal oficial.  
- Prazo de atendimento: até 15 dias.  

---

## Segurança
- Transporte via HTTPS.  
- Tokens e segredos em variáveis de ambiente.  
- Backup e logs rotacionados.  

---

## PIA (Privacy Impact Assessment)
| Risco | Impacto | Mitigação |
|-------|----------|-----------|
| Vazamento de contatos | Alto | Criptografia e acesso restrito |
| Erro de permissão | Médio | Testes automáticos de roles |
| Retenção excessiva | Médio | Política de expiração automatizada |

---

## Checklist por Release
- [ ] Política de privacidade atualizada  
- [ ] Logs de consentimento ativos  
- [ ] Dados testados via ambiente QA seguro  
- [ ] Verificação de segurança no CI/CD  

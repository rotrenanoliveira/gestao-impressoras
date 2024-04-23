### RF Requisitos Funcionais

- [x] O sistema deve permitir o cadastro de departamentos
- [x] O sistema deve permitir o cadastro de usuários
- [x] O sistema deve permitir o cadastro de licenças (licença, usuários de licença)
- [x] O sistema deve permitir o cadastro de contratos
- [x] O sistema deve permitir o cadastro de dispositivos (computador, impressora, dispositivos móveis)
- [ ] O sistema deve permitir o cadastro de endereços de serviços
- [x] O sistema deve permitir o cadastro de estação de trabalho
- [ ] O sistema deve permitir o cadastro de ocorrências
- [ ] O sistema deve permitir a liberação de certos endpoints (recursos) para departamentos selecionados
- [ ] O sistema deve permitir o cadastro de contas de emails por departamento
- [ ] O sistema deve permitir o cadastro de contas de emails por usuário para que o sistema envie e-mail por ele

### RN Regras de negócios
- [ ] Os cadastros poderão ser registrados manualmente e/ou através de uma planilha de excel.
- [ ] O sistema deve avisar o/os administradores do sistema caso um contrato ou licença esteja perto do vencimento.
- [ ] O sistema deverá copiar o usuário na mensagem que será enviada por uma conta padrão do sistema.

### RNFs (Requisitos não-funcionais)

- [ ] A autenticação será via código de acesso e/ou magic link;
- [ ] O usuário deve ser identificado por um JWT (Json Web Token);
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;

- Adicionar varios usuarios ao departamento

- Adicionar filter by slug na rota fetch workstations
### RF Requisitos Funcionais

- [x] O sistema deve permitir o cadastro de departamentos
- [x] O sistema deve permitir o cadastro de usuários
- [x] O sistema deve permitir o cadastro de licenças (licença, usuários de licença)
- [x] O sistema deve permitir o cadastro de contratos
- [x] O sistema deve permitir o cadastro de dispositivos (computador, impressora, dispositivos móveis)
- [x] O sistema deve permitir o cadastro de estação de trabalho
- [ ] O sistema deve permitir o cadastro de endereços de serviços
- [ ] O sistema deve permitir o cadastro de ocorrências
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

### TODO

- [x] Busca de departamentos por slug
- [x] Busca de usuário por email e departamento
- [x] Busca de workstation por departamento
- [x] Trazer com o departamento o chefe (nome)
- [ ] Trazer com o usuário o departamento (slug, description), se é chefe de algum departamento (description), workstation (tag), license (ID userLicense, name)
- [ ] Trazer com a licença se é usada por departamento ou usuário e o nome ou descrição do usuário da licença
- [ ] Trazer com o dispositivo o contrato (ID e description)
- [ ] Trazer com o computador a workstation (tag) e departamento (slug, description)
- [ ] Trazer com o a workstation os usuários (nome, email)
- [ ] Adicionar e remover usuário de workstation
- [ ] Adicionar e remover computador de workstation

Pensar uma maneira de autenticar, já que não será realizada por usuário e sim via API Key... pois os usuários podem e vão autenticar o frontend para visualizar as informações mas a maneira que o frontend e o backend será integrado será via API Key

Para as funções do frontend a autenticação será via RBAC

```ts
export interface DepartmentProps {
  description: string
  slug: Slug
  email: string | null
  chiefId?: UniqueEntityID | null
  chief?: User | null
  createdAt: Date
  updatedAt?: Date | null
}
```

```ts
export interface UserProps {
  name: string
  email: string
  phone: Phone | null
  badge: string
  status: 'ACTIVE' | 'INACTIVE'
  departmentId: UniqueEntityID
  workstationId: UniqueEntityID | null
  createdAt: Date
  updatedAt?: Date | null
}
```
# App - IT Devices Manager

O intuito deste repositório é agrupar um mesmo projeto (real) porém desenvolvido de maneiras diferentes, com diferentes ferramentas e frameworks.
Pensado para cadastrar computadores e impressoras mas permitindo ser cadastrado outros dispositivos também.
O responsável pela requisição dos itens deve ser notificado quando o estoque de  algum item for zerado.

## RFs

 - [ ] Deve ser possível cadastrar os dispositivos
 - [ ] Deve ser possível cadastrar insumos para dispositivos
 - [ ] Deve ser possível vizualizar a quantidade movimentada no estoque por item
 - [ ] Deve ser possível vizualizar a quantidade movimentada no estoque por dispositivo.

# Devices
  - nome
  - description
  - type (pc, printer)
  - acquisition type (bought, rented)
  - status (ok, warning, danger)

# Inventory
  - title
  - description
  - device
  - quantity
  - location

# Consumable
  - item
  - device
  - operator
  - created_at
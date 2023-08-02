# App - IT Devices Manager

O intuito deste repositório é agrupar um mesmo projeto (real) porém desenvolvido de maneiras diferentes, com diferentes ferramentas e frameworks.
Pensado para cadastrar computadores e impressoras mas permitindo ser cadastrado outros dispositivos também.
O responsável pela requisição dos itens deve ser notificado quando o estoque de  algum item for zerado.
Num futuro deve ser implementao algo semelhante ou até mesmo um Cron-Job para avisar o responsável pelo dos dispositivos que um contrato de um item alocado está próximo a expirar

## RFs

 - [ ] Deve ser possível cadastrar os dispositivos
 - [ ] Deve ser possível cadastrar um dispositivo como alocado
 - [ ] Deve ser possível cadastrar insumos para dispositivos no estoque
 - [ ] Deve ser possível consumir um item do estoque
 - [ ] Deve ser possível vizualizar a quantidade movimentada no estoque por item


### Devices
  - nome
  - description
  - type (pc, printer)
  - acquisition type (bought, rented)
  - status (ok, warning, danger)

### Inventory
  - title -> String
  - location -> String
  - quantity -> Number
  - description -> String | null
  - device (device_id) -> String | null

### Rented Devices
  - device
  - supplier
  - rented_in
  - contract_expiration
  - obs

### Inventory Transaction
  - item
  - operator
  - transaction_type (insert, remove)
  - quantity
  - created_at
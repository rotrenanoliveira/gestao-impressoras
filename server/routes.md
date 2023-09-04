# Rotas

### Computer Routes
  - GET:     /computers
  - GET:     /computers/:computerId
  - POST:    /computers
  - PUT:     /computers/:computerId
  - DELETE:  /computers/:computerId

### License Routes
  - GET:     /licenses
  - GET:     /licenses/:licenseId
  - POST:    /licenses
  - PUT:     /licenses/:licenseId
  - DELETE:  /licenses/:licenseId

### Printer Routes
  - GET:     /printers
  - GET:     /printers/:printerId
  - POST:    /printers
  - PUT:     /printers/:printerId
  - DELETE:  /printers/:printerId

### Printer Ink Stock Routes
  - GET:     /ink-stock
  - GET:     /ink-stock?printer=printerId
  - GET:     /ink-stock/:inkId
  - POST:    /ink-stock
  - PUT:     /ink-stock/:inkId
  - DELETE:  /ink-stock/:inkId

### Printer Stock Transaction Routes
  - GET:     /stock-transactions
  - GET:     /stock-transactions?ink=inkId
  - POST:    /stock-transactions

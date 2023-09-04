export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('pt-BR')
}

export function formatCurrency(currency: Currency) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency.currency,
  }).format(currency.value)
}

import { Phone } from './phone'

test('should remove special characters from phone numbers', () => {
  const phone = Phone.format('(11) 95613-6512', 'pt-BR')

  expect(phone.value).toBe('11956136512')
})

test("should not format number if ins't pt-BR standard", () => {
  const phone = Phone.format('(11) 95613-6512', 'en-US')

  expect(phone.value).toBe('(11) 95613-6512')
})

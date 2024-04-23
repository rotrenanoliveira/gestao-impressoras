import { expect, test } from 'vitest'

import { Slug } from './slug'

test('should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('John Doe')

  expect(slug.value).toEqual('john-doe')
})

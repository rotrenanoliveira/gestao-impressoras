import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'

describe('Register department (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[POST] /departments', async () => {
    const response = await request(app.getHttpServer()).post('/departments').send({
      description: 'Product Design',
      email: 'product.design@example.com',
    })

    expect(response.statusCode).toBe(201)

    expect(response.body).toEqual({
      department: expect.objectContaining({
        id: expect.any(String),
        slug: 'product-design',
        description: 'Product Design',
        email: 'product.design@example.com',
        chief: null,
      }),
    })
  })
})

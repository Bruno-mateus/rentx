import request from 'supertest'
import { app } from '../../../../shared/infra/http/app'
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid'
import { Connection } from 'typeorm';
import createConnection from '../../../../shared/infra/typeorm'


let connection: Connection;
describe('Create category controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations()
    const id = uuid()
    const password = await hash('admin', 8)

    await connection.query(`
    INSERT INTO USERS(id, name, email,password, "admin", created_at, driver_license)
    values('${id}','admin','admin@rentx.com','${password}','true','now()','XXXXX')
  `)

  })
  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })
  it('should be list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin'
    })
    const { token } = responseToken.body

    await request(app).post("/categories").send(
      {
        name: 'supertest name',
        description: 'supertest description'
      }
    ).set({
      Authorization: `Bearer ${token}`
    })

    const response = await request(app).get('/categories')

    console.log(response.body);
    expect(response.status).toBe(200)


  })
})
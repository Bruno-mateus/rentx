import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid'
import createConnection from '../index'


create().then(() => console.log('User admin, created!!'))
async function create() {
  const connection = await createConnection('localhost');

  const id = uuid()
  const password = await hash('admin', 8)

  await connection.query(`
  INSERT INTO USERS(id, name, email,password, "admin", created_at, driver_license)
  values('${id}','admin','admin@rentx.com','${password}','true','now()','XXXXX')
`)
  await connection.close()
}
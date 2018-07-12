import { Client } from 'pg';

const client = new Client();
client.connect();

export async function getUser(userData) {
  const user = await client.query(`SELECT * FROM users WHERE email = '${userData.email}' AND pass = '${userData.pass}' limit 1;`);

  return user || null;
}


export const usr1 = {
  id: 'uuid_generate_v4()',
  email: 'gh_filip@yahoo.com',
  pass: 'test',
  firstName: 'Filip',
  lastName: 'Gheorghe',
  level: 1,
};

export const usr2 = {
  id: 'uuid_generate_v4()',
  email: 'pop_ion@yahoo.com',
  pass: 'test',
  firstName: 'Ion',
  lastName: 'Popescu',
  level: 2,
};

export async function verifyLogin(id) {
  if (!id) {
    return null;
  }

  const exists = await client.query(`SELECT * FROM users WHERE id = '${id}'`);

  return exists.rows[0] || null;
}

export async function insertUser(userData) {
  await client.query(`INSERT INTO users (id, email, pass, firstname, lastname, level) values (${userData.id}, '${userData.email}', '${userData.pass}', '${userData.firstName}', '${userData.lastName}', '${userData.level}')`)
}

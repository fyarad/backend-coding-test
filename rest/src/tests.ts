import fetch from 'node-fetch'
import { startServer } from './server'
import { getRandomNumber } from './helpers/random'
import { random } from './helpers/array'

const requestsCount = 20
const customersByRequest = 2
const firstNames = ['Leia', 'Sadie', 'Jose', 'Sara', 'Frank', 'Dewey', 'Tomas', 'Joel', 'Lukas', 'Carlos']
const lastNames = ['Liberty', 'Ray', 'Harrison', 'Ronan', 'Drew', 'Powell', 'Larsen', 'Chan', 'Anderson', 'Lane']

console.clear()

const TestCustomers = async (): Promise<boolean> => {

  const port = 3434
  await startServer(port)

  // Delete all records
  await fetch(`http://localhost:${port}/v1/customers`, { method: 'DELETE' })

  var id = 1

  for (let i = 0; i < requestsCount; i++) {

    const data = []

    for (let i2 = 0; i2 < customersByRequest; i2++) {

      data.push({
        id: id,
        age: getRandomNumber(10, 90),
        firstName: random(firstNames),
        lastName: random(lastNames)
      })

      id += 1
    }

    await fetch(`http://localhost:${port}/v1/customers`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    })

  }

  // List all customers
  const customers = await fetch(`http://localhost:${port}/v1/customers`)
  console.log(await customers.json())

  return false
}

TestCustomers()
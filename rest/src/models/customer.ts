import Model from './model'

export default class Customer extends Model {

  firstName!: string
  lastName!: string
  age!: number

  static get sort() {
    return (a: Model, b: Model) => {
      const c1 = a as Customer
      const c2 = b as Customer
      return c1.firstName.localeCompare(c2.firstName) || c1.lastName.localeCompare(c2.lastName)
    }
  }

}

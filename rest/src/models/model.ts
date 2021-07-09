import { sortAndInsert } from '../helpers/array'
import fs from 'fs'

export default class Model {

  id!: number

  static async save<T extends Model>(data: Array<T>): Promise<boolean> {
    try {
      const json = JSON.stringify(data)
      fs.writeFileSync(`./data/${this.name}.json`, json)
      return true
    }
    catch (e) {
      console.log(`Failed to save data for ${this.name}`)
      return false
    }
  }

  static async getAll<T extends Model>(): Promise<Array<T>> {

    try {

      const result = fs.readFileSync(`./data/${this.name}.json`)
      const string = result.toString('utf8')
      if (string.length > 0) {
        const json = JSON.parse(string)
        return json as Array<T>
      }

    }
    catch (e) {}

    return []
  }

  static async findById<T extends Model>(id: number): Promise<T | undefined> {
    const data = await this.getAll()
    return data.find((o) => o.id === id) as T
  }

  static async create<T extends Model>(object: T): Promise<T | undefined> {
    const data = await this.getAll()
    const newData = sortAndInsert(data, object, this.sort)
    const success = await this.save(newData)
    return (success) ? object : undefined
  }

  static async deleteAll(): Promise<boolean> {
    return this.save([])
  }

  static get sort(): { (a: Model, b: Model): number } {
    return (a: Model, b: Model) => a.id - b.id
  }

}
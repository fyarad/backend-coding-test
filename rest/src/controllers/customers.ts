import { Request, Response } from 'express';
import Customer from "../models/customer";

export const CustomersIndex = async (req: Request, res: Response) => {
  const objects = await Customer.getAll()
  res.status(200).send(objects)
}

export const CustomersCreate = async (req: Request, res: Response) => {

  const data = req.body
  const response = []

  if (data) {

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const exists = await Customer.findById(element.id)
      if (exists) {
        response.push({error: 'Customer already exists'})
      }
      else {
        const object = await Customer.create(element);
        if (object) {
          response.push(object)
        }
      }

    }
  }


  res.status(200).send(response)
}

export const CustomersDelete = async (req: Request, res: Response) => {
  await Customer.deleteAll()
  res.status(200).send({})
}
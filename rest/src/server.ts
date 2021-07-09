import express from 'express';
import { json } from 'body-parser';

import { ValidationMiddleware } from './middlewares/validation'
import { CustomersIndex, CustomersCreate, CustomersDelete} from './controllers/customers';
import { CustomerValidation } from './validations/customer'

const app = express();
app.set('trust proxy', true);
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(json())

app.use(express.Router().get("/v1/customers", CustomersIndex))
app.use(express.Router().post("/v1/customers", CustomerValidation, [ValidationMiddleware], CustomersCreate))
app.use(express.Router().delete("/v1/customers", CustomersDelete))

const startServer = async (port: number = 3000): Promise<boolean> => {
  return new Promise((res) => {

    app.listen(port, () => {
      console.log(`Started server on port ${port}`)
      res(true)
    })

  })
}

export {app, startServer }
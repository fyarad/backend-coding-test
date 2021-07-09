import {body} from 'express-validator'

export const CustomerValidation = [
  body('*.id', 'ID is required').exists(),
  body('*.firstName', 'First name invalid').exists(),
  body('*.lastName', 'Last name is required').exists(),
  body('*.age', 'Age is required').exists(),
  body('*.age', 'Invalid age').isInt({min: 18})
]
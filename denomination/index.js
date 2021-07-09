const fs = require('fs')

const currency = 'EUR'
const cartridges = [10, 50, 100]
const payouts = [30, 50, 60, 80, 140, 230, 370, 610, 980]

function test() {

  const logger = fs.createWriteStream('data/test.txt')

  for (let index = 0; index < payouts.length; index++) {
    const payout = payouts[index];
    const combinations = getCombinations(payout, 0, [], {})

    logger.write(`There are ${combinations.length} combinations for ${payout} ${currency} payout:`)

    for (let i2 = 0; i2 < combinations.length; i2++) {
      const combination = combinations[i2];

      const combinationArray = []
      for (cartridge in combination) {
        combinationArray.push(`${combination[cartridge]} x ${cartridge} ${currency}`)
      }

      logger.write('\r\n')
      logger.write(`* ${combinationArray.join(" + ")}`)
    }

    logger.write('\r\n\r\n')

  }

  console.log('Test result on data/test.txt')
  logger.end()

}

function getCombinations(amount, n, combinations, data) {

  // End of option
  if (amount === 0) {
    combinations.push(data)
  }

  // Ran out of options
  else if (amount < 0 || cartridges.length === n) {
    data = {}
  }
  else {

    const cartridge = cartridges[n]

    const updatedData = {...data}
    if (!updatedData[cartridge]) {
      updatedData[cartridge] = 0
    }
    updatedData[cartridge] += 1

    getCombinations(amount - cartridge, n, combinations, updatedData)
    getCombinations(amount, n + 1, combinations, data);
  }

  return combinations
}

test()

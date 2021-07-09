
export function sort<T>(
  array: T[],
  compare: { (a: T, b: T): number } = (a: any, b: any) => a - b
): T[] {
  var current: T
  var j: number
  for (var i = 1; i < array.length; i += 1) {
    current = array[i]
    j = i - 1
    while (j >= 0 && compare(array[j], current) > 0) {
      array[j + 1] = array[j]
      j -= 1
    }
    array[j + 1] = current
  }
  return array
}

export function sortAndInsert<T>(
  array: T[],
  newElement: T,
  compare: { (a: T, b: T): number } = (a: any, b: any) => a - b
): T[] {

  var newIndex: number = 0
  for (var i = 0; i < array.length; i++) {
    if (compare(array[i], newElement) <= 0) {
      newIndex = i + 1
    }
  }
  array.splice(newIndex, 0, newElement)
  return array;
}


export function random<T>(array: Array<T>): any {
  const random = Math.floor(Math.random() * array.length);
  return array[random]
}
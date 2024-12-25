export type product = {
  code: number
  description: string
  unitValue: UnitValueEnum
  price: number
}

export enum UnitValueEnum {
  BOX = 'BOX',
  UNIT = 'UNIT',
}

import { Shift, ShiftDates } from './shift.types'

export const DEFAULT_SHIFT_MODEL: Shift = {
  title: '',
  description: '',
  datesList: [],
}
export const DEFAULT_SHIFT_DATE_MODEL: ShiftDates = {
  date: new Date(),
  startTime: undefined,
  endTime: undefined,
  price: undefined,
}

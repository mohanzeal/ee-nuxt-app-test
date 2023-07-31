export type ShiftDates = {
  date: string
  startTime?: Date
  endTime?: Date
  price?: number
}

export type Shift = {
  title: string
  description: string
  datesList: ShiftDates[]
}

export type ShiftStoreType = {
  shiftList: Shift[]
  currentShift: Shift
  currentShiftIndex: number
}

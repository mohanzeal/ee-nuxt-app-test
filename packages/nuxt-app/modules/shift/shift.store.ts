import Vue from 'vue'
import { DEFAULT_SHIFT_MODEL } from './shift.constants'
import { Shift, ShiftStoreType } from './shift.types'

export const ShiftStore = {
  namespaced: true,
  state: () => ({
    shiftList: [],
    currentShiftIndex: -1,
    currentShift: JSON.parse(JSON.stringify(DEFAULT_SHIFT_MODEL)),
  }),
  mutations: {
    add(state: ShiftStoreType, payload: Shift) {
      state.shiftList.push(payload)
    },
    update(
      state: ShiftStoreType,
      payload: { index: number; currentShift: Shift }
    ) {
      Vue.set(state.shiftList, payload.index, payload.currentShift)
    },
    remove(state: ShiftStoreType, payload: number) {
      state.shiftList.splice(payload, 1)
    },
    reset(state: ShiftStoreType) {
      state.currentShift = JSON.parse(JSON.stringify(DEFAULT_SHIFT_MODEL))
      state.currentShiftIndex = -1
    },
  },
}

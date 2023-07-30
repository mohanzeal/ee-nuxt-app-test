import Vue from 'vue'
import Vuex from 'vuex'
// Here we import everything that is exported
// from the below directory, allowing us to create the store
import { ShiftStore } from '../modules/shift/shift.store'

Vue.use(Vuex)

export default () =>
  new Vuex.Store({
    state: {
      openDrawer: false,
    },
    mutations: {
      toggleDrawer(state) {
        state.openDrawer = !state.openDrawer
      },
    },
    modules: {
      shift: ShiftStore,
    },
  })

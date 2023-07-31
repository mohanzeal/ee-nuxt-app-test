<template>
  <v-navigation-drawer
    v-if="$store.state.openDrawer"
    v-model="$store.state.openDrawer"
    absolute
    width="300px"
    temporary
    right
  >
    <v-card elevation="0" class="ma-2">
      <v-card-title>Create/Edit</v-card-title>
      <v-text-field
        v-model="$store.state.shift.currentShift.title"
        label="Title"
        required
      ></v-text-field>
      <v-text-field
        v-model="$store.state.shift.currentShift.description"
        label="Description"
        required
      ></v-text-field>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dates"
            label="Select dates"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dates" multiple></v-date-picker>
      </v-menu>
      <div class="ml-4" v-if="$store.state.shift.currentShift.datesList.length">
        <v-col
          cols="12"
          v-for="(d, j) in $store.state.shift.currentShift.datesList"
          :key="j"
        >
          <v-row>
            <v-col cols="6">
              {{ d.date }}
            </v-col>
            <v-col cols="4">
              <v-text-field
                width="20px"
                dense
                v-model="d.price"
                label="Price"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </div>

      <v-btn elevation="0" @click="deleteShift">Delete</v-btn>
      <v-btn elevation="0" @click="saveShift">Save</v-btn>
    </v-card>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { DEFAULT_SHIFT_DATE_MODEL } from '../shift.constants'
import { ShiftDates } from '../shift.types'
export default Vue.extend({
  data: () => ({
    dates: null,
    menu: false,
  }),
  watch: {
    dates(newDatesList: string[]) {
      const tempList = [] as ShiftDates[]

      newDatesList?.forEach((date) => {
        const currentDate = this.$store.state.shift.currentShift.datesList.find(
          (dates: ShiftDates) => dates.date == date
        )

        console.log(currentDate)

        tempList.push({ ...(currentDate || DEFAULT_SHIFT_DATE_MODEL), date })
      })

      this.$store.state.shift.currentShift.datesList = tempList
    },
  },
  mounted() {
    if (this.$store.state.shift.currentShift.datesList.length) {
      this.dates = this.$store.state.shift.currentShift.datesList.map(
        (list: ShiftDates) => list.date
      )
    }
  },

  methods: {
    deleteShift() {
      this.$store.commit(
        'shift/remove',
        this.$store.state.shift.currentShiftIndex
      )
      this.$store.commit('shift/reset')
      this.$store.commit('toggleDrawer')
      this.dates = null
    },
    saveShift() {
      if (this.$store.state.shift.currentShiftIndex > -1) {
        this.$store.commit('shift/update', {
          index: this.$store.state.shift.currentShiftIndex,
          currentShift: this.$store.state.shift.currentShift,
        })
      } else {
        this.$store.commit('shift/add', this.$store.state.shift.currentShift)
      }
      this.$store.commit('shift/reset')
      this.dates = null
    },
  },
})
</script>

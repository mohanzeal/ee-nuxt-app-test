<template>
  <v-row gutter="2">
    <v-col cols="12">
      <v-app-bar elevation="0">
        <v-toolbar-title>Filters:</v-toolbar-title>
      </v-app-bar>
      <v-row class="ma-4">
        <v-col cols="2">Filter On Price:</v-col>
        <v-col cols="8"
          ><v-range-slider v-model="filterPrice" min="1" max="500">
            <template v-slot:thumb-label="props">
              {{ props.value }}
            </template>
          </v-range-slider></v-col
        >
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-app-bar elevation="0">
        <v-toolbar-title>Shifts</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn elevation="2" @click="toggleDrawer">Add Shift</v-btn>
      </v-app-bar>
    </v-col>
    <v-col cols="12" gutter="2">
      <div v-for="(shift, i) in filteredList" :key="i">
        <v-card elevation="5" class="ma-4">
          <v-card-title>
            {{ shift.title }}
            <v-spacer />
            <v-btn @click="editShift(i)">Edit</v-btn>
          </v-card-title>

          <v-card-subtitle>
            {{ shift.description }}
          </v-card-subtitle>
          <div v-if="shift.datesList.length">
            <v-card-title> Dates </v-card-title>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr v-for="(date, j) in shift.datesList" :key="j">
                    <td elevation="0" class="ma-4">
                      {{ date.date }}
                    </td>
                    <td elevation="0" class="ma-4">${{ date.price }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </v-card>
      </div>
      <div v-if="!$store.state.shift.shiftList.length" class="text-center">
        <div>Start adding a shift by clicking on ADD SHIFT button</div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    filterPrice: [0, 500],
  }),
  computed: {
    filteredList() {
      console.log(this.filterPrice)
      const shifts = []
      this.$store.state.shift.shiftList.forEach((shift) => {
        const filtered = []
        shift.datesList.forEach((date) => {
          if (
            this.filterPrice[0] < parseInt(date.price) &&
            this.filterPrice[1] > parseInt(date.price)
          ) {
            filtered.push(date)
          }
        })

        if (filtered.length > 0) {
          shifts.push({
            ...shift,
            datesList: filtered,
          })
        }
      })

      return shifts
    },
  },
  methods: {
    editShift(index: number) {
      this.$store.state.shift.currentShiftIndex = index
      this.$store.state.shift.currentShift = JSON.parse(
        JSON.stringify(this.$store.state.shift.shiftList[index])
      )
      this.toggleDrawer()
    },
    toggleDrawer() {
      this.$store.commit('toggleDrawer')
    },
  },
})
</script>

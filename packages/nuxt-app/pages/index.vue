<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row no-gutters style="height: 150px">
          <v-col cols="12">
            <v-card class="pa-2" outlined tile>
              <Overview />
            </v-card>
          </v-col>
        </v-row>

        <AddOrEdit v-if="$store.state.openDrawer" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Overview from '../modules/shift/components/Overview.vue'
import AddOrEdit from '../modules/shift/components/AddOrEdit.vue'

export default Vue.extend({
  components: {
    Overview,
    AddOrEdit,
  },
  data: () => ({}),

  watch: {},
})
</script>

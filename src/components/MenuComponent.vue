<template>
  <v-navigation-drawer app v-model="drawer" absolute bottom>
    <v-list nav dense>
      <!-- v-model="group" -->
      <v-list-item-group active-class="deep-purple--text text--accent-4">

        <v-list-item link to="/Today">
          <v-list-item-icon>
            <v-icon large>mdi-calendar-today</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Today</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon large>mdi-calendar</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Upcoming</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Model } from "vue-property-decorator";

@Component({
  name: "MenuComponent",
})
export default class MenuComponent extends Vue {
  hideOverlay = true;
  @Model("drawer", { type: Boolean }) drawer?: boolean = true;
}
</script>

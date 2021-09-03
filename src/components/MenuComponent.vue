<template>
  <v-navigation-drawer absolute temporary app v-model="drawer">
    <v-list nav dense>
      <!-- v-model="group" -->
      <v-list-item-group active-class="deep-purple--text text--accent-4">
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon large>mdi-calendar-today</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Today</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/Upcoming">
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

@Component({
  name: "MenuComponent",
})
export default class MenuComponent extends Vue {
  drawer?: boolean = false;
  toggleDrawer(): void {
    this.drawer = !this.drawer;
  }
  created(): void {
    this.$emit("toggleDrawer", this.toggleDrawer);
  }
}
</script>

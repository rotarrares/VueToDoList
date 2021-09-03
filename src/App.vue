<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="toggleDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
    </v-app-bar>
    <menu-component @toggleDrawer="toggleDrawer = $event" />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import MenuComponent from "@/components/MenuComponent.vue";

@Component({
  name: "App",
  components: {
    MenuComponent,
  },
})
export default class App extends Vue {
  toggleDrawer? = function (): void {
    //Something off
  };
}
</script>

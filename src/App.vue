<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-icon v-show="!drawerValue">mdi-menu</v-icon>
        <v-icon v-show="drawerValue">mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
    </v-app-bar>
    <menu-component
      :drawer="drawerValue"
    />
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
  computed: {
    drawerValue: {
      get: function () {
        return this.drawer;
      },
      set: function (value) {
        this.drawer = value;
      },
    },
  },
})
export default class App extends Vue {
  drawer?: boolean = true;
}
</script>

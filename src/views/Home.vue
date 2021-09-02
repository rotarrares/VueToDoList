<template>
  <div>
    <v-container>
      Inbox Page
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "Home",
})
export default class Home extends Vue{
  appBarOpen = false;
};
</script>

<template>
  <v-layout justify-center>
    <v-list three-line width="500" >
      <v-list-item-group active-class="deep-purple--text text--accent-4">
        <v-list-item :key="task.name" v-for="task in $store.getters.getTasks">
          <v-list-item-content align="left" >
            <v-list-item-title>{{ task.name }} </v-list-item-title>
            <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-layout>
</template>

<script lang="ts">
export default {
  name: "TaskListComponent",
};
</script>

<style scoped></style>

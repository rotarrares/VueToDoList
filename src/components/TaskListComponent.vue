<template>
  <v-layout justify-center>
    <v-list three-line width="500">
      <v-list-item-group active-class="deep-purple--text text--accent-4">
        <v-list-item
          @click="checkListItem(task.id)"
          :key="task.id"
          v-for="task in $store.getters.getTasks"
        >
          <v-list-item-icon>
            <v-icon :color="task.completed ? 'green' : 'red'">mdi-flag</v-icon>
          </v-list-item-icon>
          <v-list-item-content align="left">
            <v-list-item-title>{{ task.name }} </v-list-item-title>
            <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-layout>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";

@Component({
  name: "TaskListComponent",
})
export default class TaskListComponent extends Vue {
  deleteListItem(id: string): void {
    this.$store.dispatch("deleteTask", id);
  }
  checkListItem(id: string): void {
    this.$store.dispatch("checkTask", id);
  }
}
</script>

<style scoped></style>

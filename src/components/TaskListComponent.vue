<template>
  <v-layout justify-center>
    <v-list three-line width="500">
      <v-list-item-group>
        <v-list-item
          @change="checkListItem(task.id)"
          inactive
          three-line
          :key="task.id"
          v-for="task in $store.getters.getTasks"
        >
          <v-list-item-icon>
            <v-checkbox
              :input-value="task.completed"
              color="green"
            ></v-checkbox>
          </v-list-item-icon>
          <v-list-item-content align="left">
            <v-list-item-title>{{ task.name }} </v-list-item-title>
            <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action v-show="task.completed">
            <v-list-item-action-text>Remove</v-list-item-action-text>
            <v-btn large color="red" icon @click="deleteListItem(task.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
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

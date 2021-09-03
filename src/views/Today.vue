<template>
  <div class="about">
    <h1>{{ selectedDate }}</h1>
    <add-task-component
      :show-button="true"
      :date="new Date(selectedDate)"
    ></add-task-component>
    <task-list-component :selected-date="selectedDate"></task-list-component>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import AddTaskComponent from "@/components/AddTaskComponent.vue";
import TaskListComponent from "@/components/TaskListComponent.vue";

@Component({
  name: "Today",
  components: { TaskListComponent, AddTaskComponent },
})
export default class Today extends Vue {
  selectedDate?: string | number = this.$route.params.date
    ? this.$route.params.date
    : new Date().toDateString();
}
</script>

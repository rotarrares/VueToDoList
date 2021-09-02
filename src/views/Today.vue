<template>
  <div class="about">
    <h1>Today</h1>
    <add-task-component></add-task-component>
    <task-list-component></task-list-component>
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
}
</script>

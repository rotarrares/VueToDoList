<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
        <v-icon>mdi-plus</v-icon>
        Add Task
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="grey lighten-2">
        Add new task for today
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            v-model="taskName"
            :rules="nameRules"
            required
            label="Task Name"
          >
          </v-text-field>
          <v-textarea v-model="taskDescription" label="Description">
          </v-textarea>
          <v-btn :disabled="!valid" color="success" @click="submit">
            <v-icon>mdi-plus</v-icon>
            Add</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { mapActions } from "vuex";

@Component({
  name: "AddTaskComponent",
  methods: {
    ...mapActions(["addTask"]),
  },
})
export default class AddTaskComponent extends Vue {
  dialog = false;
  valid = true;
  taskName = "";
  taskDescription = "";
  nameRules = [
    (v: string): boolean => !!v || "Name is required",
    (v: string): boolean =>
      v.length <= 25 || "Name must be less than 25 characters",
  ];

  submit(): void {
    this.$store.dispatch("addTask", {
      name: this.taskName,
      description: this.taskDescription,
    });
    this.dialog=false;
  }
}
</script>

<style scoped></style>

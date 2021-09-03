<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-show="$props.showButton"
        color="red lighten-2"
        dark
        v-bind="attrs"
        v-on="on"
      >
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
          <v-select :items="colors" v-model="selectedColor" label="Event Color">
            <template slot="selection" slot-scope="data">
              <v-icon :color="data.item">mdi-flag</v-icon>{{ data.item }}
            </template>
            <template slot="item" slot-scope="data">
              <v-icon :color="data.item">mdi-flag</v-icon>{{ data.item }}
            </template>
          </v-select>
        </v-form>
        <v-card-actions>
          <v-btn :disabled="!valid" color="success" @click="submit">
            <v-icon v-show="$props.id === ''">mdi-plus</v-icon>
            {{ $props.id === "" ? "Add" : "Edit" }}</v-btn
          >
          <v-btn color="red" @click="deleteEvent()" v-show="$props.id !== ''">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { mapActions } from "vuex";
import { Prop, Watch } from "vue-property-decorator";
import guidGenerator from "@/utils/functions";

@Component({
  name: "AddTaskComponent",
  methods: {
    ...mapActions(["addTask"]),
  },
})
export default class AddTaskComponent extends Vue {
  @Prop({ type: Date, required: true }) date?: Date;
  @Prop({ type: String, default: "", required: false }) id?: string;
  @Prop({ type: Boolean, default: true, required: false }) showButton?: boolean;
  dialog = false;
  selectedColor = "grey darken-1";
  valid = true;
  taskName = "";
  taskDescription = "";
  taskDate = this.$props.date;

  @Watch("dialog")
  onDialogChanged(_: boolean, prevState: boolean): void {
    if (prevState) {
      this.taskName = "";
      this.taskDescription = "";
      this.selectedColor = "grey darken-1";
      this.$emit("clearId");
    }
  }

  created(): void {
    this.$emit("setDialog", this.setDialog);
  }

  @Watch("date")
  onDateChanged(): void {
    this.taskDate = this.$props.date;
  }

  @Watch("id")
  onIdChanged(): void {
    if (this.$props.id !== "") {
      const task = this.$store.getters.getTaskById(this.$props.id);
      if (task) {
        this.taskDescription = task.description;
        this.taskName = task.name;
        this.selectedColor = task.color;
        this.taskDate = task.date;
      }
    }
  }
  nameRules = [
    (v: string): string | boolean => !!v || "Name is required",
    (v: string): string | boolean =>
      v.length <= 25 || "Name must be less than 25 characters",
  ];

  colors = [
    "blue",
    "indigo",
    "deep-purple",
    "cyan",
    "green",
    "orange",
    "grey darken-1",
  ];

  deleteEvent(): void {
    this.$store.dispatch("deleteTask", this.$props.id);
    this.setDialog(false);
  }

  setDialog(value: boolean): void {
    this.dialog = value;
  }

  submit(): void {
    this.$store.dispatch(this.$props.id === "" ? "addTask" : "editTask", {
      id: this.$props.id === "" ? guidGenerator() : this.$props.id,
      name: this.taskName,
      description: this.taskDescription,
      date: this.taskDate,
      completed: false,
      color: this.selectedColor,
    });

    this.dialog = false;
    this.taskName = "";
    this.taskDescription = "";
  }
}
</script>

<style scoped></style>

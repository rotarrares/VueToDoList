<template>
  <div>
    <v-container>
      <div>
        <v-sheet tile height="54" class="d-flex">
          <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-select
            v-model="type"
            :items="types"
            dense
            outlined
            hide-details
            class="ma-2"
            label="Period"
          ></v-select>
          <v-select
            v-model="mode"
            :items="modes"
            dense
            outlined
            hide-details
            label="Overlap Mode"
            class="ma-2"
          ></v-select>
          <v-select
            v-model="weekday"
            :items="weekdays"
            dense
            outlined
            hide-details
            label="Weekdays"
            class="ma-2"
          ></v-select>
          <v-spacer></v-spacer>
          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="value"
            :weekdays="weekday"
            :type="type"
            :events="events"
            :event-overlap-mode="mode"
            :event-overlap-threshold="30"
            :event-color="getEventColor"
            @change="() => getEvents"
            @click:event="clickEvent"
          ></v-calendar>
        </v-sheet>

        <add-task-component
          @
          :id="currentlyEditedTaskId"
          :date="new Date(value)"
          @clearId="currentlyEditedTaskId = ''"
          @setDialog="setDialog = $event"
        ></add-task-component>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AddTaskComponent from "@/components/AddTaskComponent.vue";
import { Task } from "@/store";
import { CalendarEvent } from "vuetify";

@Component({
  name: "Home",
  components: {
    AddTaskComponent,
  },
})
export default class Home extends Vue {
  type = "month";
  currentlyEditedTaskId = "";
  types = ["month", "week", "day", "4day"];
  mode = "stack";
  modes = ["stack", "column"];
  weekday = [0, 1, 2, 3, 4, 5, 6];
  weekdays = [
    { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
    { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
    { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
    { text: "Mon, Wed, Fri", value: [1, 3, 5] },
  ];
  value = "";
  events = Array<unknown>();
  setDialog = function (value: boolean): void {
    if (value) {
      //nothing
    }
  };
  clickEvent({ event }: CalendarEvent): void {
    this.currentlyEditedTaskId = event.id;
    this.setDialog(true);
  }

  get getEvents(): Array<CalendarEvent> {
    const events = Array<CalendarEvent>();
    const tasks = this.$store.getters.getAllTasks;
    tasks.forEach((task: Task) => {
      events.push({
        id: task.id,
        name: task.name,
        start: new Date(task.date),
        end: new Date(new Date(task.date).getTime() + 10000),
        color: task.color,
        timed: false,
      });
    });
    this.events = events;
    return events;
  }

  getEventColor(event: CalendarEvent): string {
    return event.color;
  }
  rnd(a: number, b: number): number {
    return Math.floor((b - a + 1) * Math.random()) + a;
  }
}
/*export interface CalendarEvent {
  id?: string;
  name: string;
  start: Date;
  end: Date;
  color: string;
  timed: boolean;
}*/
</script>

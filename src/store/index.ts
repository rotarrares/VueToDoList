import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export interface Task {
  id: string;
  name: string;
  description?: string;
  completed: boolean;
  date: Date;
  color: string;
}

export default new Vuex.Store({
  state: {
    tasks: Array<Task>(),
  },
  mutations: {
    addTask(state, payload): void {
      state.tasks.push(payload);
    },
    editTask(state, payload): void {
      const index = state.tasks.findIndex((task) => task.id === payload.id);
      state.tasks.splice(index, 1);
      state.tasks.push(payload);
    },
    checkTask(state, payload): void {
      state.tasks.forEach((task) => {
        if (task.id === payload) {
          task.completed = !task.completed;
        }
      });
    },
    deleteTask(state, payload): void {
      state.tasks.splice(
        state.tasks.findIndex((task) => task.id === payload),
        1
      );
    },
  },
  actions: {
    addTask(context, payload): void {
      context.commit("addTask", payload);
    },
    editTask(context, payload): void {
      context.commit("editTask", payload);
    },
    checkTask(context, payload): void {
      context.commit("checkTask", payload);
    },
    deleteTask(context, payload): void {
      context.commit("deleteTask", payload);
    },
  },
  modules: {},
  getters: {
    getAllTasks: (state) =>
      state.tasks.sort((x, y) =>
        x.completed === y.completed ? 0 : x.completed ? -1 : 1
      ),
    getTaskById:
      (state) =>
      (id: string): Task | undefined =>
        state.tasks.find((task) => task.id === id),
    getDayTasks: (state) => (day: string | number | Date) =>
      state.tasks.filter(
        (task) =>
          new Date(task.date).getDate() === new Date(day).getDate() &&
          new Date(task.date).getMonth() === new Date(day).getMonth() &&
          new Date(task.date).getFullYear() === new Date(day).getFullYear()
      ),
  },
  plugins: [vuexLocal.plugin],
});

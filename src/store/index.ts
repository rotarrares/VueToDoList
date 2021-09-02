import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import guidGenerator from "../utils/functions";
Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

interface Task {
  id: string;
  name: string;
  description?: string;
  completed: boolean;
}

export default new Vuex.Store({
  state: {
    tasks: Array<Task>(),
  },
  mutations: {
    addTask(state, payload): void {
      state.tasks.push(payload);
    },
    checkTask(state, payload): void {
      state.tasks.every((task) => {
        if (task.id === payload) {
          task.completed = !task.completed;
          return false;
        }
        return true;
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
      payload["completed"] = false;
      payload["id"] = guidGenerator();
      context.commit("addTask", payload);
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
    getTasks: (state) => state.tasks.sort((x,y)=>( (x.completed === y.completed)? 0 : x.completed? -1 : 1)),
  },
  plugins: [vuexLocal.plugin],
});

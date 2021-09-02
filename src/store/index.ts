import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

interface Task {
  name: string;
  description: string;
}

export default new Vuex.Store({
  state: {
    tasks: Array<Task>(),
  },
  mutations: {
    addTask(state, payload): void {
      state.tasks.push(payload);
    },
  },
  actions: {
    addTask(context, payload): void {
      context.commit("addTask", payload);
    },
  },
  modules: {},
  getters: {
    getTasks: (state) => state.tasks,
  },
  plugins: [vuexLocal.plugin],
});

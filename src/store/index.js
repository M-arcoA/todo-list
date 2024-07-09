import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    darkMode: true,
    tasks: [],
    taskIdCounter: 1,
    searchQuery: '',
  },
  getters: {
    isDarkMode: state => state.darkMode,
    allTasks: state => state.tasks,
    filteredTasks(state) {
      const query = state.searchQuery.toLowerCase();
      
      return state.tasks.filter(task => task.title.toLowerCase().includes(query));
    },
    filteredFavorites(state) {
      return state.tasks.filter(task => task.favorite);
    },
    filteredCompleted(state) {
      return state.tasks.filter(task => task.checked);
    },
  },
  mutations: {
    TOGGLE_DARK_MODE(state) {
      state.darkMode = !state.darkMode;
    },
    TOGGLE_CHECKED(state, id) {
      const task = state.tasks.find(task => task.id === id); 
      if (task) {
        task.checked = !task.checked; 
      }

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    TOGGLE_FAVORITE(state, id) {
      const task = state.tasks.find(task => task.id === id);
      if(task) {
        task.favorite = !task.favorite;
      }

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    CREATE_TASK(state, taskTitle) {
      state.tasks.push({
        id: state.taskIdCounter++,
        title: taskTitle,
        checked: false,
        favorite: false
      });
      
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    UPDATE_TASK(state, payload) {
      const task = state.tasks.find(task => task.id === payload.id);
      if (task) {
        task.title = payload.title;
      }

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    LOAD_TASK(state, tasks) {
      state.tasks = tasks;
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
  },
  actions: {
    toggleChecked({ commit }, id) {
      commit('TOGGLE_CHECKED', id);
    },
    toggleFavorite({ commit }, id) {
      commit('TOGGLE_FAVORITE', id);
    },
    createTask({ commit }, taskTitle) {
      commit('CREATE_TASK', taskTitle);
    },
    updateTask({ commit }, payload) {
      commit('UPDATE_TASK', payload);
    },
    deleteTask({ commit }, taskId) {
      commit('DELETE_TASK', taskId);
    },
    loadTasks({ commit }) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      commit('LOAD_TASK', tasks);
    },
    setSearchQuery({ commit }, query) {
      commit('SET_SEARCH_QUERY', query);
    },
    filterFavorites({ commit, state }) {
      const filteredFavorites = state.tasks.filter(task => task.favorite);
      commit('LOAD_TASK', filteredFavorites);
    },
    filterCompleted({ commit, state }) {
      const filteredCompleted = state.tasks.filter(task => task.checked);
      commit('LOAD_TASK', filteredCompleted);
    },
  },
});

store.dispatch('loadTasks');

export default store;
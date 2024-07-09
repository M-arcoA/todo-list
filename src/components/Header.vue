<template>
    <div class="header" :class="['header', {'light-mode': !darkMode}]">
        <h1 @click="reloadPage">to<span class="title">do.</span></h1>
        
        <div class="pomodoro">
            <Pomodoro></Pomodoro>
        </div>

        <div class="header__actions">
            <div class="header__advanced-filter" @click="openAdvancedFilters">
                <i class="fa fa-filter"></i>

                <div v-if="advancedFilters"  class="menu-dropdown">
                    <i class="fa fa-star" @click="filterFavorite">Favoritas</i>
                    <i class="fa fa-check-circle-o" @click="filterCompleted">Concluídas</i>
                    <div class="advancedFilters_clear">
                        <span @click="resetFilters">Limpar</span>
                    </div>
                </div>
            </div>

            <div class="header__search" :class="{'search-border': searchTask }">
                <input type="text" v-if="searchTask" v-model="searchQuery" @keyup.enter="searchTasks" placeholder="Search...">
                <i class="fa fa-search" @click="toggleSearch"></i>
            </div>

            <div class="header__mode-switch">
                <i class="fa fa-sun-o" v-if="darkMode" @click="toggleMode"></i>
                <i class="fa fa-moon-o" v-else @click="toggleMode"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Pomodoro from './PomodoroTimer';

export default {
    name: 'Header',
    components: { Pomodoro, },
    data() {
        return {
            searchTask: false,
            searchQuery: '',
            advancedFilters: false,
        }
    },
    computed: {
        ...mapGetters(['filteredFavorites']),
        darkMode() {
            return this.$store.state.darkMode;
        },
    },
    methods: {
        openAdvancedFilters() {
            this.advancedFilters = !this.advancedFilters;
        },
        toggleSearch() {
            this.searchTask = !this.searchTask;
        },
        toggleMode() {
            this.$store.commit('TOGGLE_DARK_MODE');
        },
        reloadPage() {
            window.location.reload();
        },
        searchTasks() {
            this.$store.dispatch('setSearchQuery', this.searchQuery);
        },
        filterFavorite() {
            this.$store.dispatch('setSearchQuery', '');

            this.advancedFilters = false;

            this.searchQuery = '';

            this.$store.dispatch('setSearchQuery', '');
            
            this.$store.dispatch('filterFavorites');
        },
        filterCompleted() {
            this.$store.dispatch('setSearchQuery', '');

            this.advancedFilters = false;

            this.searchQuery = '';

            this.$store.dispatch('setSearchQuery', '');
            
            this.$store.dispatch('filterCompleted');
        },
        resetFilters() {
            this.$store.dispatch('setSearchQuery', '');

            this.$store.dispatch('loadTasks');
        },
    }
}
</script>

<style scoped>
@import '@/assets/styles/vars.css';

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: var(--bg-main-dark);
    color: var(--text-dark);
}

.light-mode {
    background: var(--bg-main-light);
    color: var(--text-light);
}

.title {
    color: var(--primary);
    cursor: pointer;
}

.header__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.header__actions .fa {
    cursor: pointer;
}

.header__advanced-filter {
    display: flex;
    position: relative;
}

.menu-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: var(--bg-card-dark);
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(53, 53, 53, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15px;
    padding: 10px;
    z-index: 99;
}

.menu-dropdown i {
    display: flex;
    gap: 5px;
}

.menu-dropdown i label {
    cursor: pointer;
}

.advancedFilters_clear {
    display: flex;
    justify-content: flex-end; 
    align-items: flex-end;
    font-size: 0.7rem;
    font-weight: 700;
    cursor: pointer;
}

.advancedFilters_clear span {
    margin-top: 10px;
}

.header__search {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: var(--text-dark);
}

.header__search input {
    background: transparent;
    padding: 5px 10px;
    border: none;
    width: 100px;
    color: var(--text-dark);
}

.header__search input:focus {
    outline: none;
}

.header__search i {
    padding-bottom: 5px;
}

.search-border {
    border: 1px solid var(--dark-2);
    border-radius: 4px;
    padding: 0px 10px;
}

.light-mode .header__search input {
    color: var(--text-light); 
}

.light-mode .header__search i {
    color: var(--text-light); 
}
</style>
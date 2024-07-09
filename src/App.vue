<template>
  <div id="app" :class="toggleDarkMode">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isDarkMode']),
    toggleDarkMode() {
      return {
        'dark-mode': this.isDarkMode,
        'light-mode': !this.isDarkMode
      };
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/vars.css';

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: var(--main-font);
}

#app {
  color: var(--text-dark);
  height: 100vh;
  width: 100vw;
}

.dark-mode {
  background: var(--bg-main-dark);
}

.light-mode {
  background: var(--bg-main-light);
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>

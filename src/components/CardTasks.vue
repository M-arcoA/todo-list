<template>
    <div class="tasks" :class="cardClasses">
        <div class="tasks__header">
            <h3>tasks</h3>
        </div>

        <div class="tasks__content" v-if="filteredTasks.length > 0">
            <div class="content_btn">
                <ButtonAdd/>
            </div>

            <div class="content_task">
                <ItemTask
                    v-for="(task) in filteredTasks"
                    :key="task.id"
                    :task="task"
                />
            </div>
        </div>

        <div class="tasks__content-empty" v-else>
            <div class="content_btn">
                <ButtonAdd/>
            </div>

            <p>Sem tarefas listadas.</p>
        </div>
    </div>
</template>

<script>
import ButtonAdd from './Button';
import ItemTask from './ItemTask';
import { mapGetters } from 'vuex';

export default {
    name: 'CardTasks',
    components: { ButtonAdd, ItemTask },
    computed: {
        ...mapGetters(['isDarkMode', 'filteredTasks']),
        cardClasses() {
            return {
                'dark-mode': this.isDarkMode,
                'light-mode': !this.isDarkMode
            };
        }
    }
}
</script>

<style scoped>
@import '@/assets/styles/vars.css';

.dark-mode {
  background: var(--bg-card-dark);
}

.light-mode {
  background: var(--bg-card-light);
}

.tasks {
    min-width: 80vw;
    min-height: 60vh;
    overflow-y: auto;
    padding: 20px;
    border-radius: 6px;
}

.tasks__header {
    color: var(--primary);
}

.tasks__content, .tasks__content-empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.tasks__content-empty {
    gap: 100px;
    font-size: 0.7rem;
}

.content_task {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
}
</style>
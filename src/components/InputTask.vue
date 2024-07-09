<template>
    <div class="input_task">
        <input 
            type="text" 
            placeholder="new task" 
            v-model="task"
            @keyup.enter="addNewTask"
        >
        <button @click="addNewTask">
            <i class="fa fa-plus"></i>
        </button>
    </div>
</template>

<script>
export default {
    name: 'InputTask',
    data() {
        return {
            task: '',
        }
    },
    methods: {
        addNewTask() {
            if (this.task.trim() !== '') {
                this.$store.dispatch('createTask', this.task);
                this.task = '';
            }
        },
    }
}
</script>

<style scoped>
@import '@/assets/styles/vars.css';

.input_task {
    display: flex;
    justify-content: center;
    gap: 15px;
}

input {
    border: 1px solid var(--dark-2);
    border-radius: 4px;
    background: transparent;
    padding: 5px 10px;
    color: var(--text-dark);
    width: 50%;
}

button {
    border: none;
    background: var(--primary);
    color: var(--text-dark);
    border-radius: 50%;
    padding: 3px 10px; 
}
</style>
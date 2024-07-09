<template>
    <div class="btn_new">
        <button 
            v-if="btnAtivo" 
            @click="toggleBtnClick"
        >
            <i class="fa fa-plus"></i>
            add
        </button>

        <div 
            v-else
            class="input_new-task"
            @click="handleButtonClick"
        >
            <InputTask/>
        </div>
    </div>
</template>

<script>
import InputTask from './InputTask';

export default {
    name: 'ButtonAdd',
    components: { InputTask, },
    data() {
        return {
            btnAtivo: true,
        }
    },
    emits: ['saveTask'],
    methods: {
        toggleBtnClick() {
            this.btnAtivo = false;
        },
        handleButtonClick() {
            this.$emit('saveTask');
        },
    },
    computed: {},
    watch: {},
}
</script>

<style scoped>
@import '@/assets/styles/vars.css';

.btn_new button {
    border: none;
    border-radius: 20px;
    padding: 5px 15px;
    background: var(--primary);
    color: var(--text-dark);
    font-weight: 600;
    cursor: pointer;
}
</style>
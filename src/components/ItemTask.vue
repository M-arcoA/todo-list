<template>
    <div class="item item-task" :class="itemClasses">
        <div 
            class="item__task" 
            v-if="!editing" 
            @click="toggleChecked" 
            :class="{ 'checked': task.checked }"
        >
        <i class="fa fa-check-circle-o" v-if="task.checked"></i>
        <i class="fa fa-circle-thin" v-else></i>
            <span @click="startEditing">{{ task.title }}</span>
        </div>
        <div class="item__task" v-else>
            <input type="text" v-model="editedTask" @keyup.enter="saveTask">
        </div>

        <div class="item__actions">
            <div class="actions">
                <i class="fa fa-star" v-if="task.favorite" @click="toggleFavorite"></i>
                <i class="fa fa-star-o" v-else @click="toggleFavorite"></i>
                <i class="fa fa-pencil" @click="startEditing" v-if="!editing"></i>
                <i class="fa fa-check" @click="saveTask" v-if="editing"></i>
                <i class="fa fa-trash" @click="deleteTask"></i>
            </div>

            <div class="actions-menu">
                <i class="fa fa-ellipsis-v" @click="openActions"></i>

                <div v-if="actionsMenu" class="menu-dropdown">
                    <i class="fa fa-star" v-if="task.favorite" @click="toggleFavorite">Favoritar</i>
                    <i class="fa fa-star-o" v-else @click="toggleFavorite">Favoritar</i>
                    <i class="fa fa-pencil" @click="startEditing" v-if="!editing">Editar</i>
                    <i class="fa fa-check" @click="saveTask" v-if="editing">Salvar</i>
                    <i class="fa fa-trash" @click="deleteTask">Deletar</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'ItemTask',
    props: ['task', 'id'],
    data() {
        return {
            actionsMenu: false,
            editing: false,
            editedTask: ''
        }
    },
    methods: {
        openActions() {
            this.actionsMenu = !this.actionsMenu;
        },
        deleteTask() {
            this.$store.dispatch('deleteTask', this.task.id);
        },
        startEditing() {
            this.editing = true;
            this.editedTask = this.task.title;
        },
        saveTask() {
            if (this.editedTask === '') {
                this.errorMessage('Não é possível salvar um item vazio!');
                this.editing = false;
                this.editedTask = this.task.title;
                return;
            }

            this.$store.dispatch('updateTask', {
                id: this.task.id,
                title: this.editedTask
            });

            this.editing = false;
            this.editedTask = this.task.title;
        },
        toggleChecked() {
            this.$store.dispatch('toggleChecked', this.task.id);
        },
        toggleFavorite() {
            this.$store.dispatch('toggleFavorite', this.task.id);
        },
        errorMessage(message) {
            this.$toasted.show(message, {
                theme: 'bubble',
                position: 'top-center',
                duration: 10000,
                type: 'error',
                action: {
                    icon: 'x',
                    onClick: (e, toastObject) => {
                        toastObject.goAway(0);
                    }
                },
            });
        },
    },
    computed: {
        ...mapGetters(['isDarkMode']),
        itemClasses() {
            return {
                'dark-mode': this.isDarkMode,
                'light-mode': !this.isDarkMode
            };
        }
    },
}
</script>

<style scoped>
@import '@/assets/styles/vars.css';

.checked {
    text-decoration: line-through;
}

.dark-mode {
    background: var(--bg-item-dark) !important;
    color: var(--text-dark);
}

.light-mode {
    background: var(--bg-item-light) !important;
    color: var(--text-light);
}

.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 20px;
    padding: 5px 15px;
    font-size: 0.8rem;
    cursor: pointer;
}

.item__task .fa {
    margin-right: 10px;
    cursor: pointer;
}

.item__task input {
    border: 1px solid var(--dark-2);
    border-radius: 4px;
    background: transparent;
    padding: 2px 5px;
    color: var(--text-dark);
}

.item__actions .actions {
    display: flex;
    gap: 10px;
}

.fa {
    cursor: pointer;
}

.actions-menu {
    display: none;
    position: relative;
}

.menu-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: var(--bg-card-dark);
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(236, 236, 236, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
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

@media screen and (max-width: 750px) {
    .item__actions .actions {
        display: none;
    }

    .actions-menu {
        display: block;   
    }
}
</style>
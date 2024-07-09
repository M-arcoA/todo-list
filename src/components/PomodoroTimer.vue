<template>
    <div>
        <button class="pomodoro__timer" @click="toggleModal">
            <i class="fa fa-clock-o"></i>
            {{ formattedMinutes }}:{{ formattedSeconds }}
        </button>

        <transition name="modal-fade">
            <div v-if="showModal" class="pomodoro__modal">
                <div class="modal-container"  :class="pomoClasses">
                    <div class="modal-header">
                        <i class="fa fa-times" @click="closeModal"></i>
                    </div>
                    <div class="modal-content">
                        <template v-if="!showInput">
                            <div class="modal-timer">{{ formattedMinutes }}:{{ formattedSeconds }}</div>
                        </template>
                        <template v-else>
                            <div class="modal-input">
                                <input v-model="inputMinutes" type="number" min="0" placeholder="Enter minutes">
                                <button v-if="showInput" @click="resetTimer">Start</button>
                            </div>
                        </template>
        
                        <div class="modal-buttons">
                            <i class="fa fa-play" @click="startTimer" v-if="!timerActive"></i>
                            <i class="fa fa-stop" @click="stopTimer" v-if="timerActive"></i>
                            <i class="fa" v-if="timerActive" :class="timerActive ? 'fa-pause' : 'fa-play'" @click="toggleTimer"></i>
                            <i class="fa fa-cog" @click="showResetInput"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            showModal: false,
            modalMinutes: 25,
            modalSeconds: 0,
            timer: null,
            timerActive: false,
            showInput: false,
            inputMinutes: null
        };
    },
    computed: {
        ...mapGetters(['isDarkMode']),
        formattedMinutes() {
            return this.formatTime(this.modalMinutes);
        },
        formattedSeconds() {
            return this.formatTime(this.modalSeconds);
        },
        pomoClasses() {
            return {
                'dark-mode': this.isDarkMode,
                'light-mode': !this.isDarkMode
            };
        },
    },
    methods: {
        formatTime(time) {
            return String(time).padStart(2, '0');
        },
        toggleModal() {
            this.showModal = !this.showModal;
        },
        closeModal() {
            this.showModal = false;
        },
        startTimer() {
            if (!this.timer) {
                this.timerActive = true;
                this.timer = setInterval(() => {
                    if (this.modalSeconds === 0) {
                        if (this.modalMinutes === 0) {
                            this.stopTimer(); 
                        } else {
                            this.modalMinutes -= 1;
                            this.modalSeconds = 59;
                        }
                    } else {
                        this.modalSeconds -= 1;
                    }
                }, 1000);
            }
        },
        stopTimer() {
            clearInterval(this.timer);
            this.timer = null;
            this.timerActive = false;

            this.modalMinutes = 25;
            this.modalSeconds = 0;
        },
        toggleTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
                this.timerActive = false;
            } else {
                this.startTimer();
            }
        },
        showResetInput() {
            this.showInput = true;
        },
        resetTimer() {
            if (this.inputMinutes !== null && this.inputMinutes !== '') {
                this.modalMinutes = parseInt(this.inputMinutes);
                this.modalSeconds = 0;
            } else {
                this.modalMinutes = 25;
                this.modalSeconds = 0;
            }
            this.showInput = false;
            this.timerActive = false;
            clearInterval(this.timer);
            this.timer = null;
        }
    }
};
</script>
  
<style scoped>
@import '@/assets/styles/vars.css';
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.5s;
}

.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}

.dark-mode {
  background: var(--bg-pomo-dark);
  color: var(--text-dark);
}

.light-mode {
  background: var(--bg-pomo-light);
  color: var(--bg-item-dark);
}

.pomodoro__modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modal-container {
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 300px;
    justify-content: center;
}

.modal-header {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    margin-bottom: auto;
}

.modal-header i {
    cursor: pointer;
}

.modal-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 0px 0px 20px 0px;
    margin-bottom: auto;
}

.modal-timer {
    font-size: 2.2rem;
    margin-bottom: 20px;
    font-weight: 700;
}

.modal-input {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.modal-input input {
    border: 1px solid var(--dark-2);
    border-radius: 4px;
    background: transparent;
    padding: 5px 10px;
    color: var(--text-dark);
    width: 50%;
    margin: 20px 0px;
}

.modal-input input:focus {
    outline: none;
}

.modal-input button {
    border: none;
    background: var(--primary);
    color: var(--text-dark);
    border-radius: 5px;
    padding: 3px 10px; 
}

.modal-buttons {
    display: flex;
    gap: 15px;
}

.modal-buttons i {
    cursor: pointer;
}

.pomodoro__timer {
    background-color: var(--primary);
    color: var(--text-dark);
    padding: 10px 15px;
    border: none;
    font-weight: 500;
    border-radius: 4px;
    cursor: pointer;
}
</style>
  
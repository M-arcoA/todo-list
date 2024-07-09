<template>
    <div class="todo">
        <Header/>

        <CardTasks/>

        <Footer />
    </div>
</template>

<script>
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardTasks from '@/components/CardTasks';

export default {
    components: { Header, Footer, CardTasks },
}
</script>

<style scoped>
@import '@/assets/styles/vars.css';

.todo {
    width: 80vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 15px;
}
</style>
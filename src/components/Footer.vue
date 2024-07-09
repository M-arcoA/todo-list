<template>
    <div class="footer">
        <div class="underline"></div>

        <div class="copyright">
            <span>Dyovana Menegatti</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer',
}
</script>

<style scoped>
@import '@/assets/styles/vars.css';

.footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    margin-top: 30px;
}

.underline {
    width: 40%;
    height: 1px;
    background: var(--dark-2);
}

.copyright {
    text-align: center;
    font-size: 0.7rem;
    color: var(--dark-2);
}
</style>
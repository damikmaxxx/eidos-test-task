<template>
    <div class="navbar-item" :class="{ active: isActive }" @click="navigate">
        <img v-if="icon" :src="icon" alt="icon" class="navbar-item__icon" />
        <span class="navbar-item__text">{{ text }}</span>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
    text: { type: String, required: true },
    icon: { type: String, default: '' },
    path: { type: String, required: true }
})

const router = useRouter()
const route = useRoute()

const isActive = computed(() => route.path === props.path)

function navigate() {
    router.push(props.path)
}
</script>

<style scoped>
.navbar-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    width: 250px;
    height: 48px;
    cursor: pointer;
    border-radius: 16px;
    background-color: #fff;
    transition: background 0.2s;

}

.navbar-item:hover {
    background-color: #F4F4F4;
}

.navbar-item.active {
    background-color: #3761F3;
    color: white;
}

.navbar-item__icon {
    width: 20px;
    height: 20px;
}

.navbar-item__text {
    font-weight: 800;
}

.navbar-item.active .navbar-item__icon {
    filter: brightness(0) invert(1);
}
</style>

<template>
    <div class="pagination">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
            <span class="arrow rotated"><img src="@/assets/icons/Arrow2.svg" alt=""></span>
        </button>

        <span v-for="page in totalPages">
            <button @click="goToPage(page)" :class="{ active: page === currentPage }">{{ page }}</button>
        </span>

        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
            <span class="arrow"><img src="@/assets/icons/Arrow2.svg" alt=""></span>
        </button>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
    totalItems: { type: Number, required: true },
    itemsPerPage: { type: Number, default: 10 },
    modelValue: { type: Number, default: 1 },
})

const emit = defineEmits(['update:modelValue'])

const currentPage = ref(props.modelValue)

watch(currentPage, (val) => {
    emit('update:modelValue', val)
})

watch(() => props.modelValue, (val) => {
    currentPage.value = val
})

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}


</script>

<style scoped>
.pagination {
    padding: 22px 12px;
    display: flex;
    gap: 5px;
    align-items: center;
    background-color: #F5F7F9;
}

.pagination button {
    padding: 5px 0px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background-color: #fff;
    font-size: 15px;
    font-weight: 500;
    transition: .2s;
    width: 30px;
    height: 30px;
    font-family: "Manrope", sans-serif;
}

.pagination button:hover {
    background-color: #E0E0E0;
}

.pagination button.active {
    background-color: #fff;
    color: #3761F3;
    outline: 1px solid #3761F3;
}

.pagination button:disabled {
    opacity: 0.5;
    cursor: default;
}

.arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: transform 0.3s ease;
    transform: rotate(180deg);
}

.arrow.rotated {
    transform: rotate(0deg);
}
</style>
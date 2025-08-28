<template>
    <div class="base-select" ref="selectRef">
        <div class="base-select__trigger" @click="toggle">
            <span class="base-select__text"> <img v-if="selectedOption?.icon" :src="selectedOption.icon" alt="icon"
                    class="icon" />
                <span>{{ selectedLabel }}</span></span>

            <span class="base-select__arrow" :class="{ open: isOpen }"><img src="@/assets/icons/Arrow2.svg"
                    alt=""></span>
        </div>
        <div v-if="isOpen" class="base-select__options">
            <div v-for="option in filteredOptions" :key="option.value" class="base-select__option"
                @click="select(option)">
                <span class="base-select__text">
                    <img :src="option.icon" alt="icon" class="icon" />
                    {{ option.label }}
                </span>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
    options: { type: Array, default: () => [] },
    modelValue: { type: [String, Number], default: '' },
})
const emit = defineEmits(['update:modelValue'])
const selectedOption = ref(null)

const isOpen = ref(false)
const selectedLabel = ref('')
const selectRef = ref(null)

function toggle() {
    isOpen.value = !isOpen.value
}

function select(option) {
    emit('update:modelValue', option.value)
    selectedOption.value = option
    selectedLabel.value = option.label
    isOpen.value = false
}

function handleClickOutside(event) {
    if (selectRef.value && !selectRef.value.contains(event.target)) {
        isOpen.value = false
    }
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

onMounted(() => {
    const found = props.options.find(o => o.value === props.modelValue)
    selectedOption.value = found || null
    selectedLabel.value = found ? found.label : 'Выберите...'
})

const filteredOptions = computed(() => {
    return props.options.filter(o => o.value !== props.modelValue)
})

</script>

<style scoped>
.base-select {
    position: relative;
    width: 200px;
    font-size: 15px;
    font-weight: 800;

}

.base-select__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 15px;
    width: 250px;
    height: 48px;
    cursor: pointer;
    border-radius: 16px;
    background-color: #fff;
    transition: background 0.2s;
    border: 1px solid #E0E0E0;
}

.base-select__trigger span {
    font-weight: 800;
}

.base-select__trigger:hover {
    background-color: #F4F4F4;
}

.base-select__arrow {
    margin-left: 8px;
    font-size: 12px;
    transition: transform 0.2s;
    transform: rotate(270deg);
    transform-origin: center center;
}


.base-select__arrow.open {
    transform: rotate(90deg);
}

.base-select__options {
    position: absolute;
    top: 105%;
    left: 0;
    width: 100%;
    border-radius: 12px;
    background-color: #fff;
    width: 250px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
    z-index: 10;
}

.base-select__option {
    padding: 10px 15px;
    cursor: pointer;
    transition: background 0.2s;
}

.base-select__option:hover {
    background-color: #F4F4F4;
}

.icon {
    width: 20px;
    height: 20px;
}

.base-select__text {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 800 !important;
}
</style>

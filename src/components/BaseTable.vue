<template>
    <div class="base-table">
        <div class="table-wrapper">
            <div class="table-head">
                <table>
                    <thead>
                        <tr class="header-row">
                            <th v-for="(col, key) in columns" :key="key" @click="key === 'time' && toggleDateSort()"
                                :style="{ width: col.settings?.width || 'auto' }"
                                :class="{ 'sortable-column': key === 'time' }">
                                <span class="header-text">
                                    {{ col.label }}
                                    <span class="header-text-sort" v-if="key === 'time'">
                                        <span class="array-sorting rotate" v-if="dateSortOrder === 'asc'"><img
                                                src="@/assets/icons/Arrow2.svg" alt=""></span>
                                        <span class="array-sorting" v-else><img src="@/assets/icons/Arrow2.svg"
                                                alt=""></span>

                                    </span>
                                </span>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="table-body">
                <table>
                    <tbody>
                        <tr v-for="(row, index) in paginatedRows" :key="index">
                            <td v-for="(col, key) in columns" :key="key"
                                :style="{ width: col.settings?.width || 'auto' }">
                                <span v-if="key === 'status'" class="status-cell"
                                    :style="{ backgroundColor: SESSION_STATUS_COLORS[row[key]] }">
                                    {{ SESSION_STATUSES[row[key]] }}
                                </span>

                                <div v-else-if="key === 'type'" class="type-cell">
                                    {{ SESSION_TYPES[row[key]] }}
                                </div>

                                <span v-else>{{ row[key] }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <BasePaginator :total-items="sortedRows.length" :items-per-page="itemsPerPage" v-model="currentPage" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SESSION_STATUS_COLORS, SESSION_STATUSES, SESSION_TYPES } from '@/utils/globalConst.js';
import BasePaginator from './UI/BasePaginator.vue';

const props = defineProps({
    columns: {
        type: Object,
        required: true
    },
    rows: {
        type: Array,
        required: true
    }
})

const currentPage = ref(1)
const itemsPerPage = 10

const paginatedRows = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedRows.value.slice(start, end);
})

const dateSortOrder = ref(null)

function toggleDateSort() {
    if (dateSortOrder.value === 'asc') dateSortOrder.value = 'desc'
    else dateSortOrder.value = 'asc'
}
const sortedRows = computed(() => {
    if (!dateSortOrder.value) {
        return [...props.rows]
    }

    return [...props.rows].sort((a, b) => {
        const dateA = new Date(a.timeForSorting)
        const dateB = new Date(b.timeForSorting)

        if (dateA < dateB) return dateSortOrder.value === 'asc' ? -1 : 1
        if (dateA > dateB) return dateSortOrder.value === 'asc' ? 1 : -1
        return 0
    })
})


</script>

<style scoped>
.base-table {
    width: 100%;
    margin: 0px 24px;
}

.base-table table {
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #E8EAEC;
}

.base-table th,
.base-table td {
    padding: 20px 12px;
    text-align: left;
    max-width: 600px;
    line-height: 1.25;
    font-size: 15px;
}

.base-table td {
    color: #333;
}

.base-table tr {
    border: 1px solid #E8EAEC;
}

.base-table th {
    font-weight: 800;
    font-size: 17px;
}

.table-body {
    height: 75vh;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #ccc #fff;
}

.table-body::-webkit-scrollbar {
    width: 8px;
}

.table-head {
    scrollbar-gutter: stable;
}

.base-table {
    border-radius: 12px;
    overflow: hidden;
}

.header-row {
    background-color: #F5F7F9;
    font-size: 17px;
    font-weight: 900;
}

.header-text {
    display: flex;
    font-weight: 800;
    justify-content: space-between;
}

.header-text-sort {
    display: flex;

    text-align: center;
    justify-content: center;
    align-items: center;
}


.header-text .base-table tbody tr:nth-child(odd) {
    background-color: #ffffff;
}

.base-table tbody tr:nth-child(even) {
    background-color: #f5f5f5;
}

.status-cell {
    color: black;
    padding: 7px 14px;
    border-radius: 43px;
    text-align: center;
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

.array-sorting {
    display: flex;
    width: 16px;
    height: 16px;
    justify-content: center;
    align-self: center;

    transform: rotate(270deg);
}

.array-sorting.rotate {
    transform: rotate(90deg);
}

.sortable-column {
    cursor: pointer;
}

@media (max-width: 1200px) {
    .base-table table {
        table-layout: auto;
    }

    .base-table th,
    .base-table td {
        width: auto !important;
    }

    .table-wrapper {
        overflow-x: auto;
    }
}
</style>

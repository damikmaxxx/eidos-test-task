<template>
  <div class="sessions">
    <header class="sessions-header">
      <h1 class="page-title">Учебные сессий</h1>

      <div class="header-controls">
        <div class="search-input">
          <img src="@/assets/icons/Loupe.svg" alt="search" class="search-icon" />
          <input type="text" placeholder="Поиск" v-model="query" />
        </div>
        <div class="icon-blocks">
          <div class="icon-item">
            <img src="@/assets/icons/Filter.svg" alt="">
          </div>
          <div class="icon-item">
            <img src="@/assets/icons/Sort.svg" alt="">
          </div>
        </div>
        <button class="btn-create">Создать</button>
      </div>
    </header>
    <main class="sessions-content">
      <BaseTable :columns="columns" :rows="filteredRows" />
    </main>
  </div>
</template>

<script setup lang="ts">
import BaseTable from '@/components/BaseTable.vue';
import { computed, onMounted, ref, watch } from 'vue';


const columns = {
  time: {
    label: 'Дата и время',
  },
  status: {
    label: 'Статус',
    settings: { width: '180px', }
  },
  name: {
    label: 'Название учебного модуля',
    settings: { width: '517px' }
  },
  type: {
    label: 'Тип сессии',
  },
  room: {
    label: 'Комната',
  },
  group: {
    label: 'Группа',
  }
}

const rows = ref([]);


const query = ref('')

const filteredRows = computed(() => {
  if (query.value.length >= 2) {
    return rows.value.filter(row =>
      row.name.toLowerCase().includes(query.value.toLowerCase())
    )
  }
  return rows.value
})

onMounted(async () => {
  const res = await fetch('/BD.json');
  const data = await res.json();

  rows.value = data.sessions.map(session => ({
    id: session.id,
    time: `${new Date(session.start).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })} - ${new Date(session.end).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`,
    timeForSorting: session.start,
    status: session.status.name,
    name: session.module,
    type: session.type.name,
    room: session.rooms.map(r => r.name).join(', '),
    group: session.groups.map(g => g.name).join(', ')
  }));
});

</script>

<style>
.sessions {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #333;
  font-family: 'Manrope', sans-serif;
}

.sessions h1 {
  font-size: 24px;
}

.sessions-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 14px;
}

.search-input {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #E0E0E0;
  border-radius: 12px;
  padding: 5px 10px;
  width: 250px;
  height: 44px;
}

.search-input input {
  border: none;
  outline: none;
  flex: 1;
  padding-left: 8px;
  font-size: 14px;
  color: black;
}

.search-icon {
  width: 24px;
}

.icon-blocks {
  display: flex;
  gap: 14px;
}

.icon-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: #eee;
  cursor: pointer;
  font-size: 1.2rem;
}

.btn-create {
  padding: 0.5rem 1rem;
  height: 44px;
  background-color: #3761F3;
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-family: "Manrope", sans-serif;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn-create:hover {
  background-color: #4338ca;
}

.sessions-content {
  display: flex;
  text-align: center;
}
</style>

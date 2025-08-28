<template>
  <div class="wrapper">
    <div :class="['sidebar', { activeSidebar: sidebarIsActive }]">
      <Navbar @toggle="handleNavbarToggle" :isActive="sidebarIsActive" />
    </div>
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Navbar from './components/Navbar/Navbar.vue';

const sidebarIsActive = ref(true);

function handleNavbarToggle() {
  sidebarIsActive.value = !sidebarIsActive.value;
}
</script>
<style scoped>
.wrapper {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: #F4F4F8;
}

.sidebar {
  width: 0px;
  margin-right: 0px;
  background-color: #fff;
  transition: .4s;
}

.activeSidebar {
  width: 274px;
  transition: .4s;
  margin-right: 8px;
}

.content {
  flex: 1;
  background-color: #fff;
}
</style>

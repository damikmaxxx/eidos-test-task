<template>
    <div :class="['navbar', { 'isOpen': isActive }]">

        <div class="navbar__top">
            <div :class="['logo', { 'isOpen': isActive }]" @click="$router.push('/')">
                <img alt="logo" src="@/assets/logo.svg" width="46" height="46" />
                <h1>Сим Центр</h1>

            </div>
            <button class="toggle-btn" @click="$emit('toggle')">
                <span :class="['arrow', { 'rotated': isActive }]"><img src="@/assets/icons/arrow.svg" alt=""></span>
            </button>
        </div>
        <div class="navbar__list">
            <NavbarItem v-for="item in navItems" :key="item.path" :text="item.title" :icon="item.icon"
                :path="item.path" />
        </div>
        <div class="navbar__bottom">
            <div class="user-block">
                <div class="user-block__text">
                    <h4>Барнаби Мармадюк</h4>
                    <span>Преподователь</span>
                </div>
                <div>
                    <img src="@/assets/user-logo.png" alt="">
                </div>
            </div>

            <NavbarItem class="exit-btn" text="Выйти" :icon="icons.LogOut" path="/login" />
            <BaseSelect class="mb" v-model="globalLang" :options="[
                { value: 'ru', label: 'Русский', icon: icons.FlagRu },
                { value: 'eu', label: 'Английский', icon: icons.FlagEu },
            ]" />
            <span class="version">Версия 1.02</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import NavbarItem from './NavbarItem.vue';
import { icons } from '@/assets/icons';
import BaseSelect from '../UI/BaseSelect.vue';

defineProps({
    isActive: Boolean
})

const globalLang = ref('ru');

const navItems = [
    { title: 'Расписание', path: '/schedule', icon: icons.CalendarBlank },
    { title: 'Учебные сессии', path: '/sessions', icon: icons.GraduationCap },
    { title: 'Список комнат', path: '/rooms', icon: icons.Door },
    { title: 'Пользователи', path: '/users', icon: icons.Student },
    { title: 'Учебные группы', path: '/groups', icon: icons.UserList },
    { title: 'Список устройств', path: '/devices', icon: icons.Camera },
    { title: 'Настройки системы', path: '/custom-systems', icon: icons.Gear },
    { title: 'Архив', path: '/archive', icon: icons.Archive }
];

</script>

<style scoped>
.navbar {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    transition: width 0.3s ease;

}

.navbar__top {
    position: relative;
    padding: 16px 0px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
    position: relative;
    width: 100%;
    background-color: #fff;

}

.navbar__top h1 {
    font-size: 24px;
    margin-left: 15px;
    font-weight: 800;
    line-height: 1.8;
}



.toggle-btn {
    position: absolute;

    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: none;
    background-color: #2F3144;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    right: -30px;
    top: 30px;
}

.navbar.isOpen .toggle-btn {
    top: calc(50% - 12px);
    right: -15px;
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

.logo {
    display: flex;
    white-space: nowrap;
    display: none;
}

.navbar__list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    align-items: center;
    display: none;
    font-size: 15px;
    flex-grow: 1;

}

.navbar__btns>* {
    transition: opacity 0.3s ease;
}



.user-block {
    padding: 10px 10px;
    background-color: #fff;
    border-radius: 16px;
    display: flex;
    width: 250px;
    font-size: 15px;
    justify-content: space-between;
    margin-bottom: 18px;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.12);
}

.user-block__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.user-block__text h4 {
    margin: 0;
    font-weight: 700;

}

.exit-btn {
    margin-bottom: 4px
}

.mb {
    margin-bottom: 25px;
}

.navbar__bottom {
    display: none;
}

.navbar.isOpen .navbar__bottom {
    display: block;

}

.navbar.isOpen .logo,
.navbar.isOpen .navbar__list {
    display: flex;

}
</style>

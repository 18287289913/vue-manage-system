<template>
    <div>
        首页
    </div>
</template>

<script>
import { reactive } from "vue";
export default {
    name: "dashboard",
    setup() {
        const name = localStorage.getItem("ms_username");
        const role = name === "admin" ? "超级管理员" : "普通用户";
        return {
            name,
            role
        };
    },
};
</script>

<style scoped>
</style>

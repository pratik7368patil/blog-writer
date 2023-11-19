<script setup lang="ts">
import { onBeforeMount } from "vue";
import { initDb } from "./db";

onBeforeMount(async () => {
  initDb();
});
</script>
<template>
  <router-view></router-view>
</template>

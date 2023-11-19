<script setup lang="ts">
import BlockEditor from "./BlockEditor.vue";
import BlogNav from "./BlogNav.vue";
async function onChange(api: any, event: any, instance: any) {
  console.log(api);
  console.log(event);
  const data = await instance.save();
  console.log(data);
}
</script>

<template>
  <BlogNav />
  <BlockEditor @on-change="onChange" />
</template>

<script setup lang="ts">
import BlockEditor from "./BlockEditor.vue";
import BlogNav from "./BlogNav.vue";
import { useRoute } from "vue-router";
import { getBlogById, updateBlog } from "../db/index";
import { computed, onMounted, ref } from "vue";

const updatedContent = ref<string>("");
async function onChange(__: any, _: any, instance: any) {
  const data = await instance.save();
  console.log(JSON.stringify(data));
  updatedContent.value = JSON.stringify(data);
}

const route = useRoute();
const blogId = computed((): string => {
  return (route.params?.id || "") as string;
});

const currentBlog = ref<any>({});
const loading = ref<boolean>(false);
onMounted(async () => {
  loading.value = true;
  currentBlog.value = await getBlogById(blogId.value);
  loading.value = false;
});

async function handleSave() {
  await updateBlog(blogId.value, { body: updatedContent.value });
}
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <BlogNav :title="currentBlog.title" @save="handleSave" />
    <BlockEditor @on-change="onChange" :body="currentBlog.body" />
  </div>
</template>

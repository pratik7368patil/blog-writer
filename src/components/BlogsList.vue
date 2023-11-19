<script setup lang="ts">
import { useRouter } from "vue-router";
import { getAllBlogs, deleteBlog } from "./../db/index";
import { posts } from "../stores/posts";
import { onMounted, computed } from "vue";
import dayjs from "dayjs";

const router = useRouter();

function redirectToBlog(id: string) {
  router.push({
    name: "blog",
    params: {
      id,
    },
  });
}

onMounted(async () => {
  await getAllBlogs();
});

const allPosts = computed(() => {
  return posts.getPosts();
});

async function handleDelete(id: string) {
  await deleteBlog(id);
}
</script>
<template>
  <div class="w-full flex justify-center mt-4">
    <div class="overflow-x-auto rounded-lg border border-gray-200 w-10/12">
      <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead class="ltr:text-left rtl:text-right">
          <tr>
            <th
              class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left"
            >
              Name
            </th>
            <th
              class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left"
            >
              Created on
            </th>
            <th
              class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left"
            >
              Last updated
            </th>
            <th
              class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left"
            >
              Action
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr v-for="blog in allPosts" :key="blog.$id">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {{ blog.title }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ dayjs(blog.$createdAt).format("MMM D, YYYY h:mm A") }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ dayjs(blog.$updatedAt).format("MMM D, YYYY h:mm A") }}
            </td>
            <td class="whitespace-nowrap px-4 py-2">
              <button
                @click="() => redirectToBlog(blog.$id)"
                class="inline-block rounded bg-indigo-50 text-indigo-600 px-4 py-2 text-xs font-medium hover:bg-indigo-100"
              >
                View
              </button>
              <button
                @click="() => handleDelete(blog.$id)"
                class="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-500 ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="!allPosts.length"
        class="py-2 block w-full text-center text-xs font-medium"
      >
        No blogs found!
      </div>
    </div>
  </div>
</template>

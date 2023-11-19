<script setup lang="ts">
import { useRouter } from "vue-router";
import { getAllBlogs } from "./../db/index";
import { onMounted, ref } from "vue";

const router = useRouter();

function redirectToBlog(id: string) {
  router.push({
    name: "blog",
    params: {
      id,
    },
  });
}

const allBlogs = ref<any>([]);

onMounted(async () => {
  allBlogs.value = await getAllBlogs();
});
</script>
<template>
  <div class="w-full flex justify-center mt-4">
    <div
      class="overflow-x-auto rounded-lg border border-gray-200 w-3/4 max-w-4xl"
    >
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
          <tr v-for="blog in allBlogs" :key="blog.id">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {{ blog.title }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ blog.createdAt }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ blog.updatedAt }}
            </td>
            <td class="whitespace-nowrap px-4 py-2">
              <button
                @click="() => redirectToBlog(blog.id)"
                class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="!allBlogs.length"
        class="py-2 block w-full text-center text-xs font-medium"
      >
        No blogs found!
      </div>
    </div>
  </div>
</template>

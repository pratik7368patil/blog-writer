<script setup lang="ts">
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import RawTool from "@editorjs/raw";
import Checklist from "@editorjs/checklist";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import { onMounted, ref } from "vue";

const emit = defineEmits(["onChange"]);

const editor = ref<any>(null);
onMounted(() => {
  editor.value = new EditorJS({
    holder: "block-editor-container",
    placeholder: "Let`s write an awesome story!",
    tools: {
      header: Header,
      raw: RawTool,
      embed: Embed,
      quote: Quote,
      marker: {
        class: Marker,
        shortcut: "CMD+SHIFT+M",
      },
      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      list: {
        class: List,
        inlineToolbar: true,
        config: {
          defaultStyle: "unordered",
        },
      },
    },
    onChange: (api: any, event: any) =>
      emit("onChange", api, event, editor.value),
  });
});
</script>
<template>
  <div id="block-editor-container"></div>
</template>

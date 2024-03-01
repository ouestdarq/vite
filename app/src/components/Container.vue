<template>
  <main
    ref="container"
    class="w-100 p-2 pt-0 position-absolute"
    v-scroll="scroll"
  >
    <slot></slot>
  </main>
</template>

<script setup>
import { computed, reactive, ref, watchEffect } from "vue";

const emit = defineEmits(["setScroll"]);

const props = defineProps({
  top: {
    type: Object,
    required: false,
  },
});

const container = ref(null);
watchEffect(() => {
  const { main, top } = reactive({
    main: container,
    top: props.top,
  });
  if (main) main.style.top = top.px;
});

let y = false;
function scroll(e, el) {
  const { min, active, unset } = reactive({
    min: 25,
    active: computed(() => window.scrollY < min && y),
    unset: computed(() => window.scrollY >= min && !y),
  });
  if (active) emit("setScroll", (y = false));
  if (unset) emit("setScroll", (y = true));
}
</script>

<style></style>

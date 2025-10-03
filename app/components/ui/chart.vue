<script setup lang="ts">
import { Chart, registerables } from "chart.js";
import { onMounted, ref, watch } from "vue";

const props = defineProps<{
  type: "line" | "pie";
  data: any;
  options?: any;
}>();

Chart.register(...registerables);

const canvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

onMounted(() => {
  if (canvas.value) {
    chart = new Chart(canvas.value, {
      type: props.type,
      data: props.data,
      options: props.options || {},
    });
  }
});

watch(() => props.data, (newData) => {
  if (chart) {
    chart.data = newData;
    chart.update();
  }
});
</script>

<template>
  <canvas ref="canvas" />
</template>

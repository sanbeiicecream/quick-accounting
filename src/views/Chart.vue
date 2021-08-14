<template>
  <Layout>
    <ChartTop/>
    <ChartContent/>
  </Layout>
</template>

<script lang="ts">
import ChartTop from '@/components/charts/ChartTop.vue';
import ChartContent from '@/components/charts/ChartContent.vue';
export default {
  name: 'ChartVue',
  components: {ChartContent, ChartTop}
};
</script>

<style lang="scss" scoped>
</style>
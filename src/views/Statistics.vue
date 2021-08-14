<template>
  <div>
    <Layout>
      <StatisticsTop/>
      <record-display/>
    </Layout>
  </div>
</template>

<script lang="ts">
import StatisticsTop from '@/components/statistics/StatisticsTop.vue';
import RecordDisplay from '@/components/statistics/RecordDisplay.vue';
export default {
  name: 'Statistics',
  components: {RecordDisplay, StatisticsTop}
};
</script>

<style lang="scss" scoped>
</style>
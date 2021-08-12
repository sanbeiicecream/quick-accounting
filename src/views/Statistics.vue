<template>
  <div>
    <Layout>
      <StatisticsTop/>
      <record-display/>
    </Layout>
  </div>
</template>

<script lang="ts">
import StatisticsTop from '@/components/Statistics/StatisticsTop.vue';
import RecordDisplay from '@/components/Statistics/RecordDisplay.vue';
export default {
  name: 'Statistics',
  components: {RecordDisplay, StatisticsTop}
};
</script>

<style lang="scss" scoped>
</style>
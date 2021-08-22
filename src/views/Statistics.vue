<template>
  <div class="statistics-container" ref="container">
    <Layout>
      <StatisticsTop/>
      <record-display/>
    </Layout>
  </div>
</template>

<script lang="ts">
import StatisticsTop from '@/components/statistics/StatisticsTop.vue';
import RecordDisplay from '@/components/statistics/RecordDisplay.vue';
import {Vue,Component} from 'vue-property-decorator';
@Component({
  components:{RecordDisplay, StatisticsTop}
})
export default class Statistics extends Vue{
  mounted(){
    let div = this.$refs.container as HTMLDivElement
    div.style.height = document.documentElement.clientHeight + "px"
  }
}
</script>

<style lang="scss" scoped>
.statistics-container{
  height: 100vh;
}
</style>
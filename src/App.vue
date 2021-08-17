<template>
  <div id="app">
   <router-view/>
  </div>
</template>

<style lang="scss">
  @import "~@/assets/style/helper.scss";
  @import "~@/assets/style/reset.scss";
  body{
  }
  #app {
    font-family: $font-hei;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
    font-size: 16px;
  }
  @media (min-width:500px) {
    #app{
      max-width: 500px;
      margin: 0 auto;
      outline: 1px solid #d0d0d0;
    }
  }
</style>
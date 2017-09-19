/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <header class="header-container">
    <div class="title-content">
      <i class="fa fa-cloud"></i>
      <span class="title">迅传资源管理平台</span>
    </div>
  </header>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .header-container {
    height:40px;
    line-height: 40px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    .title-content {
      width: 200px;
      padding-left: 20px;
      text-align: center;
      .fa-cloud {
        font-size: 2.2rem;
        vertical-align: baseline;
        opacity: 0.6;
      }
      .title {
        font-size: 2rem;
        /*vertical-align: middle;*/
      }
    }
  }
</style>

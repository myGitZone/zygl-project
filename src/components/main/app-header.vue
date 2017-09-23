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
    <div class="nav-container">
      <span class="nav-item">
        <router-link to="home">资源管理</router-link>
      </span>
      <span class="nav-item">
        <router-link to="organization">组织机构</router-link>
      </span>
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
      display: inline-block;
      width: 200px;
      padding-left: 20px;
      vertical-align: top;
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
    .nav-container{
      display: inline-block;
      vertical-align: top;
      font-size: 1.6rem;
    }
  }
</style>

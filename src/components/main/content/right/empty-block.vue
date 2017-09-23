/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="empty-content">
    <i class="fa fa-folder-open-o" aria-hidden="true"></i>
    <div class="tip-value">文件夹为空！</div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .empty-content {
    position: absolute;
    left: 0;
    right: 0;
    width: 100px;
    height: 40px;
    top: 30%;
    margin: auto;
    color: #aaa;
    text-align: center;
    font-size: 8rem;
    .tip-value {
      font-size: 1.5rem;
    }
  }
</style>

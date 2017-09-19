/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="file-block">
    <div class="item-select" :class="{'item-check':checked}">
      <i class="fa fa-check" aria-hidden="true"></i>
    </div>
    <div class="file-icon-content">
      <i class="file-icon"></i>
    </div>
    <div class="file-name">test</div>
  </div>
</template>

<script>
  export default {
    props: {
      checked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .file-block {
    display: inline-block;
    height: auto;
    max-height: 152px;
    margin: 10px;
    padding-top: 5px;
    border: 1px solid transparent;
    vertical-align: top;
    &:hover {
      transition: transform 0.2s;
      background: #e5f3ff;
      border-color: transparent;
      .item-select {
        background: rgba(0, 0, 0, 0.05);
      }
    }
    .file-icon-content {
      padding-left: 5px;
      height: 70px;
      width: 70px;
      .file-icon {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 100%;
        display: inline-block;
        pointer-events: none;
        background-image: url("../../../assets/image/folder_win10.png");
      }
    }
    .file-name {
      font-size: 1.6rem;
      text-align: center;
    }
    .item-select {
      position: absolute;
      width: 16px;
      height: 16px;
      margin-left: 5px;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      font-size: 1.2rem;
    }
    .item-check {
      background: #3b8cff !important;
    }
  }
</style>

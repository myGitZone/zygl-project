/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="tree-item-container">
    <i class="font-icon-common" :class="[id===1?'font-icon-home':'font-icon-folder']"></i>
    <span class="item-text">{{label}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String
      },
      id: {
        type: Number
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .tree-item-container {
    display: inline-block;
    width: 100%;
    font-size: 10px;
    vertical-align: middle;
    .font-icon-common {
      display: inline-block;
      height: 16px;
      width: 16px !important;
      margin-right: 0px;
      vertical-align: middle;
      background-size: 100% auto;
      background-repeat: no-repeat;
    }
    .font-icon-home {
      margin-top: -2px;
      background-image: url("../../../assets/image/groupRoot.png");
    }
    .font-icon-folder {
      height: 18px !important;
      width: 18px !important;
      background-image: url("../../../assets/image/groupGuest.png");
    }
    .item-text {
      vertical-align: middle;
    }
  }
</style>

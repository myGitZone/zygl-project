/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="right-menu">
    <ul class="menu-list">
      <li class="menu-list-item">22</li>
      <li class="menu-list-item">3344</li>
      <li class="menu-list-item">21212</li>
      <li class="menu-list-item">22</li>
      <li class="menu-list-item">3344</li>
      <li class="menu-list-item">21212</li>
      <li class="menu-list-item">22</li>
      <li class="menu-list-item">3344</li>
      <li class="menu-list-item">21212</li>
      <li class="menu-list-item">22</li>
      <li class="menu-list-item">3344</li>
      <li class="menu-list-item">21212</li>
    </ul>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .right-menu {
    position: absolute;
    width: 200px;
    z-index: 9999;
    box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-clip: padding-box;
    background: #fff;
    margin: 0;
    margin-left: 4px;
    font-size: 1.5rem;
    padding: 8px 0px;
    animation-duration: 0.25s;
    .menu-list {
      margin: 0;
      padding: 0;
      list-style-type: none;
      .menu-list-item {
        line-height: 25px;
        height: 25px;
        padding: 0 15px 0 20px;
        cursor: pointer;
        &:hover {
          background: #e1e1e1;
        }
      }
    }
  }
</style>

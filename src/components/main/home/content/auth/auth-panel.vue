<template>
  <div class="auth-panel">
    <div class="right-header">
      <div class="header-left">
        <span>文件夹：</span>
        <span>{{currentPath}}</span>
      </div>
      <div class="search-container">
        <el-input placeholder="请输入查询条件" size="small" icon="search" v-model="searchVal" :on-icon-click="handleIconClick">
        </el-input>
      </div>
    </div>
    <div class="auth-container">
      <auth-block v-for="(item, index) in temp" :authInfo="item" :key="index">
      </auth-block>
    </div>
    <div class="auth-content">
      <div class="folder-auth bottom-auth">
        <span class="auth-slect">文件夹权限：</span>
        <span class="auth-slect">
          <el-checkbox-group v-model="folderList">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="禁用"></el-checkbox>
            <el-checkbox label="选中且禁用"></el-checkbox>
          </el-checkbox-group>
        </span>
      </div>
      <div class="file-auth bottom-auth">
        <span class="auth-slect" style="padding-left:20px">文件权限：</span>
        <span class="auth-slect">
          <el-checkbox-group v-model="fileList">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="禁用"></el-checkbox>
            <el-checkbox label="选中且禁用"></el-checkbox>
          </el-checkbox-group>
        </span>
      </div>
      <div class="btn-content">
        <el-button size="small" type="primary">添 加</el-button>
        <el-button size="small" type="primary">编 辑</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import AuthBlock from './auth-block'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      searchVal: null,
      folderList: [],
      fileList: [],
      temp: [
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 }
      ]
    }
  },
  computed: {
    ...mapGetters(['currentPath'])
  },
  mounted() {
    for (let i = 0; i < 100; i++) {
      this.temp.push({ name: 1 })
    }
  },
  methods: {
    handleIconClick() { }
  },
  components: {
    AuthBlock
  }
}
</script>

<style lang="scss"  scoped>
.auth-panel {
  width: auto;
  height: 100%;
  .right-header {
    position: relative;
    height: 49px;
    width: 100%;
    min-width: 600px;
    background: #f8f8f8;
    background: #f8f8f8 url("../../../../../assets/image/bg.gif") 0px -2px repeat-x;
    border-bottom: 1px solid #ddd;
    .header-left {
      display: inline-block;
      height: 100%;
      padding-left: 10px;
      font-size: 16px;
      color: #736f6f;
      vertical-align: top;
      &:before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
    }
    .search-container {
      position: absolute;
      display: inline-block;
      right: 20px;
      width: 20%;
      height: 100%;
      vertical-align: top;
      &:before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
      .el-input {
        vertical-align: middle;
      }
    }
  }
  .auth-container {
    position: absolute;
    top: 50px;
    bottom: 180px;
    width: 100%;
    overflow: auto;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
  }
  .auth-content {
    position: absolute;
    height: 180px;
    bottom: 0;
    width: 100%;
    overflow: auto;
    box-sizing: border-box;
    .bottom-auth {
      height: 60px;
      font-size: 16px;
      line-height: 60px;
      border-bottom: 1px solid #eee;
      .auth-slect {
        padding-left: 20px;
        display: inline-block
      }
    }
    .btn-content {
      height: 58x;
      font-size: 16px;
      line-height: 58px;
      text-align: right;
      padding-right: 30px;
    }
  }
}
</style>
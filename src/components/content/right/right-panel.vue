/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="right-panel" @mousedown.stop="panelMouseDown">
    <div class="right-header">
      <div class="header-left">
        <div class="btn-group">
          <button class="btn-default" :class="{'btn-disable':leftDisable}" @click="preClick">
            <i class="font-icon fa fa-angle-left"></i>
          </button>
          <button class="btn-default" :class="{'btn-disable':rightDisable}" @click="nextClick">
            <i class="font-icon fa fa-angle-right"></i>
          </button>
        </div>
      </div>
      <div class="header-address">
        <button class="btn-default btn-home">
          <i class="font-icon-home"></i>
        </button>
        <div class="path-container">
          <el-breadcrumb separator=">" v-if="currentPath">
            <el-breadcrumb-item v-for="(item,index) in currentPath.split('/')"
                                @click.native="breadcrumbClick(index)"
                                :key="index">{{item}}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </div>
    <div class="file-container">
      <file-block ref="fileBlock" v-for="(item, index) in testData" :key="index" :class="getClass(item)"
                  :checked="!!getClass(item)"
                  @mouseup.native.prevent.stop="fileMouseup(item,$event)"
                  @mousedown.native.prevent.stop="fileMousedown(item,$event)"></file-block>
    </div>
  </div>
</template>

<script>
  import FileBlock from './file-block.vue'
  import {mapGetters, mapMutations} from 'vuex'
  import {RIGHT_CODE} from '@/assets/js/const-value.js'

  export default {
    data() {
      return {
        selectFiles: [],
        testData: [
          {
            name: 123
          }, {
            name: 1231
          }, {
            name: 12311
          }, {
            name: 123111
          }, {
            name: 1231111
          }, {
            name: 12311111
          }, {
            name: 123111112
          }, {
            name: 1232
          }, {
            name: 12322
          }, {
            name: 123222
          }, {
            name: 1233333
          }, {
            name: 12333333
          }, {
            name: 123444
          }, {
            name: 1235
          }, {
            name: 1234
          }, {
            name: 1237
          }, {
            name: 1238
          }, {
            name: 1230
          }, {
            name: 12309
          }, {
            name: 123654
          }, {
            name: 1234010
          }
        ]
      }
    },
    computed: {
      /**
       * 判断左侧按钮是否可用
       * @returns {boolean}
       */
      leftDisable() {
        return this.index <= 0
      },
      /**
       * 判断右侧按钮是否可用
       * @returns {boolean}
       */
      rightDisable() {
        return this.path.length === 0 || this.index === this.path.length - 1
      },
      ...mapGetters(['path', 'index', 'currentPath'])
    },
    methods: {
      /**
       * 文件鼠标抬起
       */
      fileMouseup(item, e) {
        if (e.button === RIGHT_CODE) {
          this._showMenu(e)
        }
      },
      /**
       * 文件鼠标落下
       */
      fileMousedown(item, e) {
        // 设置右键不显示
        this.changeMenuShow({isShow: false, left: 0, top: 0})
        // 如果点击的是勾选钮，这执行添加
        if (e.target.className === 'fa fa-check') {
          this.selectFiles.includes(item) || this.selectFiles.push(item)
        } else {
          this.selectFiles.includes(item) || (this.selectFiles = [item])
        }
      },
      /**
       * 获取文件是否被选中的class
       */
      getClass(item) {
        return this.selectFiles.includes(item) ? 'file-select' : ''
      },
      /**
       * 面包屑点击
       * @param index
       */
      breadcrumbClick(index) {
        let newPath = this.currentPath.split('/').slice(0, index + 1).join('/')
        this.pushPath(newPath)
      },
      /**
       * 上一步
       */
      preClick() {
        if (this.index === 0) {
          return
        }
        this.changeIndex(this.index - 1)
      },
      /**
       * 下一步
       */
      nextClick() {
        if (this.index === this.path.length - 1) {
          return
        }
        this.changeIndex(this.index + 1)
      },
      /**
       * 文件面板点击事件
       */
      panelMouseDown(e) {
        if (e.button === RIGHT_CODE) {
          this._showMenu(e)
        } else {
          // 设置右键不显示
          this.changeMenuShow({isShow: false, left: 0, top: 0})
          this.selectFiles = []
        }
      },
      _showMenu(e) {
        let x = e.clientX
        let y = e.clientY
        this.changeMenuShow({isShow: true, left: x, top: y})
      },
      ...mapMutations({pushPath: 'PUSH_PATH', changeIndex: 'CHANGE_INDEX', changeMenuShow: 'CHANGE_RIGHT_MENU_SHOW'})
    },
    components: {
      FileBlock
    }
  }
</script>

<style lang="scss" scoped>
  .right-panel {
    width: auto;
    height: 100%;
    overflow: auto;
    .right-header {
      position: relative;
      height: 49px;
      width: 100%;
      min-width: 600px;
      background: #f8f8f8;
      background: #f8f8f8 url("../../../assets/image/bg.gif") 0px -2px repeat-x;
      border-bottom: 1px solid #ddd;
      .header-left {
        display: inline-block;
        width: 80px;
        height: 100%;
        padding-left: 10px;
        vertical-align: top;
        &:before {
          content: '';
          display: inline-block;
          height: 100%;
          vertical-align: middle;
        }
        .btn-group {
          display: inline-block;
          font-size: 0;
          vertical-align: middle;
        }
      }
      .header-address {
        display: inline-block;
        width: 50%;
        height: 100%;
        vertical-align: top;
        &:before {
          content: '';
          display: inline-block;
          height: 100%;
          vertical-align: middle;
        }
        .btn-home {
          height: 28px;
          margin-right: 2px;
          vertical-align: middle;
          cursor: pointer;
          .font-icon-home {
            display: inline-block;
            background-image: url("../../../assets/image/menu_icon.png");
            width: 16px !important;
            background-position: -16px -496px;
            background-size: auto !important;
            background-repeat: no-repeat;
            height: 16px;
            margin-right: 0px;
          }
        }
        .path-container {
          display: inline-block;
          width: 70%;
          height: 26px;
          overflow: hidden;
          border: 1px solid #ddd;
          margin-left: -1px;
          box-shadow: #e6e6e6 0px 0px 20px inset;
          background: #f8f8f8;
          background: #f8f8f8 url("../../../assets/image/bg.gif") 0px -2px repeat-x;
          vertical-align: middle;
          .el-breadcrumb {
            line-height: 2;
          }
        }
      }
    }
  }

  .btn-default {
    display: inline-block;
    padding: 3px 7px;
    border-color: #ddd;
    background: url("../../../assets/image/buttons_40.png") 0 0px repeat-x;
    border-radius: 0px;
    font-size: 12px;
    box-sizing: border-box;
    border: 1px solid transparent;
    border-color: #ddd;
    text-shadow: 0 1px 0 #fff;
    .font-icon {
      padding: 0 5px;
      font-size: 2rem;
      color: #bbb;
      line-height: 20px;
      vertical-align: baseline;
      font-family: FontAwesome;
      font-style: normal;
    }
  }

  .btn-disable {
    box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.1);
    opacity: 0.5;
    .font-icon {
      opacity: 0.4;
    }
  }

  .file-select {
    transition: transform 0.2s;
    background: #cce8ff !important;
    border-color: #99d1ff !important;
  }
</style>

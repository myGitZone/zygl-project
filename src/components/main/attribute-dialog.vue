<template>
  <div ref="attributeContent" class="attribute-container">
    <div class="header">
      <i class="icon-title" :style="background"></i>
      <span class="title">{{attrbuteInfo.name}}</span>
      <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="closeClick">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </button>
    </div>
    <div class="content">

    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    attrbuteInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      background: ''
    }
  },
  updated() {
    this.initBackgroundImage()
  },
  mounted() {
    this.initBackgroundImage()
  },
  methods: {
    initBackgroundImage() {
      debugger
      if (JSON.stringify(this.attrbuteInfo) === '{}') {
        this.background = `backgroundImage: url("/static/image/file_icon/icon_file/default.png")`
        return
      }
      if (this.attrbuteInfo.isFolder) {
        this.background = 'backgroundImage: url("/static/image/folder_win10.png")'
      } else {
        let ext = this.getExtension(this.attrbuteInfo.name)
        let image = new Image()
        image.onload = () => {
          this.background = `backgroundImage: url("/static/image/file_icon/icon_file/${ext}.png")`
        }
        image.onerror = () => {
          this.background = `backgroundImage: url("/static/image/file_icon/icon_file/default.png")`
        }
        image.src = `/static/image/file_icon/icon_file/${ext}.png`
      }
    },
    /**
    * 获取文件扩展名
    */
    getExtension(name) {
      let arr = name.split('.')
      let ext
      if (arr.length > 1) {
        ext = arr[arr.length - 1]
      }
      return ext
    },
    /**
     * 关闭按钮
     */
    closeClick() {
      this.deleteAttribute(this.attrbuteInfo)
    },
    ...mapMutations({ deleteAttribute: 'DELETE_ATTRIBUTE' })
  }
}
</script>
<style lang="scss">
.upload-content .el-upload-list {
  overflow: auto;
  height: 210px;
}
</style>

<style lang="scss" scoped>
.attribute-container {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -180px;
  margin-top: -200px;
  height: 400px;
  width: 360px;
  box-shadow: 0px 0px 20px rgba(0, 140, 255, 0.46);
  border: 1px solid #71b9f3;
  background: #fff;
  border-radius: 2px;
  z-index: 101;
  .header {
    position: absolute;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    font-size: 16px;
    color: #1f2d3d;
    .icon-title {
      display: inline-block;
      width: 20px;
      background-image: url(/static/image/file_icon/icon_file/docx.png);
      height: 20px;
      vertical-align: middle;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
    }
    .title {
      vertical-align: middle;
    }
  }
  .content {
    position: absolute;
    top: 40px;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
  }
}
</style>
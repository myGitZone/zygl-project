<template>
  <div ref="attributeContent" class="attribute-container" :style="marginStyle">
    <div class="header">
      <i class="icon-title" :style="background"></i>
      <span class="title">{{attrbuteInfo.name}}</span>
      <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="closeClick">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </button>
    </div>
    <div class="content">
      <el-row style="margin-top: 10px">
        <el-col :span="6" style="text-align: right;">位置：</el-col>
        <el-col :span="18" style="padding-left: 12px">{{attrbuteInfo.filePath}}</el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="6" style="text-align: right;">大小：</el-col>
        <el-col :span="18" style="padding-left: 12px">{{getSize(attrbuteInfo.fileSize)}}</el-col>
      </el-row>
      <el-row style="margin-top: 10px" v-if="attrbuteInfo.isFolder">
        <el-col :span="6" style="text-align: right;">包含：</el-col>
        <el-col :span="18" style="padding-left: 12px">{{getContainer(attrbuteInfo)}}</el-col>
      </el-row>
      <div class="line"></div>
      <el-row style="margin-top: 10px">
        <el-col :span="6" style="text-align: right;">创建时间：</el-col>
        <el-col :span="18" style="padding-left: 12px">{{getDate(attrbuteInfo.isFolder?attrbuteInfo.birthtime:attrbuteInfo.aTime)}}</el-col>
      </el-row>
      <el-row style="margin-top: 10px" v-if="!attrbuteInfo.isFolder">
        <el-col :span="6" style="text-align: right;">修改时间：</el-col>
        <el-col :span="18" style="padding-left: 12px">{{getDate(attrbuteInfo.mTime)}}</el-col>
      </el-row>
      <el-row style="margin-top: 10px" v-if="!attrbuteInfo.isFolder">
        <el-col :span="6" style="text-align: right;">最后访问：</el-col>
        <el-col :span="18" style="padding-left: 12px">{{getDate(attrbuteInfo.cTime)}}</el-col>
      </el-row>
      <div class="line" v-if="!attrbuteInfo.isFolder"></div>
      <div class="btn-container">
        <el-button type="primary" size="small" @click="closeClick">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { format } from '@/assets/js/util'
export default {
  props: {
    attrbuteInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      background: '',
      marginStyle: {
        marginTop: 0,
        marginLeft: 0
      }
    }
  },
  updated() {
    this.initBackgroundImage()
  },
  mounted() {
    this.initBackgroundImage()
  },
  methods: {
    /**
     * 获取图标
     */
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
      this.marginStyle.marginTop = `-${200 - 15 * this.index}px`
      this.marginStyle.marginLeft = `-${180 - 15 * this.index}px`
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
    /**
     * 格式化大小
     */
    getSize(size) {
      let unit = 'B'
      let mSize = size
      debugger
      if (size > 512) {
        unit = 'K'
        mSize = (size / 1024).toFixed(2)
      }
      if (mSize > 512) {
        unit = 'M'
        mSize = (size / (1024 * 1024)).toFixed(2)
      }
      if (mSize > 512) {
        unit = 'G'
        mSize = (size / (1024 * 1024 * 1024)).toFixed(2)
      }
      return `${mSize}${unit}(${size} Byte)`
    },
    /**
     * 获取日期格式
     */
    getDate(date) {
      return format(new Date(date), 'yyyy/MM/dd hh:mm:ss')
    },
    /**
     * 获取包含的文件和文件夹个数
     */
    getContainer(info) {
      return `${info.fileCount} 文件,${info.folderCount} 文件夹`
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
    color: #666;
    box-sizing: border-box;
    padding: 10px;
    .line {
      width: 95%;
      margin: 8px auto 8px auto;
      height: 0px;
      border-bottom: 1px solid #eee;
      box-sizing: content-box;
    }
    .btn-container {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }
}
</style>
/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="file-block" :title="fileInfo.name||fileInfo">
    <div class="item-select" :class="{'item-check':checked}">
      <i class="fa fa-check" aria-hidden="true"></i>
    </div>
    <div class="file-icon-content">
      <i class="file-icon" :style="background"></i>
    </div>
    <div class="file-name">{{fileInfo.name||fileInfo}}</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    currentPath: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    },
    fileInfo: {
    }
  },
  data() {
    return {
      background: ''
    }
  },
  computed: {
    isFolder() {
      return this.fileInfo.file
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
      if (this.isFolder) {
        this.background = 'backgroundImage: url("/static/image/folder_win10.png")'
      } else {
        let ext = this.getExtension(this.fileInfo)
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
    ...mapMutations({ pushPath: 'PUSH_PATH' })
  }
}
</script>

<style lang="scss" scoped>
.file-block {
  display: inline-block;
  height: auto; // max-height: 152px;
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
    padding: 0 5px;
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
    }
  }
  .file-name {
    width: 80px;
    font-size: 1.6rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis; // white-space: nowrap;
    word-break: break-all;
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

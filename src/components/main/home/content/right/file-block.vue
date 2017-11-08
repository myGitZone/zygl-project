/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="file-block" :title="fileInfo.name||fileInfo" @dblclick="dblclick">
    <div class="item-select" :class="{'item-check':checked}">
      <i class="fa fa-check" aria-hidden="true"></i>
    </div>
    <div class="file-icon-content" :class="imageSizeClass">
      <i class="file-icon" :style="background"></i>
    </div>
    <div class="file-name" :class="fileNameSizeClass">{{fileInfo.name||fileInfo}}</div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { LARGE, SMALL } from '@/assets/js/const-value'
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
    },
    imageSizeClass() {
      let className = 'file-icon-content-normal'
      if (this.fileBlockSize === LARGE) {
        className = 'file-icon-content-large'
      } else if (this.fileBlockSize === SMALL) {
        className = 'file-icon-content-small'
      }
      return className
    },
    fileNameSizeClass() {
      let className = 'file-name-normal'
      if (this.fileBlockSize === LARGE) {
        className = 'file-name-large'
      } else if (this.fileBlockSize === SMALL) {
        className = 'file-name-small'
      }
      return className
    },
    ...mapGetters(['fileBlockSize', 'currentPath'])
  },
  updated() {
    this.initBackgroundImage()
  },
  mounted() {
    this.initBackgroundImage()
  },
  methods: {
    dblclick() {
      if (this.isFolder) {
        this.pushPath(this.currentPath + '/' + this.fileInfo.name)
      }
    },
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
  .file-icon-content-small {
    height: 35px;
    width: 35px;
  }
  .file-icon-content-large {
    height: 100px;
    width: 100px;
  }
  .file-icon-content-normal {
    height: 70px;
    width: 70px;
  }
  .file-name {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; //text-overflow: ellipsis; //
    word-break: break-all;
  }
  .file-name-normal {
    width: 80px;
    font-size: 1.6rem;
  }
  .file-name-large {
    width: 110px;
    font-size: 1.6rem;
  }
  .file-name-small {
    width: 40px;
    font-size: 1rem;
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

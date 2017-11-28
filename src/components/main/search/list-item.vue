<template>
  <div class="list-item-container">
    <div class="result-icon">
      <i class="file-icon" :style="background"></i>
    </div>
    <div class="result-name">{{name}}</div>
    <div class="open-path" @click="openFolder">
      <i class="fa fa-folder-open-o" aria-hidden="true"></i>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    fileInfo: {

    }
  },
  data() {
    return {
      background: null
    }
  },
  computed: {
    name() {
      return typeof this.fileInfo.value === 'string' ? this.fileInfo.value : this.fileInfo.value.name
    },
    isFolder() {
      return this.fileInfo.value.file
    }
  },
  updated() {
    this.initBackgroundImage()
  },
  mounted() {
    this.initBackgroundImage()
  },
  methods: {
    openFolder() {
      // let path = this.fileInfo.folder.name
      // while (this.fileInfo.folder) {
      let name = this.isFolder ? this.fileInfo.value.name : this.fileInfo.value
      this.changePathAndSelectFile({
        path: this.fileInfo.path,
        files: [{
          isFolder: this.isFolder,
          name: name
        }]
      })
      // }
    },
    initBackgroundImage() {
      if (this.isFolder) {
        this.background = 'backgroundImage: url("/static/image/folder_win10.png")'
      } else {
        let ext = this.getExtension(this.fileInfo.value)
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
    ...mapActions(['changePathAndSelectFile'])
  }
}
</script>

<style lang="scss" scoped>
.list-item-container {
  font-size: 0;
  &:hover {
    background: #eee;
    .open-path {
      background: #ddd;
    }
  }
  .result-icon {
    display: inline-block;
    height: 30px;
    width: 30px;
    font-size: 12px;
    padding-right: 10px;
    vertical-align: middle;
    padding: 5px;
    box-sizing: border-box;
    .file-icon {
      display: inline-block;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      pointer-events: none;
    }
  }
  .result-name {
    display: inline-block;
    font-size: 12px;
    vertical-align: middle;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .open-path {
    display: inline-block;
    font-size: 12px;
    vertical-align: middle;
    position: absolute;
    right: 0;
    width: 40px;
    text-align: center;
    &:hover {
      background: #fbbc00;
      i {
        color: white;
      }
    }
  }
}
</style>

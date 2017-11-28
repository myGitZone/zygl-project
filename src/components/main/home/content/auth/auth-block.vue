<template>
  <div class="auth-block" :title="authInfo.nickname" @click.stop="blockClick" :class="{'auth-select':checked}">
    <div class="item-select" :class="{'item-check':checked}" @click.stop="deleteClick">
      <i class="fa fa-times" aria-hidden="true"></i>
    </div>
    <div class="file-icon-content">
      <i class="user-icon" aria-hidden="true"></i>
    </div>
    <div class="file-name">{{getValue()}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    authInfo: {
      type: Object,
      default() {
        return {
          name: ''
        }
      }
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['orgDatas'])
  },
  methods: {
    blockClick() {
      this.$emit('itemClick', this.authInfo)
    },
    deleteClick() {
      this.$emit('deleteClick', this.authInfo)
    },
    getValue() {
      return this.authInfo.orgid ? `${this.authInfo.nickname}(${this.orgDatas[this.authInfo.orgid].orgname})` : `${this.authInfo.nickname}`
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-block {
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
      background: #3b8cff !important;
      cursor: pointer;
    }
  }
  .file-icon-content {
    padding: 0 5px;
    height: 70px;
    width: 70px;
    .user-icon {
      display: inline-block;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-image: url('/static/image/file_icon/icon_others/user.png');
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
    width: 20px;
    height: 20px;
    margin-left: 60px;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    font-size: 14px;
  }
  .item-check {
    background: #3b8cff !important;
  }
}

.auth-select {
  transition: transform 0.2s;
  background: #cce8ff !important;
  border-color: #99d1ff !important;
}
</style>

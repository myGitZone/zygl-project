/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="split-pane" :class="{ 'is-dragging': dragging}" @mousemove="dragMove" @mouseup="dragEnd"
       @mouseleave="dragEnd">
    <div ref="left" class="split-pane-item" :style="{ width: splitLeft+'px' }">
      <slot name="left"></slot>
    </div>
    <div class="split-pane-gutter" :class="{'split-pane-gutter-active': dragging}" :style="{left: gutterLeft+'px'}"
         @mousedown="dragStart"></div>
    <div class="split-pane-item right-panel-position" :style="{left: splitRight+'px'}">
      <slot ref="right" name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      leftWidth: {
        type: Number
      },
      leftMaxWidth: {
        type: Number
      }
    },
    data() {
      return {
        // 记录左侧panel的宽度
        splitLeft: 0,
        // 是否可拖动，用来记录状态，来修改鼠标的样式
        dragging: false

      }
    },
    computed: {
      // 记录右侧panel的宽度
      splitRight() {
        return this.splitLeft
      },
      // 分割拖动条的位置
      gutterLeft() {
        return this.splitLeft - 5
      }
    },
    mounted() {
      this.splitLeft = this.leftWidth
    },
    methods: {
      /**
       * 鼠标按下时，拖动事件触发
       * @param e
       */
      dragStart(e) {
        this.dragging = true
        this.startX = e.pageX
      },
      /**
       * 鼠标移动事件
       * @param e
       */
      dragMove(e) {
        if (this.dragging) {
          const dx = e.pageX - this.startX
          this.splitLeft = this.splitLeft + dx
          this.startX = this.splitLeft
          if (this.splitLeft > this.leftMaxWidth && dx > 0) {
            this.dragging = false
          }
        }
      },
      /**
       * 结束移动
       * @param e
       */
      dragEnd(e) {
        this.dragging = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .split-pane {
    position: absolute;
    width: 100%;
    top: 40px;
    bottom: 32px;
    user-select: none;
    box-sizing: border-box;
    font-size: 0;
    cursor: default;
    .split-pane-item,
    .split-pane-gutter {
      display: inline-block;
      height: 100%;
    }
    .right-panel-position {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      border-left: 1px solid #eee;
    }
    .split-pane-gutter {
      position: absolute;
      z-index: 100;
      top: 0;
      bottom: 0;
      width: 10px;
      overflow: hidden;
      background: url(../assets/image/resize.png) 0px 50% no-repeat;
      cursor: col-resize;
    }
    .split-pane-gutter-active {
      background: #000;
      opacity: 0.2;
    }
  }

  .is-dragging {
    cursor: col-resize;
  }
</style>

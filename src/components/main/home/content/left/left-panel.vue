/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="left-panel">
    <el-tree :data="treeData" :expand-on-click-node="false" highlight-current :props="defaultProps" :render-content="renderContent" :current-node-key="selectId" node-key="id" :default-expanded-keys="expandedKeys" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
import TreeItem from './tree-item'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      defaultProps: {
        children: 'folder',
        label: 'name'
      }
    }
  },
  computed: {
    ...mapGetters(['treeData', 'selectId', 'expandedKeys'])
  },
  methods: {
    /**
     * 自定义树组件的节点
     */
    renderContent(h, { node, data, store }) {
      return h(TreeItem, {
        props: {
          info: node,
          id: node.data.id
        }
      })
    },
    /**
     * 树节点点击事件
     * @param obj
     * @param node
     */
    handleNodeClick(obj, node) {
      if (node.data.id && node.data.id === 1) {
        return
      }
      let path = node.data.name
      while (node.parent && node.parent.data.id !== 1) {
        path = node.parent.data.name + '/' + path
        node = node.parent
      }
      this.pushPath(path)
    },
    ...mapMutations({ pushPath: 'PUSH_PATH' })
  },
  components: {
    TreeItem
  }
}
</script>

<style lang="scss" scoped>
.left-panel {
  height: 100%;
  left: 100%;
  padding-left: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  .el-tree {
    border: none;
  }
}
</style>

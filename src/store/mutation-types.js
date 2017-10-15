// 定义mutations的名称，为了统一管理，不至于使用是出现单词拼写错误，重复等问题
// 设置路径，用来存历史路径，是一个数组
export const PUSH_PATH = 'PUSH_PATH'
// 记录当前所在path目录中个的索引,切换目录的时候
export const CHANGE_INDEX = 'CHANGE_INDEX'
// 重置path
export const SET_NEW_PATH = 'SET_NEW_PATH'
// 改变右键的位置
export const CHANGE_RIGHT_MENU_SHOW = 'CHANGE_RIGHT_MENU_SHOW'
// 设置文件夹的树
export const SET_TREE_DATA = 'SET_TREE_DATA'
// 设置组织机构
export const SET_ORG_DATAS = 'SET_ORG_DATAS'
// 更新文件目录树
export const UPDATE_TREE = 'UPDATE_TREE'
// 更新用户名
export const SET_USERNAME = 'SET_USERNAME'
// 设置用户选择的文件数组
export const SET_SELECT_FILES = 'SET_SELECT_FILES'
// // 设置右侧目录树
// export const SET_LEFT_SELECT = 'SET_LEFT_SELECT'
// 删除树上目录节点
export const DELETE_TREE_NODE = 'DELETE_TREE_NODE'
// 删除文件
export const DELETE_FILE = 'DELETE_FILE'
// 是否显示上传框
export const SET_UPLOAD_STATE = 'SET_UPLOAD_STATE'
// 设置左侧树选择的节点id
export const SET_SELECT_ID = 'SET_SELECT_ID'

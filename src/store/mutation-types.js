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

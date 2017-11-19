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
export const SET_USERINFO = 'SET_USERINFO'
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
// 更新左侧文件夹树，用于新建文件夹
export const ADD_FOLDER_NODE = 'ADD_FOLDER_NODE'
// 文件夹重命名
export const UPDATE_FOLDER_NAME = 'UPDATE_FOLDER_NAME'
// 添加右键属性，获取到的属性到数组
export const PUSH_ATTRIBUTE = 'PUSH_ATTRIBUTE'
// 删除右键获取的属性
export const DELETE_ATTRIBUTE = 'DELETE_ATTRIBUTE'
// 设置授权界面的显隐
export const CHANGE_AUTH_SHOW = 'CHANGE_AUTH_SHOW'
// 刷新目录树
export const REFRESH_TREE_DATA = 'REFRESH_TREE_DATA'
// 图标大小改变
export const CHANGE_LABEL_SIZE = 'CHANGE_LABEL_SIZE'
// 添加目录展开节点额id，为了新建文件夹的时候，默认自动展开
export const PUSH_EXPAND_KEY = 'PUSH_EXPAND_KEY'
// 修改排序方式
export const CHANGE_SORT_TYPE = 'CHANGE_SORT_TYPE'
// 改变查询窗口是不是显示
export const CHANGE_SEARCH_DIALOG_SHOW = 'CHANGE_SEARCH_DIALOG_SHOW'

// 使用方式，多个mutations一起提交的时候，进行一次action，例如
/* 使用方式
export const actionName = function({ commit, state }, params) {

}
*/
// 等使用到的时候，下面的注释打开
import * as types from './mutation-types'
export function changePathAndSelectFile({ commit, state }, { path, files }) {
  commit(types.PUSH_PATH, path)
  setTimeout(() => {
    commit(types.SET_SELECT_FILES, files)
  }, 20)
}

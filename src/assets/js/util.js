export function isEmptyObject(e) {
  for (let t in e) {
    return !1
  }
  return !0
}

export function getFoldersAndFiles(path, root) {
  debugger
  let folderInfo = getFolderInfo(path, root)
  return folderInfo ? [...folderInfo.folder, ...folderInfo.file] : []
  // return folderInfo && folderInfo.file ? [...folderInfo.file] : []
}

export function getFolderInfo(path, root) {
  let folderInfo = root
  if (path && path !== '') {
    // 将路径分割
    let pathArr = path.split('/')
    if (root.name === pathArr[0]) {
      folderInfo = root
    }
    for (let i = 0, len = pathArr.length; i < len; i++) {
      let name = pathArr[i]
      folderInfo = getItem(name, root)
      if (folderInfo) {
        root = folderInfo
      } else {
        break
      }
    }
  }
  return folderInfo
}

export function downloadFiles(urls) {
  urls.forEach((url) => {
    let elFrame = document.createElement('iframe')
    elFrame.style.display = 'none'
    elFrame.src = encodeURI(url)
    document.body.appendChild(elFrame)
  })
}

export function generateUUID() {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

/**
 * 日期格式化函数
 * @param date Date类型的日期对象
 * @param fmt  所要转换的格式。例如"yyyy-MM-dd HH:mm:ss"，"yyyy-MM-dd"
 * @returns {*} 返回转换后的日期格式字符串
 */
export function format(date, fmt) {
  var o = {
    'M+': date.getMonth() + 1,                 // 月份
    'd+': date.getDate(),                    // 日
    'h+': date.getHours(),                   // 小时
    'm+': date.getMinutes(),                 // 分
    's+': date.getSeconds(),                 // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds()             // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export function axiosBeforeEach(response, vm) {
  if (!response.data.status && response.data.data === 'login') {
    vm.$router.push('/login')
  }
}

function getItem(name, data) {
  let folders = data.folder
  let folder
  for (let i = 0, len = folders.length; i < len; i++) {
    let item = folders[i]
    if (item.name === name) {
      folder = item
      break
    }
  }
  return folder
}

export function isEmptyObject(e) {
  for (let t in e) {
    return !1
  }
  return !0
}
export function getFoldersAndFiles(path, root) {
  let folderInfo = getFolderInfo(path, root)
  // return folderInfo ? [...folderInfo.folder, ...folderInfo.file] : []
  return folderInfo && folderInfo.file ? [...folderInfo.file] : []
}
export function getFolderInfo(path, root) {
  let folderInfo = root
  if (path) {
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

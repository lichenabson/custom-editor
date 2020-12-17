import '../assets/css/editor.scss'
import Menu from '../menu/menu'
import Selection from './selection'

interface ConfigType {
  el: HTMLElement | null
  menu?: Array<string>
}

class Editor {
  public menu: Menu
  public selection: Selection

  constructor(config: ConfigType) {
    const { el, menu } = config
    if (!(el instanceof HTMLElement)) {
      throw new Error('el 必须为 HTMLElement')
    }
    // 初始化菜单区域
    this.menu = this.initMenu(el, menu ?? [])
    // 初始化editor区域
    const editorElement = this.initEditor(el)
    // 初始化Selection
    this.selection = new Selection(this, editorElement)
  }
  initEditor(el: HTMLElement): HTMLElement {
    // 生成对应的 contentable 的div
    const editorElement: HTMLDivElement = document.createElement('div')
    editorElement.setAttribute('contenteditable', 'true')
    editorElement.setAttribute('placeholder', '请输入内容')
    editorElement.className = 'custom-editor-container'
    el.appendChild(editorElement)
    return editorElement
  }
  // init 菜单
  initMenu(el: HTMLElement, menu: Array<string>): Menu {
    // 初始化菜单dom
    const menuElement: HTMLDivElement = document.createElement('div')
    menuElement.className = 'custom-menu-container'
    el.appendChild(menuElement)
    return new Menu(menuElement, menu, this)
  }
}

export default Editor

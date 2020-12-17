import Editor from '../core/editor'

/* eslint-disable no-case-declarations */
class Menu {
  public editor: Editor
  public menuElement: HTMLElement
  public menuList: Array<any> = []
  constructor(menuElement: HTMLElement, menuConfig: Array<string>, editor: Editor) {
    this.menuElement = menuElement
    this.initMenu(menuConfig)
    this.editor = editor
  }
  async initMenu(menuConfig: Array<string>) {
    for (const iterator of menuConfig) {
      switch (iterator) {
        case 'bold':
          const { default: menu } = await import('./bold')
          this.initMenuElement(new menu(this.editor))
          break
        case 'heading':
          const { default: heading } = await import('./heading')
          this.initMenuElement(new heading(this.editor))
          break
        case 'color':
          const { default: color } = await import('./color')
          this.initMenuElement(new color(this.editor))
          break
        default:
          break
      }
    }
  }
  // 初始化dom
  public initMenuElement(menu: any) {
    this.menuList.push(menu)
    const { el } = menu
    this.menuElement.appendChild(el)
  }

  // 高亮
  public changeActive() {
    for (const iterator of this.menuList) {
      iterator.changeActive && iterator.changeActive()
    }
  }
}

export default Menu

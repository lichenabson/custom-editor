import Editor from '../core/editor'

class Bold {
  private name: string = '加粗'
  public el: HTMLElement
  public editor: Editor
  private isActice: boolean = false

  constructor(editor: Editor) {
    const dom = document.createElement('div')
    dom.className = 'bold menu-item'
    dom.innerText = this.name
    dom.addEventListener('click', () => {
      this.clickHandle()
    })
    this.el = dom
    this.editor = editor
  }

  clickHandle() {
    // 恢复选区
    this.editor.selection.restoreSelection()
    document.execCommand('bold', false)
    // 高亮
    this.changeActive()
  }

  changeActive() {
    const status: boolean = document.queryCommandState('bold')
    this.isActice = status
    this.isActice ? this.el.classList.add('active') : this.el.classList.remove('active')
  }
}

export default Bold

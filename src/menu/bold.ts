import Editor from '../core/editor'

class Bold {
  private name: string = '加粗'
  public el: HTMLElement
  public editor: Editor
  private isActice: boolean = false

  constructor(editor: Editor) {
    const clickHandle = () => {
      console.log('点击加粗')
      // 恢复选区
      this.editor.selection.restoreSelection()
      document.execCommand('bold', false)
      // 高亮
      this.changeActive()
    }
    const dom = document.createElement('div')
    dom.className = 'bold menu-item'
    dom.innerText = this.name
    dom.addEventListener('click', clickHandle)
    this.el = dom
    this.editor = editor
  }

  changeActive() {
    const status: boolean = document.queryCommandState('bold')
    this.isActice = status
    this.isActice ? this.el.classList.add('active') : this.el.classList.remove('active')
  }
}

export default Bold

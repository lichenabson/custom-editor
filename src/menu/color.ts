import Editor from '../core/editor'

class Color {
  private name: string = '颜色'
  public el: HTMLElement
  public editor: Editor

  constructor(editor: Editor) {
    this.el = this.initElement()
    this.editor = editor
  }

  initElement() {
    const parentElement = document.createElement('div')
    parentElement.className = 'heading menu-item'
    const textElement = document.createElement('span')
    textElement.innerText = this.name
    const ulElement = document.createElement('ul')
    ulElement.className = 'hide'
    ulElement.innerHTML = `
    <li data-type="#333333">默认</li>
    <li data-type="red">red</li>
    <li data-type="green">green</li>
    `
    parentElement.appendChild(textElement)
    parentElement.appendChild(ulElement)
    parentElement.addEventListener('mouseenter', () => {
      ulElement.classList.remove('hide')
      ulElement.classList.add('show')
    })
    parentElement.addEventListener('mouseleave', () => {
      ulElement.classList.remove('show')
      ulElement.classList.add('hide')
    })
    ulElement.addEventListener('click', (event: Event) => {
      this.clickHandle(event.target)
    })
    return parentElement
  }

  clickHandle(target: any) {
    if (!target) return
    const { type } = target.dataset
    // 恢复选区
    this.editor.selection.restoreSelection()
    document.execCommand('foreColor', false, type)
    // 高亮
    this.changeActive()
    const ulElement = this.el.querySelector('ul')
    if (ulElement) {
      ulElement.classList.remove('show')
      ulElement.classList.add('hide')
    }
  }

  changeActive() {}
}

export default Color

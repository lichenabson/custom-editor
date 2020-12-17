import Editor from '../core/editor'

class Heading {
  private name: string = '标题'
  public el: HTMLElement
  public editor: Editor
  private isActice: boolean = false

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
    <li data-type="H1">H1</li>
    <li data-type="H2">H2</li>
    <li data-type="H3">H3</li>
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
    document.execCommand('formatBlock', false, type)
    // 高亮
    this.changeActive()
    const ulElement = this.el.querySelector('ul')
    if (ulElement) {
      ulElement.classList.remove('show')
      ulElement.classList.add('hide')
    }
  }

  changeActive() {
    const status: boolean = /^h/i.test(document.queryCommandValue('formatBlock'))
    this.isActice = status
    this.isActice ? this.el.classList.add('active') : this.el.classList.remove('active')
  }
}

export default Heading

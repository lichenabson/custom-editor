import Editor from '../core/editor'

class Selection {
  public savedRange: Range | undefined | null
  public editorElement: HTMLElement
  public editor: Editor

  constructor(editor: Editor, editorElement: HTMLElement) {
    editorElement.addEventListener('mouseup', () => {
      this.saveRange()
    })
    editorElement.addEventListener('keyup', () => {
      this.saveRange()
    })
    this.editorElement = editorElement
    this.editor = editor
  }

  saveRange() {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return
    const range = selection.getRangeAt(0)
    this.savedRange = range
    this.editor.menu.changeActive()
  }

  restoreSelection() {
    const selection = window.getSelection()
    if (selection && this.savedRange) {
      selection.removeAllRanges()
      selection.addRange(this.savedRange)
    }
  }
}

export default Selection

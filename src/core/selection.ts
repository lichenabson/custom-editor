import Editor from '../core/editor'

class Selection {
  public savedRange: Range | undefined | null
  public editorElement: HTMLElement
  public editor: Editor

  constructor(editor: Editor, editorElement: HTMLElement) {
    const saveRange = () => {
      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) return
      const range = selection.getRangeAt(0)
      this.savedRange = range
      this.editor.menu.changeActive()
    }
    editorElement.addEventListener('mouseup', saveRange)
    editorElement.addEventListener('keyup', saveRange)
    this.editorElement = editorElement
    this.editor = editor
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

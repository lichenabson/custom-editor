import Editor from './core/editor'

function init() {
  const editor = new Editor({
    el: document.querySelector('#editor'),
    menu: ['bold', 'heading', 'color'],
  })

  console.log('editor', editor)
}

init()

if (module.hot) {
  module.hot.accept('./core/editor', () => {
    const dom: HTMLElement | null = document.querySelector('#editor')
    dom && (dom.innerHTML = '')
    init()
  })
}

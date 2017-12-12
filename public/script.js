;(()=>{

  const buttons = [].slice.call(document.getElementsByClassName('toggle'))
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      const { parentElement } = e.target
      if (parentElement.classList.contains('open')){
        parentElement.classList.add('closed')
        parentElement.classList.remove('open')
      } else{
        parentElement.classList.remove('closed')
        parentElement.classList.add('open')
      }
    })
  })

})()
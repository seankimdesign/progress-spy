;(()=>{

  let openedState = {}

  document.addEventListener('click', e => {
    if (e.target.className === 'toggle') {
      const { classList } = e.target.parentElement
      const { dataset } = e.target.parentElement
      if (classList.contains('open')){
        openedState[dataset.accountId][dataset.filename] = false
        classList.add('closed')
        classList.remove('open')
      } else {
        openedState[dataset.accountId] = openedState[dataset.accountId] || {}
        openedState[dataset.accountId][dataset.filename] = true
        classList.remove('closed')
        classList.add('open')
      }
    }
  })

  fetch('/api/trainees').then((res) => res.json()).then((data) => {
    const pageElement = document.getElementsByClassName('page')[0]
    pageElement.innerHTML = data.trainees.reduce((acc, trainee) => acc + buildTraineeBlock(trainee), '')
  })

  const socket = io()
  socket.on('update', (trainee) => {
    if (document.getElementById(trainee.id)) {
      document.getElementById(trainee.id).outerHTML = buildTraineeBlock(trainee.testResult)
    } else {
      const e = document.createElement('div')
      e.innerHTML = buildTraineeBlock(trainee.testResult, true)
      document.getElementsByClassName('page')[0].appendChild(e.firstElementChild)
      setTimeout(()=>{
        const justLoaded = document.getElementsByClassName('transparent')
        ;[].slice.call(justLoaded).forEach((elem)=> {
          elem.classList.remove('transparent')
        })
      }, 0)
    }
  })

  const createTestBlocks = type => num => `<div class="block ${type}"></div>`.repeat(num)

  const createFailureBlock = (failures, id) => failures.reduce((acc, failure) => {
    const openClosedState = openedState[id] && openedState[id][failure.fileName] ? 'open' : 'closed'
    return acc + `
    <div class="single-failure ${openClosedState}" data-filename="${failure.fileName}" data-account-id="${id}">
      <button class="toggle">TOGGLE</button>
      <div class="badge">${failure.details.length}</div>
      <p class="filename">${failure.fileName}</p>
      <p class="small longFileName">${failure.longFileName}</p>
      <ol class="failure-details">
        ${failure.details.reduce((acc, detail) => acc + `
          <li class="detail">
            <p class="title">${detail.title}</p>
            <pre class="detail-message">${detail.messages}</pre>
          </li>
        `, '')}
      </ol>
    </div>
  `
  }, '')

  const buildTraineeBlock = (trainee, shouldAnimate) => {
    const animationClass = shouldAnimate ? 'transparent' : ''
    return `
      <div class="single-trainee ${animationClass}" id="${trainee.id}">
        <h3 class="name">${trainee.name}</h3>
        <h5 class="subname">${trainee.subname}</h5>
        <p class="small">${trainee.lastRan}</p>
        <div class="block-container">${createTestBlocks('success-block')(trainee.numPassedTestSuites)}</div>
        <div class="block-container">${createTestBlocks('failure-block')(trainee.numFailedTestSuites)}</div>
        ${trainee.failureDetails.length ? `<div class="fail-container">${createFailureBlock(trainee.failureDetails, trainee.id)}</div>` : ''}
      </div>
    `
  }

})()
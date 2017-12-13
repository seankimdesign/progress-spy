// Vanilla JS
const createTestBlocks = type => num => `<div class="block ${type}"></div>`.repeat(num)

const createFailureBlock = failures => failures.reduce((acc, failure) => {
  return acc + `
    <div class="single-failure closed">
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

const buildTraineeBlock = trainee => `
  <div class="single-trainee">
    <h3 class="name">${trainee.name}</h3>
    <h5 class="subname">${trainee.subname}</h5>
    <p class="hidden">${trainee.id}</p>
    <p class="small">${trainee.lastRan}</p>
    <div class="block-container">${createTestBlocks('success-block')(trainee.numPassedTestSuites)}</div>
    <div class="block-container">${createTestBlocks('failure-block')(trainee.numFailedTestSuites)}</div>
    ${trainee.failureDetails.length ? `<div class="fail-container">${createFailureBlock(trainee.failureDetails)}</div>` : ''}
  </div>
`

;(()=>{

  document.addEventListener('click', e => {
    if (e.target.className === 'toggle') {
      const { classList } = e.target.parentElement
      if (classList.contains('open')){
        classList.add('closed')
        classList.remove('open')
      } else {
        classList.remove('closed')
        classList.add('open')
      }
    }
  })

  // initial fetch
  fetch('/api/trainees').then((res) => res.json()).then((data) => {
    document.getElementsByClassName('page')[0].innerHTML = data.trainees.reduce((acc, trainee) => acc + buildTraineeBlock(trainee), '')
  })

  // watch for changes
  const socket = io()
  socket.on('update', (trainees) => {
    // check for upddates
  })

})()
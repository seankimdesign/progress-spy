const PORT = 3000

const socketMessages = [
  'CONNECTION_STARTED',
  'USER_UPDATED',
  'USER_REMOVED'
].reduce((acc, msg) => Object.assign({}, acc, { [msg]: msg }), {})

module.exports = {
  PORT,
  socketMessages,
  uri: `http://localhost:${PORT}` 
}

const PORT = 3000

// Events emitted from the client
const clientMessages = [
  'DELETE_USER'
].reduce((acc, msg) => Object.assign({}, acc, { [msg]: msg }), {})

// Events emitted from the server
const socketMessages = [
  'CONNECTION_STARTED',
  'USER_UPDATED',
  'USER_REMOVE_SUCCESS',
  'USER_REMOVE_FAILURE'
].reduce((acc, msg) => Object.assign({}, acc, { [msg]: msg }), {})

module.exports = {
  PORT,
  socketMessages,
  clientMessages,
  uri: `http://localhost:${PORT}` 
}

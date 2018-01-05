import { clientMessages } from '../../../common/config'
export const RESET_MESSAGE = 'RESET_MESSAGE'

export const resetMessage = () => ({
  type: RESET_MESSAGE
})

export const deleteUser = (id) => ({
  type: clientMessages.DELETE_USER,
  payload: id
})

import { clientMessages } from '../../../common/config'

export const deleteUser = (id) => ({
  type: clientMessages.DELETE_USER,
  payload: id
})

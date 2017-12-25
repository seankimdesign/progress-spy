export const FETCH_TRAINEES = 'FETCH_TRAINEES'
export const FETCH_TRAINEES_SUCCESS = 'FETCH_TRAINEES_SUCCESS'
export const FETCH_TRAINEES_FAILURE = 'FETCH_TRAINEES_FAILURE'
export const UPDATE_TRAINEE = 'UPDATE_TRAINEE'

export const fetchTrainees = () => {
  return {
    type: FETCH_TRAINEES
  }
}

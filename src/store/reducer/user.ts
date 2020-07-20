import produce from 'immer';

export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS' as const;

export interface ActionType {
  type: string;
  payload: string;
  data?: string;
}

export function addUser(payload: String){
  return {
    type: ADD_USER_SUCCESS,
    payload: payload
  }
}

const initialState = {
  userList: [],
  status: 'PENDING'
}

export function userReducer(state = initialState, action: ActionType){
  switch(action.type){
    case ADD_USER_SUCCESS:
      return produce(state, draft => {
        draft.userList.push(action.payload as never)
        draft.status = 'SUCCESS'
      })
    default:
      return state
  }
}

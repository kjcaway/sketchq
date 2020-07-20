export const CONNECT_SUCCESS = 'CONNECT_SUCCESS' as const;

export interface ActionType {
  type: string;
  payload: string;
  data?: string;
}

export function connectSuccess(){
  return {
    type: CONNECT_SUCCESS,
  }
}

const initialState = {
  status: 'PENDING'
}

export function websocketReducer(state = initialState, action: ActionType){
  switch(action.type){
    case CONNECT_SUCCESS:
      return {
        ...state,
        status: 'SUCCESS'
      }
    default:
      return state
  }
}

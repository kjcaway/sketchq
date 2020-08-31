export const REQ_START_GAME = 'REQ_START_GAME' as const; 
export const REQ_START_GAME_SUCCESS = 'REQ_START_GAME_SUCCESS' as const; 

export interface ActionType {
  type: string;
  payload: any;
}

export function reqStartGame(payload: any){
  return {
    type: REQ_START_GAME,
    payload: payload
  }
}

export function reqStartGameSuccess(payload: any){
  return {
    type: REQ_START_GAME_SUCCESS,
    payload: payload
  }
}

const initialState = {
  status: 'INIT',
}

export function gameReducer(state = initialState, action: ActionType){
  switch(action.type){
    case REQ_START_GAME:
      return {
        ...state,
        status: 'PENDING',
      }
    case REQ_START_GAME_SUCCESS:
      return {
        ...state,
        status: 'RUNNING',
      }
    default:
      return state
  }
}


export const REQ_START_GAME = 'REQ_START_GAME' as const; 
export const REQ_START_GAME_SUCCESS = 'REQ_START_GAME_SUCCESS' as const; 

export const START_GAME = 'START_GAME' as const; 
export const READY = 'READY' as const; 

export const REQ_CHANGE_CREATOR = 'REQ_CHANGE_CREATOR' as const; 
export const REQ_CHANGE_CREATOR_SUCCESS = 'REQ_CHANGE_CREATOR_SUCCESS' as const; 

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

export function startGame(){
  return {
    type: START_GAME
  }
}

export function ready(){
  return {
    type: READY
  }
}


export function reqChangeCreator(payload: any){
  return {
    type: REQ_CHANGE_CREATOR,
    payload: payload
  }
}

export function reqChangeCreatorSuccess(payload: any){
  return {
    type: REQ_CHANGE_CREATOR_SUCCESS,
    payload: payload
  }
}



const initialState = {
  status: 'INIT',
  word: undefined
}

export function gameReducer(state = initialState, action: ActionType){
  switch(action.type){
    case REQ_START_GAME:
      return {
        ...state,
        status: 'REQUEST'
      }
    case REQ_START_GAME_SUCCESS:
      return {
        ...state,
        status: 'RUNNING',
        word: action.payload
      }
    case START_GAME:
      return {
        ...state,
        status: 'RUNNING'
      }
    case READY:
      return {
        ...state,
        status: 'PENDING',
        word: undefined
      }
    case REQ_CHANGE_CREATOR:
      return {
        ...state,
      }
    case REQ_CHANGE_CREATOR_SUCCESS:
      return {
        ...state,
      }
    default:
      return state
  }
}


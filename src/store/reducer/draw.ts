export const DRAW = 'DRAW' as const; 
export const CLEAR = 'CLEAR' as const; 
export const INIT = 'INIT' as const; 

export interface ActionType {
  type: string;
  payload: Drawing;
}

export interface Drawing {
  originP: Array<number>;
  newP: Array<number>;
}

export function draw(payload: Drawing){
  return {
    type: DRAW,
    payload: payload
  }
}

export function clear(){
  return {
    type: CLEAR,
  }
}

export function init(){
  return {
    type: INIT,
  }
}

const initialState = {
  status: 'INIT',
  originX: undefined,
  originY: undefined,
  newX: undefined,
  newY: undefined
}

export function drawReducer(state = initialState, action: ActionType){
  switch(action.type){
    case DRAW:
      return {
        ...state,
        status: 'DRAW',
        originX: action.payload.originP[0],
        originY: action.payload.originP[1],
        newX: action.payload.newP[0],
        newY: action.payload.newP[1],
      }
    case CLEAR:
      return {
        ...state,
        status: 'CLEAR',
        originX: undefined,
        originY: undefined,
        newX: undefined,
        newY: undefined
      }
    case INIT:
      return {
        ...state,
        status: 'INIT',
        originX: undefined,
        originY: undefined,
        newX: undefined,
        newY: undefined
      }
    default:
      return state
  }
}


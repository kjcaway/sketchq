export const DRAW = 'DRAW' as const; 

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
    default:
      return state
  }
}


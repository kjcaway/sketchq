export const DRAW = 'DRAW' as const; 
export const CLEAR = 'CLEAR' as const; 
export const INIT = 'INIT' as const; 

export const CHANGE_COLOR = 'CHANGE_COLOR' as const;

export interface ActionType {
  type: string;
  payload: Drawing & string;
}

export interface Drawing {
  originP: Array<number>;
  newP: Array<number>;
  color: Color;
}

export type Color = 'red' | 'blue' | 'green' | 'black' | 'white';

export const colorList = ['BLACK', 'RED', 'GREEN', 'BLUE', 'WHITE'];

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

export function changeColor(payload: Color){
  return {
    type: CHANGE_COLOR,
    payload: payload
  }
}

const initialState = {
  status: 'INIT',
  originX: undefined,
  originY: undefined,
  newX: undefined,
  newY: undefined,
  color: 'BLACK'
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
        color: action.payload.color
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
    case CHANGE_COLOR:
      return {
        ...state,
        status: 'INIT',
        color: action.payload
      }
    default:
      return state
  }
}


export const DRAW = 'DRAW' as const; 

export interface ActionType {
  type: string;
  data: any;
}


export function draw(data: any){
  return {
    type: DRAW,
    data: data
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
        originX: action.data.originP[0],
        originY: action.data.originP[1],
        newX: action.data.newP[0],
        newY: action.data.newP[1],
      }
    default:
      return state
  }
}


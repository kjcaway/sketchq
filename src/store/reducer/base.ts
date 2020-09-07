export const OPEN_DIALOG = 'OPEN_DIALOG' as const;
export const CLOSE_DIALOG = 'CLOSE_DIALOG' as const;
export const INIT_DIALOG = 'INIT_DIALOG' as const;

export interface ActionType {
  type: string;
  payload: any;
}

export function openDialog(payload: any){
  return {
    type: OPEN_DIALOG,
    payload: payload
  }
}

export function closeDialog(){
  return {
    type: CLOSE_DIALOG,
  }
}

export function initDialog(){
  return {
    type: INIT_DIALOG,
  }
}

const initialState = {
  isShow: false,
  title: '',
  contents: '',
  type: undefined
}

export function baseReducer(state = initialState, action: ActionType){
  switch(action.type){
    case OPEN_DIALOG:
      return {
        ...state,
        isShow: true,
        title: action.payload.title,
        contents: action.payload.contents,
        type: action.payload.type,
      }
    case CLOSE_DIALOG:
      return {
        ...state,
        isShow: false
      }
    case INIT_DIALOG:
      return initialState
    default:
      return state
  }
}


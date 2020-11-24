import produce from 'immer';

export const OPEN_DIALOG = 'OPEN_DIALOG' as const;
export const CLOSE_DIALOG = 'CLOSE_DIALOG' as const;
export const INIT_DIALOG = 'INIT_DIALOG' as const;

export const OPEN_ALERT = 'OPEN_ALERT' as const;
export const CLOSE_ALERT = 'CLOSE_ALERT' as const;
export const INIT_ALERT = 'INIT_ALERT' as const;

export const OPEN_CONFIRM = 'OPEN_CONFIRM' as const;
export const CLOSE_CONFIRM = 'CLOSE_CONFIRM' as const;
export const OK_CONFIRM = 'OK_CONFIRM' as const;
export const CANCEL_CONFIRM = 'CLOSE_CONFIRM' as const;



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

export function openAlert(payload: any){
  return {
    type: OPEN_ALERT,
    payload: payload
  }
}

export function closeAlert(){
  return {
    type: CLOSE_ALERT,
  }
}

export function initAlert(){
  return {
    type: INIT_ALERT,
  }
}

export function openConfirm(payload: any){
  return {
    type: OPEN_CONFIRM,
    payload: payload
  }
}

export function closeConfirm(){
  return {
    type: CLOSE_CONFIRM,
  }
}

export function okConfirm(){
  return {
    type: OK_CONFIRM
  }
}

export function cancelConfirm(){
  return {
    type: CANCEL_CONFIRM,
  }
}

const initialState = {
  dialog: {
    isShow: false,
    title: '',
    contents: '',
    category: undefined
  },
  alert: {
    isShow: false,
    contents: '',
    category: undefined
  },
  confirm: {
    isShow: false,
    title: '',
    contents: ''
  }
}

export function baseReducer(state = initialState, action: ActionType){
  switch(action.type){
    case OPEN_DIALOG:
      return produce(state, draft => {
        draft.dialog.isShow = true
        draft.dialog.title = action.payload.title
        draft.dialog.contents = action.payload.contents
        draft.dialog.category = action.payload.category
      })
    case CLOSE_DIALOG:
      return produce(state, draft => {
        draft.dialog.isShow = false
      })
    case INIT_DIALOG:
      return produce(state, draft => {
        draft.dialog = initialState.dialog
      })
    case OPEN_ALERT:
      return produce(state, draft => {
        draft.alert.isShow = true
        draft.alert.contents = action.payload.contents
        draft.alert.category = action.payload.category
      })
    case CLOSE_ALERT:
      return produce(state, draft => {
        draft.alert.isShow = false
      })
    case INIT_ALERT:
      return produce(state, draft => {
        draft.alert = initialState.alert
      })
    case OPEN_CONFIRM:
      return produce(state, draft => {
        draft.confirm.isShow = true
        draft.confirm.title = action.payload.title
        draft.confirm.contents = action.payload.contents
      })
    case CLOSE_CONFIRM:
      return produce(state, draft => {
        draft.confirm = initialState.confirm
      })
    default:
      return state
  }
}


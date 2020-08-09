import { User } from './user'

export const CONNECT_SUCCESS = 'CONNECT_SUCCESS' as const;
export const ON_MESSAGE_SUCCESS = 'ON_MESSAGE_SUCCESS' as const;

export interface ActionType {
  type: string;
  payload: string & Message;
  data?: string;
}

export interface Message {
  messageType: string;
  sender: User;
  chat: string;
  drawing?: any;
}

export function connectSuccess(){
  return {
    type: CONNECT_SUCCESS,
  }
}

export function onMessageSuccess(payload: Message){
  return {
    type: ON_MESSAGE_SUCCESS,
    payload: payload
  }
}


const initialState = {
  status: 'INIT'
}

export function websocketReducer(state = initialState, action: ActionType){
  switch(action.type){
    case CONNECT_SUCCESS:
      return {
        ...state,
        status: 'SUCCESS'
      }
    case ON_MESSAGE_SUCCESS:
      return {
        ...state,
        status: 'SUCCESS'
      }
    default:
      return state
  }
}

import { User } from './user'

export const CONNECT_SUCCESS = 'CONNECT_SUCCESS' as const;
export const DISCONNECT = 'DISCONNECT' as const;
export const ON_MESSAGE_SUCCESS = 'ON_MESSAGE_SUCCESS' as const;

export const REQ_CREATE_ROOM = 'REQ_CREATE_ROOM' as const;
export const REQ_CREATE_ROOM_SUCCESS = 'REQ_CREATE_ROOM_SUCCESS' as const;

export const REQ_JOIN_ROOM_SUCCESS = 'REQ_JOIN_ROOM_SUCCESS' as const;

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

export function disconnect(payaload: string){
  return {
    type: DISCONNECT,
    payload: payaload
  }
}

export function onMessageSuccess(payload: Message){
  return {
    type: ON_MESSAGE_SUCCESS,
    payload: payload
  }
}

export function reqCreateRoom(){
  return {
    type: REQ_CREATE_ROOM,
  }
}

export function reqCreateRoomSuccess(data: string){
  return {
    type: REQ_CREATE_ROOM_SUCCESS,
    data: data
  }
}

export function reqJoinRoomSuccess(data: string){
  return {
    type: REQ_JOIN_ROOM_SUCCESS,
    data: data
  }
}


const initialState = {
  status: 'INIT',
  userId: undefined,
  roomId: undefined
}

export function websocketReducer(state = initialState, action: ActionType){
  switch(action.type){
    case CONNECT_SUCCESS:
      return {
        ...state,
        status: 'SUCCESS'
      }
    case DISCONNECT:
      return {
        ...state,
        status: 'SUCCESS'
      }
    case ON_MESSAGE_SUCCESS:
      return {
        ...state,
        status: 'SUCCESS'
      }
    case REQ_CREATE_ROOM:
      return {
        ...state,
        status: 'PENDING'
      }
    case REQ_CREATE_ROOM_SUCCESS:
      return {
        ...state,
        status: 'SUCCESS',
        roomId: action.data
      }
    case REQ_JOIN_ROOM_SUCCESS:
      return {
        ...state,
        status: 'SUCCESS',
        userId: action.data
      }
    default:
      return state
  }
}

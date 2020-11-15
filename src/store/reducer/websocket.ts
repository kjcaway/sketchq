import { User } from './user'
import { Drawing } from './draw';

export const CONNECT_SUCCESS = 'CONNECT_SUCCESS' as const;
export const DISCONNECT = 'DISCONNECT' as const;
export const ON_MESSAGE_SUCCESS = 'ON_MESSAGE_SUCCESS' as const;

export const REQ_CREATE_ROOM = 'REQ_CREATE_ROOM' as const;
export const REQ_CREATE_ROOM_SUCCESS = 'REQ_CREATE_ROOM_SUCCESS' as const;

export const REQ_JOIN_ROOM = 'REQ_JOIN_ROOM' as const;
export const REQ_JOIN_ROOM_SUCCESS = 'REQ_JOIN_ROOM_SUCCESS' as const;

export const SET_ROLE = 'SET_ROLE' as const;

export interface ActionType {
  type: string;
  payload: string & Message & User;
}

export interface Message {
  messageType: string;
  sender: User;
  chat: string;
  drawing?: Drawing;
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

export function reqCreateRoom(payload: string){
  return {
    type: REQ_CREATE_ROOM,
    payload: payload
  }
}

export function reqCreateRoomSuccess(payload: string){
  return {
    type: REQ_CREATE_ROOM_SUCCESS,
    payload: payload
  }
}

export function reqJoinRoom(payload: User){
  return {
    type: REQ_JOIN_ROOM,
    payload: payload
  }
}

export function reqJoinRoomSuccess(payload: User){
  return {
    type: REQ_JOIN_ROOM_SUCCESS,
    payload: payload
  }
}

export function setRole(payload: User){
  return {
    type: SET_ROLE,
    payload: payload
  }
}


const initialState = {
  status: 'INIT',
  userId: undefined,
  userName: undefined,
  userRole: undefined,
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
        roomId: action.payload
      }
    case REQ_JOIN_ROOM:
      return {
        ...state,
        status: 'PENDING'
      }
    case REQ_JOIN_ROOM_SUCCESS:
      return {
        ...state,
        status: 'SUCCESS',
        userId: action.payload.id,
        userName: action.payload.name,
        userRole: action.payload.role,
        roomId: action.payload.roomId,
      }
    case SET_ROLE:
      return {
        ...state,
        userRole: action.payload.role
      }
    default:
      return state
  }
}

import produce from 'immer';

export const ADD_USER = 'ADD_USER' as const; // 누군가 방에 참가
export const ADD_USERS = 'ADD_USERS' as const; // 처음 방에 참가시, 서버에서 참가자들 불러옴
export const REMOVE_USER = 'REMOVE_USER' as const;

export const CHAT = 'CHAT' as const;

export const REQ_JOIN = 'REQ_JOIN' as const;
export const REQ_JOIN_SUCCESS = 'REQ_JOIN_SUCCESS' as const;
export const REQ_JOIN_FAIL = 'REQ_JOIN_FAIL' as const;

export interface ActionType {
  type: string;
  payload: User & Array<User>;
  data?: string;
}

export interface User {
  id: string;
  name: string;
  roomNum: number;
  chat?: string;
}

export function addUser(payload: User){
  return {
    type: ADD_USER,
    payload: payload
  }
}


export function addUsers(payload: Array<User>){
  return {
    type: ADD_USERS,
    payload: payload
  }
}

export function removeUser(payload: User){
  return {
    type: REMOVE_USER,
    payload: payload
  }
}

export function chat(user: User, chat: string){
  return {
    type: CHAT,
    payload: user,
    data: chat
  }
}

export function reqJoin(payload: User){
  return {
    type: REQ_JOIN,
    payload: payload
  }
}

export function reqJoinSuccess(data: string){
  return {
    type: REQ_JOIN_SUCCESS,
    data: data
  }
}

export function reqJoinFail(error: String){
  return {
    type: REQ_JOIN_FAIL,
    error: error
  }
}

const initialState = {
  userList: [] as Array<User>,
  status: 'INIT',
  myId: ''
}

export function userReducer(state = initialState, action: ActionType){
  switch(action.type){
    case ADD_USER:
      return produce(state, draft => {
        // room user list 에 추가
        draft.userList.push(action.payload as never)
        draft.status = 'SUCCESS'
      })
    case ADD_USERS:
      return produce(state, draft => {
        // room user list 에 모두 추가
        draft.userList = action.payload
        draft.status = 'SUCCESS'
      })
    case REMOVE_USER:
      return produce(state, draft => {
        draft.userList.splice(
          draft.userList.findIndex((user: User) => user.id === action.payload.id),
          1
        );
        draft.status = 'SUCCESS'
      })
    case CHAT:
      return produce(state, draft => {
        let user = draft.userList.find(user => user.id === action.payload.id)
        if(user){
          user.chat = action.data
        }
        draft.status = 'SUCCESS'
      })
    case REQ_JOIN:
      return produce(state, draft => {
        draft.status = 'PENDING'
      })
    case REQ_JOIN_SUCCESS:
      return produce(state, draft => {
        draft.status = 'SUCCESS'
        draft.myId = action.data as string
      })
    case REQ_JOIN_FAIL:
      return produce(state, draft => {
        draft.status = 'FAIL'
      })
    default:
      return state
  }
}

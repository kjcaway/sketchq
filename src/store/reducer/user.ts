import produce from 'immer';

export const ADD_USER = 'ADD_USER' as const; // 누군가 방에 참가
export const REMOVE_USER = 'REMOVE_USER' as const;

export const CHAT = 'CHAT' as const;

export const REQ_USER_LIST = 'REQ_USER_LIST' as const;
export const REQ_USER_LIST_SUCCESS = 'REQ_USER_LIST_SUCCESS' as const;

export const HIT_WORD = 'HIT_WORD' as const;

export interface ActionType {
  type: string;
  payload: string & User & Array<User>;
}

export interface User {
  id: string;
  name: string;
  roomId: string;
  role: number;
  chat?: string;
}

export function addUser(payload: User){
  return {
    type: ADD_USER,
    payload: payload
  }
}

export function removeUser(payload: User){
  return {
    type: REMOVE_USER,
    payload: payload
  }
}

export function chat(user: User){
  return {
    type: CHAT,
    payload: user
  }
}

export function reqUserList(payload: string){
  return {
    type: REQ_USER_LIST,
    payload: payload
  }
}

export function reqUserListSuccess(payload: Array<User>){
  return {
    type: REQ_USER_LIST_SUCCESS,
    payload: payload
  }
}

export function hitWord(payload: User){
  return {
    type: HIT_WORD,
    payload: payload
  }
}

const initialState = {
  userList: [] as Array<User>,
  status: 'INIT',
  hitUserId: '' 
}

export function userReducer(state = initialState, action: ActionType){
  switch(action.type){
    case ADD_USER:
      return produce(state, draft => {
        // room user list 에 추가
        draft.userList.push(action.payload as never)
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
        draft.userList.find(user => user.id === action.payload.id)!!.chat = action.payload.chat
        draft.status = 'SUCCESS'
      })
    
    ////
    case REQ_USER_LIST:
      return produce(state, draft => {
        draft.status = 'PENDING'
      })
    case REQ_USER_LIST_SUCCESS:
      return produce(state, draft => {
        draft.status = 'SUCCESS'
        draft.userList = action.payload
      })

    case HIT_WORD:
      return produce(state, draft => {
        draft.status = 'SUCCESS'
        draft.hitUserId = action.payload.id
      })
    default:
      return state
  }
}

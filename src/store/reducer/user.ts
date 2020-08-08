import produce from 'immer';

export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS' as const; // 누군가 방에 참가
export const ADD_USERS_SUCCESS = 'ADD_USERS_SUCCESS' as const; // 누군가 방에 참가

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
}

export function addUser(payload: User){
  return {
    type: ADD_USER_SUCCESS,
    payload: payload
  }
}


export function addUsers(payload: Array<User>){
  return {
    type: ADD_USERS_SUCCESS,
    payload: payload
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
    case ADD_USER_SUCCESS:
      return produce(state, draft => {
        // room user list 에 추가
        draft.userList.push(action.payload as never)
        draft.status = 'SUCCESS'
      })
    case ADD_USERS_SUCCESS:
      return produce(state, draft => {
        // room user list 에 모두 추가
        draft.userList = action.payload
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
      })
    default:
      return state
  }
}

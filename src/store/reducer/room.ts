import produce from 'immer';

export const REQ_ROOM_LIST = 'REQ_ROOM_LIST' as const; 
export const REQ_ROOM_LIST_SUCCESS = 'REQ_ROOM_LIST_SUCCESS' as const; 

export interface ActionType {
  type: string;
  payload: any;
}

export function reqRoomList(payload: any){
  return {
    type: REQ_ROOM_LIST,
    payload: payload
  }
}

export function reqRoomListSuccess(payload: any){
  return {
    type: REQ_ROOM_LIST_SUCCESS,
    payload: payload
  }
}

const initialState = {
  status: 'INIT',
  roomList: []
}

export function gameReducer(state = initialState, action: ActionType){
  switch(action.type){
    case REQ_ROOM_LIST:
      return produce(state, draft => {
        draft.status = 'PENDING'
      })
    case REQ_ROOM_LIST_SUCCESS:
      return produce(state, draft => {
        draft.status = 'SUCCESS'
        draft.roomList = action.payload
      })
    default:
      return state
  }
}


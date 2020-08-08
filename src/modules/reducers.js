import {handleActions} from 'redux-actions'
import * as T from './actionTypes'

const initialState = {
  loading: false,
  error: false,
  houses: []
}

export const house = handleActions({
  [`${T.HOUSE_GET}_PENDING`](state, action) {
    return {
      ...state,
      loading: true,
      error: false
    }
  },
  [T.HOUSE_GET]: {
    next(state, action) {
      // handle success
      console.log(action)
      return {
        ...state,
        // loading: false,
        error: false,
        houses: [...state.houses, ...action.payload.data]
      }
    },
    throw(state, action) {
      // handle error
      return {
        ...state,
        loading: false,
        error: true
      }
    }
  },
  [T.SET_LOADING]: {
    next(state, action) {
      console.log(action)
      return {
        ...state,
        loading: action.payload
      }
    }
  },
  [T.REFRESH_DATA]: {
    next(state, action) {
      console.log(action)
      return {
        ...state,
        loading: false,
        houses: []
      }
    }
  },
  [`${T.HOUSE_DETAIL_GET}_PENDING`](state) {
    return {
      ...state,
      error: false
    }
  },
  [T.HOUSE_DETAIL_GET]: {
    next(state, action) {
      return {
        ...state,
        error: false,
        items: action.payload.data
      }
    },
    throw(state, action) {
      // handle error
      return {
        ...state,
        error: true
      }
    }
  }
}, initialState)

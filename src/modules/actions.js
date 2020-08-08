import { createAction } from 'redux-actions'
import * as T from './actionTypes'
import axios from 'axios'

export const houseGet = createAction(T.HOUSE_GET, data => {
  const { offset, limit, houseCount, method, maxRent, minRent } = data
  let url = `/api/v0.1/house?_limit=${limit}&_start=${offset}`
  if (houseCount >= 0) {
    url += `&houseInfo.house=${houseCount}`
  }
  if (method >= 0) {
    url += `&method=${method}`
  }
  // debugger
  if (maxRent > 0) {
    url += `&rent_lte=${maxRent}`
  }
  if (minRent > 0) {
    url += `&rent_gte=${minRent}`
  }
  // if (rent >= 0) {
  //   url += `&rent=${method}`
  // }
  return axios.get(url)
})

export const houseAdd = createAction(T.HOUSE_ADD, data =>
  axios.post('/api/v0.1/house', data)
)

export const houseDetail = createAction(T.HOUSE_DETAIL, data =>
  axios.get(`/api/v0.1/house/${data.id}`)
)

export const setLoading = createAction(T.SET_LOADING, data => data)
export const refreshData = createAction(T.REFRESH_DATA, data => [])

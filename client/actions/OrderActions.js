import fetch from 'isomorphic-fetch'
import * as types from '../constants/ActionTypes'

export function addOrder(id, order) {
  return { type: types.ADD_ORDER, id, order }
}

export function deleteOrder(id) {
  return { type: types.DELETE_ORDER, id }
}

export function changeOrderQuantity(id, quantity) {
  return { type: types.CHANGE_ORDER_QUANTITY, id, quantity }
}

function requestOrders(device) {
  return {
    type: types.REQUEST_ORDERS,
    device
  }
}

function receiveOrders(device, json) {
  return {
    type: types.RECEIVE_ORDERS,
    device,
    orders: json,
    receivedAt: Date.now()
  }
}

export function fetchOrders(device) {
  return function (dispatch) {
    dispatch(requestOrders(device))

    return fetch('http://localhost:3333/orders')
      .then(response => response.json())
      .then(json =>
        dispatch(receiveOrders(device, json))
      )
  }
}

export function invalidateOrders(device) {
  return {
    type: types.INVALIDATE_ORDERS,
    device
  }
}

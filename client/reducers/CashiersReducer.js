import { map, keyBy, fromPairs } from 'lodash'

export function cashiers(state = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  items: [],
  idByUsername: {},
  activeCashier: null,
  isAuthenticating: false,
  authError: null
}, action) {
  switch (action.type) {
    case 'INVALIDATE_CASHIERS':
      return {
        ...state,
        didInvalidate: true
      }
    case 'REQUEST_CASHIERS':
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case 'RECEIVE_CASHIERS':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: map(action.cashiers, 'CashierID'),
        idByUsername: fromPairs(map(action.cashiers, cashier => [cashier.CashierName, cashier.CashierID])),
        lastUpdated: action.receivedAt
      }
    case 'LOGIN_CASHIER':
      return {
        ...state,
        isAuthenticating: true
      }
    case 'SUCCEED_LOGIN_CASHIER':
      return {
        ...state,
        isAuthenticating: false,
        activeCashier: action.cashier
      }
    case 'FAIL_LOGIN_CASHIER':
      return {
        ...state,
        isAuthenticating: false,
        authError: action.error
      }
    case 'LOGOUT_CASHIER':
      return {
        ...state,
        activeCashier: null
      }
    default:
      return state
  }
}

export function cashierEntities(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_CASHIERS':
      return keyBy(action.cashiers, 'CashierID')
    default:
      return state
  }
}

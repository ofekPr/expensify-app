import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('should set defualt state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT'})
    expect(state).toEqual([]) 
})

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expenses if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('should add an expense', () => {
    const expense = {
        id: '4',
        description: 'Coffee',
        note: '',
        amount: 100,
        createdAt: 0
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([...expenses, expense])
})

test('should edit an expense by id', () => {
    const description = 'Coffee'
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[2].id,
        updates: {
            description
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state[2]).toEqual({...state[2], description})
})

test('should not edit expense if id not found', () => {
    const description = 'Coffee'
    const action = {
        type: 'EDIT_EXPENSE',
        id: '5',
        updates: {
            description
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})
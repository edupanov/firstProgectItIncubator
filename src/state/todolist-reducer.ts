import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTodoLIstActionType | AddTodoLIstActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export type RemoveTodoLIstActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodoLIstActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export const todoListReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {
                id: v1(),
                filter: "all",
                title: action.title
            }
            return [...state, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...state]
            }
            return state
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state];
        }
        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTodoListAC = (todoListID: string): RemoveTodoLIstActionType => {
    return {
        type: "REMOVE-TODOLIST",
        id: todoListID
    }
}

export const addTodolistAC = (title: string): AddTodoLIstActionType => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId}
}

import {v1} from "uuid";
import {TasksStateType} from "../App";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    RemoveTaskActionType,
    taskReducer
} from "./tasks-reducer";
import {AddTodoListAC} from "./todolists-reducer";

    let startState:TasksStateType
beforeEach(()=>{
     startState = {
        "todoListId1": [
            {id: "1", title: "HTML & CSS", isDone: true},
            {id: "2", title: "ES6 & TS", isDone: true},
            {id: "3", title: "React & Redux", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "Cream", isDone: true},
            {id: "3", title: "Candy", isDone: false},
        ]
    }
})



test('correct task should be removed', () => {
    const action = removeTaskAC("2", "todoListId2")
    const endState = taskReducer(startState, action)
    expect(endState).toEqual({
        "todoListId1": [
            {id: "1", title: "HTML & CSS", isDone: true},
            {id: "2", title: "ES6 & TS", isDone: true},
            {id: "3", title: "React & Redux", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "Milk", isDone: true},
            {id: "3", title: "Candy", isDone: false},
        ]
    });

});

test('correct task should be added', () => {
    //
    //
    const action = addTaskAC("blabla", "todoListId2")
    const endState = taskReducer(startState, action)
    //
    expect(endState["todoListId2"].length).toBe(4)

});

test('correct task status should be true', () => {
    //

    //
    const action = changeTaskStatusAC("3", true, "todoListId1")
    const endState = taskReducer(startState, action)
    //
    expect(endState["todoListId1"][2].isDone).toBe(true)

});

test('correct task title should be change', () => {
    //
    //
    const action = changeTaskTitleAC("3", "Andrey", "todoListId1")
    const endState = taskReducer(startState, action)
    //
    expect(endState["todoListId1"][2].title).toBe("Andrey")

});

test('new array should be added when new todolist is added ', () => {
    const action = AddTodoListAC("new todolist")
    const endState = taskReducer(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k!= "todoListId1" && k != "todoListId2")
    if(!newKey){
        throw Error("new key be added")
    }


    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
});
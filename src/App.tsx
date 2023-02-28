import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";


// CRUD
// R - filter, sort, search

export type FilterValuesType = "all" | "active" | "completed"

function App (): JSX.Element {
    console.log(typeof v1())
    //BLL:
    const todoListTitle: string = "What to learn"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "ES6 & TS", isDone: true},
        {id: v1(), title: "React & Redux", isDone: false},
    ])

    const removeTask = (taskId: string) => setTasks(tasks.filter(t => t.id !== taskId))
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const updatedTasks: TaskType[] = [newTask, ...tasks]
        setTasks(updatedTasks)
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
        setTasks(tasks.map((t )=> t.id === taskId ? {...t, isDone: newIsDone}  : t))
    }


    const [filter, setFilter]  = React.useState<FilterValuesType>("all")
    const changeFilterValue = (filter: FilterValuesType) => setFilter(filter)

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType):  Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)
    //UI:
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                filter={filter}
                changeFilterValue={changeFilterValue}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;

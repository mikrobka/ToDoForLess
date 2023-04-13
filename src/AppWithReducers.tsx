import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AdditemForm";
import {
    AppBar,
    Button,
    IconButton,
    Typography,
    Toolbar,
    Container,
    Grid,
    Paper,
    ThemeProvider,
    CssBaseline,
    createTheme,
    Switch,
    FormGroup,
    FormControlLabel
} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {lightGreen, orange} from '@mui/material/colors';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from './reducers/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./reducers/tasks-reducer";


// CRUD
// R - filter, sort, search

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todoListId1: string]: Array<TaskType>
}

function AppWithReducers(): JSX.Element {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ])

    const [tasks, dispatchTasks] = useReducer(taskReducer,{
        [todoListId1]: [{id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6 & TS", isDone: true},
            {id: v1(), title: "React & Redux", isDone: false},],
        [todoListId2]: [{id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Cream", isDone: true},
            {id: v1(), title: "Candy", isDone: false},]
    })

    const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

    //BLL:
    const removeTask = (taskId: string, todoListId: string) => {
        let action =removeTaskAC(taskId,todoListId)
        dispatchTasks(action)

    }
    const addTask = (title: string, todoListId: string) => {
        let action = addTaskAC(title,todoListId)
        dispatchTasks(action)

    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        let action = changeTaskStatusAC(taskId,newIsDone,todoListId)
        dispatchTasks(action)
    }
    const changeTasksTitle = (taskId: string, newTitle: string, todoListId: string) => {
        let action = changeTaskTitleAC(taskId,newTitle,todoListId)
        dispatchTasks(action)
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        let action = ChangeTodoListTitleAC(title,todoListId)
        dispatchTodoLists(action)
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        let action = ChangeTodoListFilterAC(filter,todoListId)
        dispatchTodoLists(action)
    }
    const removeTodoList = (todoListId: string) => {
        const action = RemoveTodoListAC(todoListId)
        dispatchTodoLists(action)
        dispatchTasks(action)

    }
    const addTodoList = (title: string) => {
        const action = AddTodoListAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }


    const todoListsComponents = todoLists.map(tl => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter)
        return (
            <Grid item>
                <Paper>
                    <TodoList
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        filter={tl.filter}
                        changeTodoListFilter={changeTodoListFilter}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                        changeTasksTitle={changeTasksTitle}
                    />
                </Paper>
            </Grid>


        )
    })

    //UI:
    const mode = isDarkMode ? "dark" : "light"
    const newThem = createTheme({
        palette: {
            mode: mode,
            primary: lightGreen,
            secondary: orange,
        }
    })
    return (
        <div className="App">
            <ThemeProvider theme={newThem}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="secondary"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>

                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            TodoLists
                        </Typography>
                        <FormGroup>
                            <FormControlLabel control={
                                <Switch onClick={() => (setIsDarkMode(!isDarkMode))} defaultChecked/>}
                                              label={isDarkMode ? "Dark Mode" : "Light Mode"
                                              }/>
                        </FormGroup>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid spacing={4} container sx={{p: "10px 0"}}>
                        {todoListsComponents}
                    </Grid>
                    <Grid container>
                        <AddItemForm maxLengthUserMessage={10} addNewItem={addTodoList}/>
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
}


export default AppWithReducers;

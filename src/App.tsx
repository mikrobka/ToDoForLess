import React, { useState} from 'react';
import './App.css';
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
import { useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import TodoListWithRedux from "./TodoList";


// CRUD
// R - filter, sort, search

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}



function App(): JSX.Element {
    let todoLists = useSelector<AppRootStateType,Array<TodoListType>>((state) => state.todolists )
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item>
                <Paper>
                    <TodoListWithRedux
                        todoList={tl}
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
                        <AddItemForm maxLengthUserMessage={10} />
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
}


export default App;

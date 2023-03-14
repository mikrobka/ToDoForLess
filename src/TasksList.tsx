import React, {ChangeEvent, FC} from 'react';
import todoList, {TaskType} from "./TodoList";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type TasksListPropsType = {
    todoListId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTasksTitle: (taskId: string, newTitle: string, todoListId: string) => void
}

const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {
    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
            ? props.tasks.map((task) => {
                const taskClasses = task.isDone ? "task task-done" : "task"
                const removeTaskHandler = () => props.removeTask(task.id, props.todoListId)
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                const changeTaskTitleHandler = (title: string) => {
                    props.changeTasksTitle(task.id, title, props.todoListId)
                }
                return (
                    <ListItem key={task.id} disablePadding={false} disableGutters={true}
                              secondaryAction={<IconButton aria-label="delete" onClick={removeTaskHandler}>
                                  <DeleteIcon/>
                              </IconButton>}
                    >
                        <Checkbox
                            checked={task.isDone}
                            onChange={changeTaskStatusHandler} defaultChecked size={"small"} sx={{margin: -1}}/>
                        <EditableSpan title={task.title} spanClasses={taskClasses} changeTitle={changeTaskTitleHandler}/>

                    </ListItem>
                )
            })
            : <span>Your taskslist is empty</span>
    return (
        <List>
            {tasksItems}
        </List>
    );
};

export default TasksList;
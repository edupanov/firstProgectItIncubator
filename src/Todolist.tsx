import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from './EditableSpan';
import {IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodoList: (todolistID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    };
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    };
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    };

    return <div>
        <h3>
            <EditableSpan
                value={props.title}
                changeValue={changeTodoListTitle}
            />
            <IconButton onClick={() => {
                props.removeTodoList(props.id)
            }}>
                <Delete/>
            </IconButton>

        </h3>

        <AddItemForm addItem={addTask}/>

        <ul style={{listStyle: "none", padding: "0"}}>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.id)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                       <Checkbox
                           color={"primary"}
                           onChange={onChangeHandler}
                           checked={t.isDone}
                       />
                        <EditableSpan
                            value={t.title}
                            changeValue={changeTaskTitle}
                        />
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button
                color={props.filter === 'all' ? "secondary" : "primary"}
                variant={props.filter === 'all' ? "outlined" : "text"}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                color={props.filter === 'active' ? "secondary" : "primary"}
                variant={props.filter === 'active' ? "outlined" : "text"}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                color={props.filter === 'completed' ? "secondary" : "primary"}
                variant={props.filter === 'completed' ? "outlined" : "text"}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

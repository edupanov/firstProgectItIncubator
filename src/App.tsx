import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, setTodolists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "active"}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bear", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
        ]
    })

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodolList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }
        setTodolists([...todoLists, newTodolList])
        setTasks({
            ...tasks,
            [newTodoListID]: []
        })
    }

    function removeTodoList(todolistID: string) {
        let newTodoLists = todoLists.filter(t => t.id !== todolistID)
        setTodolists(newTodoLists);
        delete tasks[todolistID];
        setTasks({...tasks});
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = newTitle
            setTodolists([...todoLists])
        }
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = value;
            setTodolists([...todoLists])
        }
    }

    function addTask(title: string, todolistID: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let todoList = tasks[todolistID];
        tasks[todolistID] = [newTask, ...todoList]
        setTasks({...tasks});
    }

    function removeTask(taskID: string, todolistID: string) {
        let todoList = tasks[todolistID]
        tasks[todolistID] = todoList.filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
        let todoList = tasks[todolistID];
        let task = todoList.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks});
    }

    function changeTaskTitle(id: string, title: string, todolistID: string) {
        let todoList = tasks[todolistID];
        let task = todoList.find(t => t.id === id);
        if (task) {
            task.title = title;
        }
        setTasks({...tasks});
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(t => {

                        let tasksForTodolist = tasks[t.id];

                        if (t.filter === "active") {
                            tasksForTodolist = tasks[t.id].filter(t => !t.isDone);
                        }
                        if (t.filter === "completed") {
                            tasksForTodolist = tasks[t.id].filter(t => t.isDone);
                        }

                        return (
                            <Grid key={t.id} item>
                                <Paper style={{padding: "10px"}} elevation={3}>
                                    <Todolist
                                        id={t.id}
                                        title={t.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={t.filter}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

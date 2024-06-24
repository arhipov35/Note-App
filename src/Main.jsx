import { useState, useEffect } from "react"
import List from "./Components/List";
import { v4 as uuidv4 } from 'uuid'
function Main(params) {
    // Forming a task
    const [tasks, setTasks] = useState(() => {
        const storedTodos = localStorage.getItem('tasks');
        if (!storedTodos) {
            return []
        }
        else {
            return JSON.parse(storedTodos)
        }
    });
    //Check what we entered
    const [tasksTitle, setTasksTitle] = useState('')
    //Додавання нових тасків
    function addTask(event) {
       //Synchronization of storage and states
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));

        if ((event.key === 'Enter' && event.target.value !== '') || (event.type === 'click' && event.target.value !== '' && tasksTitle !== '')) {
            setTasks([...storedTodos, { id: uuidv4(), title: tasksTitle, status: false, date: new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York" }) }])
            setTasksTitle('');
        }

    }

    //To save the task in browsers
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);




    //Date and time
    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()]
    const day = date.getDate();
    const year = date.getFullYear();


    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York" }));
    function time() {
        setCurrentTime(new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York" }));
    }
    setInterval(time, 1000);
    //------------------------------------

    return (<div className="container">
        <h1 className="main_title">Note your tasks . . .</h1>
        <div className="addInformation d-flex">
            <div className="timer" style={{ marginRight: '53px' }}>
                <i class="ri-time-line"></i>
                <div style={{ display: "inline-block", color: 'white', marginRight: '10px' }}>{currentTime}</div>
            </div>
            <div className="date">
                <i class="ri-calendar-line"></i>
                <span>{month + ' ' + day + ', ' + year}</span>
            </div>
        </div>
        <div className="input-filed">
            <input type="text" value={tasksTitle} onChange={event => setTasksTitle(event.target.value)}
                onKeyDown={addTask} required className="input_main" />
            <div className="labelline">Enter your name</div>
            <i class="ri-file-add-line" onClick={addTask}></i>
        </div>
        <List tasks={tasks}></List>
    </div>)
}
export default Main
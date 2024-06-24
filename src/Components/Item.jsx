import { useEffect, useState } from "react";
function Item(props) {
    const [checked, setCheked] = useState(props.status);
    const classes = ['todo'];
    if (checked) {
        classes.push('status')
    }
    // Update task change checkbox
    function updateStatus() {
        setCheked(!checked);
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));
        storedTodos.map((element) => {
            if (element.id === props.id) {
                element.status = !checked;
            }
            return true
        })
        localStorage.setItem('tasks', JSON.stringify(storedTodos));
    }

    //Remove the component
    const [visible, setVisible] = useState(true)
    function removeElement() {
        setVisible(prev => !prev)
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));
        let removeTodos = storedTodos.filter(item => {
            if (item.id !== props.id) {

                return true
            }
            return false
        })
        localStorage.setItem("tasks", JSON.stringify(removeTodos))
        console.log(removeTodos);
    }

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));
        let counterTodos = storedTodos.filter(item => !item.status);
        props.fun(counterTodos.length);

    }, [checked, visible]);


    //Editing the component
    const [changeElem, setChangeElem] = useState(false);
    const [inputValue, setInputValue] = useState(props.title)
    function getChange() {
        setChangeElem(true)
    }

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    const handleDivClick = (e) => {
        // Check if the target element is a checkbox
        if (e.target.type !== 'checkbox') {
            // If it's not a checkbox, don't change the state of the checkbox
            e.preventDefault();
        }
    };
    function render() {
        if (changeElem) {
            return (
                <input className="edit_input" type="text" value={inputValue} onBlur={onBlur} onChange={handleInputChange} autoFocus />
            );
        } else {
            return (
                <div className="format_read_main" onClick={handleDivClick}>
                    <div className="format_read">
                        <div className="chk_container">
                            <input className="checkbox-container" type='checkbox' checked={checked} onChange={updateStatus} />
                        </div>
                        <div className="second_read">
                            <p className="timer-curent">{currentTime}</p>
                            <h1 className="input_value">{inputValue}</h1>
                        </div>
                        <div className="elemnts_rull" >
                            <i class="ri-pencil-line" onClick={getChange}></i>
                            <i class="ri-delete-bin-line" onClick={removeElement}></i>
                        </div>
                    </div>
                </div>
            );
        }
    }

    //To exit the focus state and save the new edited data.
    function onBlur() {
        setChangeElem(false);
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));
        const updatedTodos = storedTodos.map((element) => {
            if (element.id === props.id) {
                element.title = inputValue;
            }
            return element;
        });
        localStorage.setItem('tasks', JSON.stringify(updatedTodos));
    }
    //Adding date and time
    const [currentTime, setCurrentTime] = useState(props.date);
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));
        const updatedTodos = storedTodos.map((element) => {
            if (element.id === props.id) {
                element.date = currentTime;
            }
            return element;
        });
        localStorage.setItem('tasks', JSON.stringify(updatedTodos));
    });
    return (
        <>
            {visible && (
                <li className={classes.join(' ')}>
                    <label >
                        {render()}
                    </label>
                </li>
            )}
        </>)
}

export default Item
import { useState, useEffect } from "react";
import Item from "./Item";

export default function List({ tasks }) {
    const [counter, setCounter] = useState(0);

    function count(arg) {
        setCounter(arg);
    }


    return (
        <>
            <div style={{ color: "white", marginTop: "33px", marginBottom: "17px" }}>
                <span style={{ color: 'white' }}>Number of unfinished tasks - {counter}</span>
            </div>
            <ul >
                {tasks.map((item) => (
                    <Item key={item.id} {...item} fun={count} />
                ))}
            </ul>
        </>
    );
}

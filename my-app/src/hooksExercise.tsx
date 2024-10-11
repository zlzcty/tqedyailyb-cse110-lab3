import React, { useState, useEffect } from 'react';

export function ClickCounter() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    // first argument is function that runs
    // [count] is an array of dependencies. Effect will only change when these change
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    }, [count]);

    return (
        <div>
            <p>Clicks: {count}</p>
            <button onClick={handleClick}>Click me!</button>
        </div>
    );
}

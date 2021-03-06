import React, { useEffect, useState, useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
    const [tasks, setTasks] = useState([]);
    const taskTransform = useCallback((data) => {
        const loadedTasks = [];
        for (const taskKey in data) {
            loadedTasks.push({ id: taskKey, text: data[taskKey].text });
        }
        setTasks(loadedTasks);
    }, []);
    const { isLoading, error, sendRequest } = useHttp(taskTransform);
    useEffect(() => {
        sendRequest({
            url: 'https://react-http-a3344-default-rtdb.firebaseio.com/tasks.json'
        }, taskTransform);
    }, [sendRequest, taskTransform]);

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task));
    };

    return (
        <React.Fragment>
            <NewTask onAddTask={taskAddHandler} />
            <Tasks
                items={tasks}
                loading={isLoading}
                error={error}
                onFetch={sendRequest}
            />
        </React.Fragment>
    );
}

export default App;

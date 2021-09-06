import useHttp from '../../hooks/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
    const taskTransform = (taskText, data) => {
        const generatedId = data.name; // firebase-specific => "name" contains generated id
        const createdTask = { id: generatedId, text: taskText };

        props.onAddTask(createdTask);
    };
    const { isLoading, error, sendRequest } = useHttp();

    const enterTaskHandler = async (taskText) => {
        sendRequest({
            url: 'https://react-http-a3344-default-rtdb.firebaseio.com/tasks.json',
            method: 'POST',
            body: JSON.stringify({ text: taskText }),
            headers: {
                'Content-Type': 'application/json',
            }
        }, taskTransform.bind(null, taskText))
    };

    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
            {error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;

import { useRouter } from 'next/router';
import useSWR from 'swr';
import TaskDetails from '../../components/TaskDetails';

const fetcher = async (url) => {
    const response = await fetch(url);
    return response.json();
};

const TaskDetailPage = () => {
    const router = useRouter();
    const { taskId } = router.query;

    const { data: task, error } = useSWR(
        taskId ? `https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks/${taskId}` : null,
        fetcher
    );

    if (error) {
        return <div>Error loading task details</div>;
    }

    if (!task) {
        return <div>Loading task details...</div>;
    }

    return (
        <div>
            <h1>Task Details: {task.patient}</h1>
            <TaskDetails task={task} />
        </div>
    );
};

export default TaskDetailPage;


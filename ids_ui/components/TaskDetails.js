import { Container, Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function TaskDetails(props) {
    const router = useRouter();
    const [editedTask, setEditedTask] = useState(props.task);

    const handleDelete = async () => {
        const response = await fetch(`https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks/${props.task._id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            router.push(`/tasks`);
            // Task deleted successfully
            // Perform any additional actions if required
        } else {
            // Task deletion failed, handle the error
            console.log('Error deleting task');
        }
    };

    const handleUpdate = async () => {
        const response = await fetch(`https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks/${props.task._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedTask),
        });

        if (response.ok) {
            // Task updated successfully
            // Perform any additional actions if required
        } else {
            // Task update failed, handle the error
            console.log('Error updating task');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    return (
        <>
            <Container>
                <Row>
                    <Col md>
                        <strong>The details of the patient {props.task?.patient} are below:</strong><br /><br />
                        <strong>Patient:</strong> <input type="text" name="patient" value={editedTask.patient} onChange={handleChange} /><br /><br />
                        <strong>Destination:</strong> <input type="text" name="destination" value={editedTask.destination} onChange={handleChange} /><br /><br />
                        <strong>Location:</strong> <input type="text" name="location" value={editedTask.location} onChange={handleChange} /><br /><br />
                        <strong>Isolation:</strong> <input type="checkbox" name="isolation" checked={editedTask.isolation} onChange={handleChange} /><br /><br />
                        <strong>Notes:</strong> <textarea name="notes" value={editedTask.notes} onChange={handleChange}></textarea><br /><br />
                        <strong>Requestor:</strong> <input type="text" name="requestor" value={editedTask.requestor} onChange={handleChange} /><br /><br />
                        <strong>Type:</strong> <input type="text" name="type" value={editedTask.type} onChange={handleChange} /><br /><br />
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>{' '}
                        <Button variant="primary" onClick={handleUpdate}>Update</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}




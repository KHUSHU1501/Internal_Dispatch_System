import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function TaskDetails(props) {
    const router = useRouter();
    const [editedTask, setEditedTask] = useState(props.task);

    const handleDelete = async () => {
        const response = await fetch(
            `https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks/${props.task._id}`,
            {
                method: 'DELETE',
                headers: { Authorization: `JWT ${props.token}` },
            }
        );

        if (response.ok) {
            router.push(`/tasks`);
            // Task deleted successfully
            // Perform any additional actions if required
        } else {
            // Task deletion failed, handle the error
            console.log('Error deleting task');
        }
    };

    const handleUpdate = async (e) => {

        e.preventDefault();
        console.log("Edited Task:", editedTask);
        const response = await fetch(
            `https://kind-teal-rhinoceros-belt.cyclic.app/api/tasks/${props.task._id}`,
            {
                method: 'PUT',
                body: JSON.stringify({
                    "type": editedTask.type,
                    "requestor": editedTask.requestor,
                    "patient": editedTask.patient,
                    "location": editedTask.location,
                    "destination": editedTask.destination,
                    "isolation": editedTask.isolation,
                    "notes": editedTask.notes,
                    "status": "notAssigned",
                    "transporter": "",
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${props.token}`, // Set the request's Content-Type header to indicate JSON data
                },
            }
        );

        if (response.ok) {
            // Task updated successfully
            // Perform any additional actions if required
            router.push(`/tasks`);
        } else {
            // Task update failed, handle the error
            console.log('Error updating task');
        }
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setEditedTask((prevTask) => ({
    //         ...prevTask,
    //         [name]: value,
    //     }));
    // };

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <br />
                    <Form onSubmit={handleUpdate}>
                        <Form.Group controlId="patient">
                            <Form.Label><strong>Patient:</strong></Form.Label>
                            <Form.Control
                                type="text"
                                name="patient"
                                value={editedTask.patient}
                                onChange={(e) => setEditedTask({ ...editedTask, patient: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="destination">
                            <Form.Label><strong>Destination:</strong></Form.Label>
                            <Form.Control
                                type="text"
                                name="destination"
                                value={editedTask.destination}
                                onChange={(e) => setEditedTask({ ...editedTask, destination: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="location">
                            <Form.Label><strong>Location:</strong></Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                value={editedTask.location}
                                onChange={(e) => setEditedTask({ ...editedTask, location: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="isolation">
                            <Form.Check
                                type="checkbox"
                                name="isolation"
                                label={<strong>Isolation:</strong>}
                                checked={editedTask.isolation}
                                onChange={(e) => setEditedTask({ ...editedTask, isolation: e.target.checked })}
                            />
                        </Form.Group>

                        <Form.Group controlId="notes">
                            <Form.Label><strong>Notes:</strong></Form.Label>
                            <Form.Control
                                as="textarea"
                                name="notes"
                                value={editedTask.notes}
                                onChange={(e) => setEditedTask({ ...editedTask, notes: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="requestor">
                            <Form.Label><strong>Requestor:</strong></Form.Label>
                            <Form.Control
                                type="text"
                                name="requestor"
                                value={editedTask.requestor}
                                onChange={(e) => setEditedTask({ ...editedTask, requestor: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="type">
                            <Form.Label><strong>Type:</strong></Form.Label>
                            <Form.Control
                                type="text"
                                name="type"
                                value={editedTask.type}
                                onChange={(e) => setEditedTask({ ...editedTask, type: e.target.value })}
                            />
                        </Form.Group>
                        <br />
                        <div className="mb-3">
                            <Button variant="danger" onClick={handleDelete} className="mr-2">
                                Delete
                            </Button> &nbsp;
                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
import React from 'react';
import { Form, Button } from 'react-bootstrap';

const NewTaskForm = ({ newTask, setNewTask, handleAddTask, inputRef }) => {
    return (
        <Form onSubmit={handleAddTask}>
            <Form.Group controlId="patientName">
                <Form.Label>
                    <strong>Patient Name</strong>
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter patient name"
                    value={newTask.patient}
                    onChange={(e) => setNewTask({ ...newTask, patient: e.target.value })}
                    ref={inputRef}
                    required
                />
            </Form.Group>

            <Form.Group controlId="location">
                <Form.Label>
                    <strong>Location</strong>
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter location"
                    value={newTask.location}
                    onChange={(e) => setNewTask({ ...newTask, location: e.target.value })}
                    required
                />
            </Form.Group>

            <Form.Group controlId="destination">
                <Form.Label>
                    <strong>Destination</strong>
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter destination"
                    value={newTask.destination}
                    onChange={(e) => setNewTask({ ...newTask, destination: e.target.value })}
                    required
                />
            </Form.Group>

            <Form.Group controlId="isolation">
                <Form.Check
                    type="checkbox"
                    label="Isolation"
                    checked={newTask.isolation}
                    onChange={(e) => setNewTask({ ...newTask, isolation: e.target.checked })}
                />
            </Form.Group>

            <Form.Group controlId="notes">
                <Form.Label>
                    <strong>Notes</strong>
                </Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter notes"
                    value={newTask.notes}
                    onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                />
            </Form.Group>

            <Form.Group controlId="requestor">
                <Form.Label>
                    <strong>Requestor</strong>
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter requestor"
                    value={newTask.requestor}
                    onChange={(e) => setNewTask({ ...newTask, requestor: e.target.value })}
                    required
                />
            </Form.Group>

            <Form.Group controlId="type">
                <Form.Label>
                    <strong>Type</strong>
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter type"
                    value={newTask.type}
                    onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
                Add Task
            </Button>
        </Form>
    );
};

export default NewTaskForm;

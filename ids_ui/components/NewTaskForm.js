import React from 'react';

const NewTaskForm = ({ newTask, setNewTask, handleAddTask, inputRef }) => {
    return (
        <form onSubmit={handleAddTask}>
            <input
                type="text"
                placeholder="Patient Name"
                value={newTask.patient}
                onChange={(e) => setNewTask({ ...newTask, patient: e.target.value })}
                ref={inputRef}
            />
            <input
                type="text"
                placeholder="Destination"
                value={newTask.destination}
                onChange={(e) => setNewTask({ ...newTask, destination: e.target.value })}
            />
            <input
                type="text"
                placeholder="Location"
                value={newTask.location}
                onChange={(e) => setNewTask({ ...newTask, location: e.target.value })}
            />
            <label>
                Isolation:
                <input
                    type="checkbox"
                    checked={newTask.isolation}
                    onChange={(e) => setNewTask({ ...newTask, isolation: e.target.checked })}
                />
            </label>
            <textarea
                placeholder="Notes"
                value={newTask.notes}
                onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
            ></textarea>
            <input
                type="text"
                placeholder="Requestor"
                value={newTask.requestor}
                onChange={(e) => setNewTask({ ...newTask, requestor: e.target.value })}
            />
            <input
                type="text"
                placeholder="Type"
                value={newTask.type}
                onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default NewTaskForm;

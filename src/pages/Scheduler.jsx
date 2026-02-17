import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
const locales = {};
const localizer = dateFnsLocalizer({format,parse,startOfWeek,getDay,locales,});

const Scheduler = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "",});

  // Open modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Add event to calendar
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      toast.error("Please fill all fields");
      return;
    }

    setEvents([...events, { ...newEvent, start: new Date(newEvent.start), end: new Date(newEvent.end) }]);
    setNewEvent({ title: "", start: "", end: "" });
    handleClose();
  };

  return (
    <div style={{ margin: "20px" }}>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        + Add Event
      </Button>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["month", "week", "day"]}
        style={{ height: "70vh" }}
      />

      {/* Modal for Adding Event */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Event Title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={newEvent.start}
                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={newEvent.end}
                onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddEvent}>
            Add Event
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Scheduler;

import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function StudentEditModal({ show, onHide, value, onSave }) {
  const [form, setForm] = useState({ name: "", age: "", avatar: "" });

  useEffect(() => {
    if (value) setForm(value);
  }, [value]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "age" ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton style={{ backgroundColor: "#f4a261", color: "white" }}>
        <Modal.Title>Edit student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full name / email</Form.Label>
            <Form.Control name="name" value={form.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" name="age" value={form.age} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Avatar URL</Form.Label>
            <Form.Control name="avatar" value={form.avatar} onChange={handleChange} />
            <Form.Text>VD: /images/student1.jpg</Form.Text>
          </Form.Group>
          <div className="mt-3 d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>Cancel</Button>
            <Button type="submit" variant="success">Save</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

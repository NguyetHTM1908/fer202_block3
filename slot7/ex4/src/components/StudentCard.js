import React from "react";
import { Card, Button } from "react-bootstrap";

export default function StudentCard({ student, onEdit }) {
  return (
    <Card className="student-card mb-3">
      <Card.Img variant="top" src={student.avatar} alt={`${student.name}'s avatar`} />
      <Card.Body>
        <Card.Title>{student.name}</Card.Title>
        <div className="age">Age: {student.age}</div>
        <Button variant="primary" size="sm" className="btn-edit" onClick={onEdit}>
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
}

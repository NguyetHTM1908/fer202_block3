
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import StudentCard from "./components/StudentCard";

export default function App() {
  const userData = { name: "traltb@fe.edu.vn", age: 39 };
  const namesList = ["traltb@fe.edu.vn", "test@fe.edu.vn"];
  const [students, setStudents] = useState([
    { name: "traltb1@fe.edu.vn", age: 39, avatar: "/images/student1.jpg" },
    { name: "traltb2@fe.edu.vn", age: 40, avatar: "/images/student2.jpg" },
    { name: "traltb3@fe.edu.vn", age: 41, avatar: "/images/student3.jpg" },
  ]);

  const handleEdit = (index) => {
    console.log("Edit student index:", index);
   
  };

  return (
    <div className="app-wrap">
      
       <div className="hero">
         <h1>Hello, {userData.name}</h1>
         <div className="sub">Hello, {userData.name}, {userData.age}</div>
       </div>
       

      {/* Tiêu đề */}
      <h3 className="section-title">Student information</h3>

      {/* Lưới card */}
      <div className="students-grid">
        {students.map((s, idx) => (
          <StudentCard key={idx} student={s} onEdit={() => handleEdit(idx)} />
        ))}
      </div>
    </div>
  );
}

// App.js
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import UserProfile from "./components/UserProfile";
import UserProfile2 from "./components/UserProfile2";
import MyForm from "./components/MyForm";
import ValidatedForm from "./components/ValidatedForm";

function App() {
  const handleFormSubmit = (data) => {
    console.log("Submit:", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="p-3">
      <h2>Ví dụ 1</h2>
      <UserProfile name="Nguyễn Văn A" age={25} />

      <hr />

      <h2>Ví dụ 2</h2>
      <UserProfile2 name="Nguyễn Văn B" age="20" onSubmit={handleFormSubmit} />

      <hr />

      <h2>Ví dụ 3</h2>
      <MyForm title="Đăng Ký Người Dùng" onSubmit={handleFormSubmit} />

      <hr />

      <h2>Ví dụ 4</h2>
      <ValidatedForm
        title="Form Validate Đầy Đủ"
        onSubmit={handleFormSubmit}
        defaultValues={{ name: "", age: "", email: "", phone: "", agree: false }}
      />
    </div>
  );
}

export default App;

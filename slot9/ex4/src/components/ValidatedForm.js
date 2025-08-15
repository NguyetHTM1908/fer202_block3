import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Form, Button, Alert } from "react-bootstrap";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; 
const phoneRegex = /^\d{10,15}$/; 

function ValidatedForm({ defaultValues, title, onSubmit }) {
  const [form, setForm] = useState({
    name: defaultValues?.name ?? "",
    age: defaultValues?.age ?? "",
    email: defaultValues?.email ?? "",
    phone: defaultValues?.phone ?? "",
    agree: defaultValues?.agree ?? false,
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const setField = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const newErr = {};

    // Name
    const name = (form.name || "").trim();
    if (!name) newErr.name = "Tên không được để trống.";
    else if (name.length < 3 || name.length > 50)
      newErr.name = "Tên phải dài 3–50 ký tự.";

    // Age
    const ageNum = Number(form.age);
    if (form.age === "" || form.age === null)
      newErr.age = "Tuổi không được để trống.";
    else if (Number.isNaN(ageNum)) newErr.age = "Tuổi phải là số.";
    else if (ageNum < 18 || ageNum > 100)
      newErr.age = "Tuổi phải trong khoảng 18–100.";

    // Email
    if (!form.email) newErr.email = "Email không được để trống.";
    else if (!emailRegex.test(form.email))
      newErr.email = "Email không đúng định dạng.";

    // Phone
    if (!form.phone) newErr.phone = "Số điện thoại không được để trống.";
    else if (!phoneRegex.test(form.phone))
      newErr.phone = "Số điện thoại phải gồm 10–15 chữ số.";

    
    if (!form.agree) newErr.agree = "Bạn phải đồng ý với điều khoản.";

    setErrors(newErr);
    setShowAlert(Object.keys(newErr).length > 0);
    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowAlert(false);
      onSubmit?.({
        name: form.name.trim(),
        age: Number(form.age),
        email: form.email.trim(),
        phone: form.phone.trim(),
        agree: form.agree,
      });
    }
  };

  return (
    <Container className="py-4">
      <h3 className="mb-3">{title}</h3>

      {showAlert && (
        <Alert variant="danger" className="mb-3">
          Vui lòng kiểm tra và sửa các lỗi bên dưới.
        </Alert>
      )}

      <Form noValidate onSubmit={handleSubmit}>
        {/* Name */}
        <Form.Group className="mb-3" controlId="fName">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={setField}
            isInvalid={!!errors.name}
            placeholder="Ví dụ: Nguyễn Văn A"
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Age */}
        <Form.Group className="mb-3" controlId="fAge">
          <Form.Label>Tuổi</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={form.age}
            onChange={setField}
            isInvalid={!!errors.age}
            placeholder="18–100"
            min={18}
            max={100}
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3" controlId="fEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={setField}
            isInvalid={!!errors.email}
            placeholder="your@email.com"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Phone */}
        <Form.Group className="mb-3" controlId="fPhone">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={form.phone}
            onChange={setField}
            isInvalid={!!errors.phone}
            placeholder="Chỉ nhập 10–15 chữ số"
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        {/* điều khoản */}
        <Form.Group className="mb-3" controlId="fAgree">
          <Form.Check
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={setField}
            isInvalid={!!errors.agree}
            label="Tôi đồng ý với điều khoản"
          />
          {errors.agree && (
            <div className="invalid-feedback d-block">{errors.agree}</div>
          )}
        </Form.Group>

        <Button type="submit" variant="primary">
          Gửi
        </Button>
      </Form>
    </Container>
  );
}

ValidatedForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  defaultValues: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    email: PropTypes.string,
    phone: PropTypes.string,
    agree: PropTypes.bool,
  }),
};

ValidatedForm.defaultProps = {
  onSubmit: (data) => console.log("Form submitted:", data),
  defaultValues: {
    name: "",
    age: "",
    email: "",
    phone: "",
    agree: false,
  },
};

export default ValidatedForm;

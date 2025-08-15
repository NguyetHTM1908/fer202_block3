import React from "react";
import PropTypes from "prop-types";

// Component UserProfile
function UserProfile({ name, age }) {
  // name thiếu/không hợp lệ
  if (!name || typeof name !== "string") {
    return (
      <div>
        <h3>Thông Tin Người Dùng</h3>
        <p style={{ color: "red" }}>Tên không hợp lệ hoặc không được cung cấp!</p>
      </div>
    );
  }

  // age thiếu/không hợp lệ
  if (!age) {
    return (
      <div>
        <h3>Thông Tin Người Dùng</h3>
        <p>Tên: {name}</p>
        <p style={{ color: "red" }}>Tuổi không được để trống!</p>
      </div>
    );
  } else if (isNaN(age)) {
    return (
      <div>
        <h3>Thông Tin Người Dùng</h3>
        <p>Tên: {name}</p>
        <p style={{ color: "red" }}>Tuổi phải là một số hợp lệ!</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Thông Tin Người Dùng</h3>
      <p>Tên: {name}</p>
      <p>Tuổi: {age}</p>
    </div>
  );
}

UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default UserProfile;

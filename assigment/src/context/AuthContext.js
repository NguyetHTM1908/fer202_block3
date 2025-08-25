import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const init = async () => {
      const savedUsers = localStorage.getItem('users');
      const localUsers = savedUsers ? JSON.parse(savedUsers) : [];
      if (Array.isArray(localUsers)) {
        setUsers(localUsers);
      }

      try {
        let res = await fetch('http://localhost:3002/accounts');
        if (!res.ok) {
          res = await fetch('http://localhost:3001/accounts');
        }
        if (res.ok) {
          const apiUsers = await res.json();
          const apiByUsername = new Map(apiUsers.map(u => [u.username || u.email, u]));
          const merged = Array.isArray(localUsers)
            ? [
                ...apiUsers,
                ...localUsers.filter(u => !apiByUsername.has(u.username || u.email))
              ]
            : apiUsers;
          setUsers(merged);
        }
      } catch (_) {}

      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
    };

    init();
  }, []);

 
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

 
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  

  const register = async (userData) => {
    // Kiểm tra username hoặc email đã tồn tại chưa
    const existingUser = users.find(
      user => user.username === userData.username || user.email === userData.email
    );

    if (existingUser) {
      if (existingUser.username === userData.username) {
        throw new Error('Tên đăng nhập đã tồn tại');
      }
      if (existingUser.email === userData.email) {
        throw new Error('Email đã được sử dụng');
      }
    }

    // Tạo user mới 
    const newUser = {
      id: Date.now().toString(),
      username: userData.username,
      email: userData.email,
      password: userData.password
    };

    // Thêm user mới vào danh sách
    const updated = [...users, newUser];
    setUsers(updated);

    try {
      let res = await fetch('http://localhost:3002/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      if (!res.ok) {
        await fetch('http://localhost:3001/accounts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        });
      }
    } catch (_) {}

    return newUser;
  };

 

  const login = async (username, password) => {
    // Tìm user theo username/email và password trong local state
    let user = users.find(
      u => (u.username === username || u.email === username) && u.password === password
    );

    // Nếu không tìm thấy, thử đồng bộ từ API rồi tìm lại
    if (!user) {
      try {
        let res = await fetch('http://localhost:3002/accounts');
        if (!res.ok) {
          res = await fetch('http://localhost:3001/accounts');
        }
        if (res.ok) {
          const apiUsers = await res.json();
          setUsers(apiUsers);
          user = apiUsers.find(
            u => (u.username === username || u.email === username) && u.password === password
          );
        }
      } catch (_) {}
    }

    if (!user) {
      throw new Error('Tên đăng nhập/email hoặc mật khẩu không đúng');
    }

    const { password: _, ...userWithoutPassword } = user;
    setCurrentUser(userWithoutPassword);
    setIsAuthenticated(true);
    return userWithoutPassword;
  };

  /**
   * Đăng xuất user
   */
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  
  const updateProfile = (updatedData) => {
    if (!currentUser) return;

    // Cập nhật user trong danh sách users
    const updatedUsers = users.map(user => 
      user.id === currentUser.id 
        ? { ...user, ...updatedData }
        : user
    );

    setUsers(updatedUsers);
    
    // Cập nhật current user
    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);
  };

  const value = {
    currentUser,      
    isAuthenticated,  
    users,          
    register,      
    login,          
    logout,        
    updateProfile   
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

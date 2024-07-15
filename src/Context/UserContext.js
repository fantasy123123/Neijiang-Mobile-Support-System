// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// 创建一个 Context 对象
const UserContext = createContext();

// 创建一个提供者组件
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

// 创建一个钩子以便更方便地使用 Context
export const useUser = () => {
  return useContext(UserContext);
};

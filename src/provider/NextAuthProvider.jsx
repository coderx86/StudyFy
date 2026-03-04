"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

const NextAuthProvider = ({ children }) => {
  return (
    <SessionProvider>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </SessionProvider>
  );
};

export default NextAuthProvider;

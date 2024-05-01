import React, { createContext, useContext, useState, ReactNode } from "react";
import Toast from "./Toast";
import { ToastContextType, ToastMessage } from "@/interfaces/ToastInterfaces";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toastList, setToastList] = useState<ToastMessage[]>([]);

  const addToast = (
    message: string,
    type: "success" | "error",
    duration = 3000
  ): void => {
    const id = Math.random().toString(36).substr(2, 9);
    setToastList((prev) => [...prev, { id, message, type, duration }]);
    setTimeout(() => {
      setToastList((current) => current.filter((toast) => toast.id !== id));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-12 right-5 space-y-2">
        {toastList.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

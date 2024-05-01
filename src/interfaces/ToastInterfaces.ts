export interface ToastMessage {
    id: string;
    message: string;
    type: "success" | "error";
    duration: number;
  }
  
  export interface ToastContextType {
    addToast: (
      message: string,
      type: "success" | "error",
      duration?: number
    ) => void;
  }
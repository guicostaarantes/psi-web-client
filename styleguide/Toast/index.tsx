import { useEffect } from "react";
import useTheme from "styleguide/Theme";
import { v4 as uuid } from "uuid";
import { createState, useState } from "@hookstate/core";

interface NewToastProps {
  header: string;
  message: string;
}

interface ToastProps {
  id: string;
  header: string;
  message: string;
}

const Toast = ({ header, id, message, ...rest }) => {
  const { theme } = useTheme();

  const cardBackgroundColor = theme.backgroundColor;

  const cardBorderColor = theme.defaultColor;

  const { removeToast } = useToast();

  useEffect(() => {
    setTimeout(() => removeToast(id), 30000);
  }, []);

  const closeToast = () => removeToast(id);

  return (
    <>
      <div className="wrapper" {...rest}>
        <div className="header">
          <div className="header-message">{header}</div>
          <button className="close-btn" onClick={closeToast}>
            X
          </button>
        </div>
        <div className="message">{message}</div>
      </div>
      <style jsx>{`
        .wrapper {
          background-color: ${cardBackgroundColor};
          border: 1px solid ${cardBorderColor};
          margin: 1rem;
          max-width: 300px;
          padding: 1rem;
          width: calc(100% - 2rem);
        }

        .header {
          display: flex;
        }
      `}</style>
    </>
  );
};

export const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <>
      <div>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            header={toast.header}
            id={toast.id}
            message={toast.message}
          />
        ))}
      </div>
      <style jsx>{`
        div {
          position: fixed;
          top: 0;
          right: 0;
        }
      `}</style>
    </>
  );
};

const toastState = createState<ToastProps[]>([
  {
    id: "123",
    header: "Email já cadastrado",
    message: "Esse email já está atrelado a uma",
  },
]);

const useToast = () => {
  const toastStateHook = useState<ToastProps[]>(toastState);

  const toasts = toastStateHook.get();

  const addToast = (newToast: NewToastProps) => {
    const id = uuid();
    toastStateHook.set((toasts) => [...toasts, { ...newToast, id }]);
  };

  const removeToast = (id: string) => {
    toastStateHook.set((toasts) => toasts.filter((toast) => toast.id !== id));
  };

  return { toasts, addToast, removeToast };
};

export default useToast;

import { useEffect, useMemo, useRef } from "react";
import { GrClose } from "react-icons/gr";
import { animated, useSpring } from "react-spring";
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
  state: "in" | "out";
}

const Toast = ({ header, id, message, state, ...rest }) => {
  const { theme } = useTheme();

  const cardBackgroundColor = theme.backgroundColor;

  const cardBorderColor = theme.defaultColor;

  const { removeToast } = useToast();

  const closeToast = () => removeToast(id);

  useEffect(() => {
    setTimeout(closeToast, 5000);
  }, []);

  const { x, opacity } = useSpring({
    from: {
      x: state === "in" ? 100 : 0,
      opacity: state === "in" ? 0 : 1,
    },
    x: state === "out" ? 100 : 0,
    opacity: state === "out" ? 0 : 1,
  });

  return (
    <>
      <animated.div
        style={{
          opacity,
          transform: x.interpolate((x) => `translateX(${x}%)`),
        }}
      >
        <div className="wrapper" {...rest}>
          <div className="header">
            <div className="header-message">{header}</div>
            <button className="close-btn" onClick={closeToast}>
              <GrClose />
            </button>
          </div>
          <div className="message">{id}</div>
        </div>
      </animated.div>
      <style jsx>{`
        .wrapper {
          background-color: ${cardBackgroundColor};
          border: 1px solid ${cardBorderColor};
          margin: 0.5rem 1rem;
          width: 300px;
        }

        .header {
          border-bottom: 1px solid ${cardBorderColor};
          display: flex;
          justify-content: space-between;
        }

        .header-message {
          margin: 0.6rem;
        }

        .close-btn {
          background: transparent;
          border: 0;
          cursor: pointer;
          margin: 0.6rem;
          outline: 0;
        }

        .message {
          margin: 0.6rem;
        }
      `}</style>
    </>
  );
};

export const ToastContainer = () => {
  const { toasts } = useToast();

  const refMap = useRef<Element[]>(new Array());

  const tops = useMemo(() => {
    return refMap.current.map((rm) => {
      return rm ? rm.getBoundingClientRect().height : 0;
    });
  }, [refMap.current[0]]);

  return (
    <>
      <div className="fixed">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            ref={(ref) => (index < 3 ? (refMap.current[index] = ref) : null)}
            style={{
              transition: "top 300ms ease",
              position: "absolute",
              right: 0,
              top: tops.reduce((a, c, i) => (i < index ? a + c : a), 0),
            }}
          >
            <Toast
              header={toast.header}
              id={toast.id}
              message={toast.message}
              state={toast.state}
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        .fixed {
          margin-top: 0.5rem;
          position: fixed;
          top: 0;
          right: 0;
        }
      `}</style>
    </>
  );
};

const toastState = createState<ToastProps[]>([]);

const useToast = () => {
  const toastStateHook = useState<ToastProps[]>(toastState);

  const toasts = toastStateHook.get();

  const addToast = (newToast: NewToastProps) => {
    setTimeout(
      () =>
        toastStateHook.set((toasts) => [
          { ...newToast, id: uuid(), state: "in" },
          ...toasts,
        ]),
      0
    );
    setTimeout(() => {
      toastStateHook.set((toasts) => [
        ...toasts.slice(0, 3),
        ...toasts
          .slice(3)
          .map((toast) => ({ ...toast, state: "out" } as ToastProps)),
      ]);
    }, 400);
    setTimeout(() => {
      toastStateHook.set((toasts) => toasts.slice(0, 3));
    }, 800);
  };

  const removeToast = (id: string) => {
    setTimeout(
      () =>
        toastStateHook.set((toasts) =>
          toasts.map((toast) =>
            toast.id === id ? { ...toast, state: "out" } : toast
          )
        ),
      0
    );
    setTimeout(() => {
      toastStateHook.set((toasts) => toasts.filter((toast) => toast.id !== id));
    }, 400);
  };

  return { toasts, addToast, removeToast };
};

export default useToast;

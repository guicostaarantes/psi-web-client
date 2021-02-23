import { useEffect, useMemo, useRef } from "react";
import { GrClose } from "react-icons/gr";
import { animated, useSpring } from "react-spring";
import { MAX_TOASTS, TOAST_LIFESPAN_MS } from "@src/constants/toast";
import useToast from "@src/hooks/useToast";
import useTheme from "@src/styleguide/Theme";

const Toast = ({ header, id, message, state, ...rest }) => {
  const { theme } = useTheme();

  const cardBackgroundColor = theme.backgroundColor;

  const cardBorderColor = theme.defaultColor;

  const { removeToast } = useToast();

  const closeToast = () => removeToast(id);

  useEffect(() => {
    setTimeout(closeToast, TOAST_LIFESPAN_MS);
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
        role="alert"
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
          <div className="message">{message}</div>
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

const ToastContainer = () => {
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
            ref={(ref) =>
              index < MAX_TOASTS ? (refMap.current[index] = ref) : null
            }
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

export default ToastContainer;

import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

import Card from "@psi/styleguide/components/Card";
import Container from "@psi/styleguide/components/Layout/Container";
import MediumTitle from "@psi/styleguide/components/Typography/MediumTitle";
import useTheme from "@psi/styleguide/hooks/useTheme";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
  title?: string;
}

const Modal = ({ children, onClose, open, title = "" }: ModalProps) => {
  const { theme } = useTheme();

  if (!open) return null;

  return createPortal(
    <>
      <div className="overlay" role="dialog">
        <Container>
          <div className="wrapper">
            <Card floating>
              <div className="content">
                <div className="header">
                  <MediumTitle noMarginTop noMarginBottom>
                    {title}
                  </MediumTitle>
                  <button className="close-btn" onClick={onClose}>
                    <MdClose size="1.5rem" />
                  </button>
                </div>
                {children}
              </div>
            </Card>
          </div>
        </Container>
      </div>
      <style jsx>{`
        .close-btn {
          background: transparent;
          border: 0;
          color: ${theme.defaultColor};
          cursor: pointer;
          margin-left: 3rem;
          outline: 0;
          padding: 0;
        }
        .content {
          margin: 0.5rem;
        }
        .header {
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .overlay {
          align-items: center;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          height: 100%;
          justify-content: center;
          left: 0;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 10;
        }
        .wrapper {
          max-width: 80vw;
          margin: 1rem;
        }
      `}</style>
    </>,
    document.getElementById("__next"),
  );
};

export default Modal;

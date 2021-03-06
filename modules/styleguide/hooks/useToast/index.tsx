import { createState, useState } from "@hookstate/core";
import { v4 as uuid } from "uuid";

import {
  MAX_TOASTS,
  TOAST_OUT_ANIMATION_DELAY_DURATION_MS,
} from "@psi/styleguide/constants/toast";

interface NewToastProps {
  header: string;
  message: string;
}

export interface ToastProps {
  id: string;
  header: string;
  message: string;
  state: "in" | "out";
}

const toastState = createState<ToastProps[]>([]);

const useToast = () => {
  const toastStateHook = useState<ToastProps[]>(toastState);

  const toasts = toastStateHook.value;

  const addToast = (newToast: NewToastProps) => {
    setTimeout(
      () =>
        toastStateHook.set((toasts) => [
          { ...newToast, id: uuid(), state: "in" },
          ...toasts,
        ]),
      0,
    );
    setTimeout(() => {
      toastStateHook.set((toasts) => [
        ...toasts.slice(0, MAX_TOASTS),
        ...toasts
          .slice(MAX_TOASTS)
          .map((toast) => ({ ...toast, state: "out" } as ToastProps)),
      ]);
    }, TOAST_OUT_ANIMATION_DELAY_DURATION_MS);
    setTimeout(() => {
      toastStateHook.set((toasts) => toasts.slice(0, 2 * MAX_TOASTS));
    }, 2 * TOAST_OUT_ANIMATION_DELAY_DURATION_MS);
  };

  const removeToast = (id: string) => {
    setTimeout(
      () =>
        toastStateHook.set((toasts) =>
          toasts.map((toast) =>
            toast.id === id ? { ...toast, state: "out" } : toast,
          ),
        ),
      0,
    );
    setTimeout(() => {
      toastStateHook.set((toasts) => toasts.filter((toast) => toast.id !== id));
    }, TOAST_OUT_ANIMATION_DELAY_DURATION_MS);
  };

  return { toasts, addToast, removeToast };
};

export default useToast;

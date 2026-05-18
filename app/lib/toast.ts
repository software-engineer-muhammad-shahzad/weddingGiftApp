// src/lib/toast/index.ts

import { toast } from "sonner";

export const showSuccess = (message: string): void => {
  toast.success(message);
};

export const showError = (message: string): void => {
  toast.error(message);
};

export const showInfo = (message: string): void => {
  toast.info(message);
};

export const showWarning = (message: string): void => {
  toast.warning(message);
};
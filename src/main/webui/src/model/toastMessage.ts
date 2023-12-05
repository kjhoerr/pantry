export interface ToastMessage {
  key?: string;
  level: "error" | "info" | "warning" | "success" | "network";
  message: string;
  detail?: string;
  open?: boolean;
  duration?: number;
}

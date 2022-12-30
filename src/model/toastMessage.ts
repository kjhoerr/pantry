export interface ToastMessage {
  key?: string;
  level: "error" | "info" | "warning" | "success";
  message: string;
  detail?: string;
  open?: boolean;
}

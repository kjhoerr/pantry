import { GlobeAltIcon } from "@heroicons/react/24/outline";
import {
  CheckIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { Toast } from "flowbite-react";
import React, { useMemo } from "react";

import { useSelector } from "../hooks";
import { ToastMessage } from "../model";

const getColor = (level: ToastMessage["level"]) => {
  switch (level) {
    case "error":
    case "network":
      return "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200";
    case "warning":
      return "bg-yellow-100 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200";
    case "success":
      return "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200";
    case "info":
    default:
      return "bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200";
  }
};

const getIcon = (level: ToastMessage["level"]) => {
  switch (level) {
    case "error":
      return ExclamationCircleIcon;
    case "network":
      return GlobeAltIcon;
    case "warning":
      return ExclamationTriangleIcon;
    case "success":
      return CheckIcon;
    case "info":
    default:
      return InformationCircleIcon;
  }
};

export const GlobalToast = () => {
  const messageRecords = useSelector((state) => state.toast);
  const messages = useMemo(
    () => Object.values(messageRecords),
    [messageRecords],
  );
  return (
    <div id="toast-holder" className="fixed right-10 bottom-0">
      {messages
        .filter((m) => m.open !== false)
        .map((message) => {
          const color = getColor(message.level);
          const Icon = getIcon(message.level);
          return (
            <div key={message.key}>
              <Toast className="mb-7 w-80">
                <div
                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="block ml-3 text-sm font-semibold text-gray-900 dark:text-white">
                    {message.message}
                  </div>
                  <div className="block ml-3 text-sm font-normal">
                    {message.detail}
                  </div>
                </div>
                <Toast.Toggle />
              </Toast>
            </div>
          );
        })}
    </div>
  );
};

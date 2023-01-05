import { Transition } from "@headlessui/react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import {
  CheckIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { Toast } from "flowbite-react";

import { ToastMessage } from "../model/toastMessage";
import { useSelector } from "../store";

const getColor = (level: ToastMessage["level"]) => {
  switch (level) {
    case "error":
    case "network":
      return "red";
    case "warning":
      return "yellow";
    case "success":
      return "green";
    case "info":
    default:
      return "blue";
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
  const messages = useSelector((state) => state.toast.valueSeq());
  return (
    <div id="toast-holder" className="absolute right-0 bottom-0">
      {messages.map((message) => {
        const color = getColor(message.level);
        const Icon = getIcon(message.level);
        return (
          <Transition
            key={message.key}
            show={message.open !== false}
            appear={true}
            enter="transition-opacity duration-900"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-900"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Toast className="mb-5 mr-10">
              <div
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-${color}-100 text-${color}-500 dark:bg-${color}-800 dark:text-${color}-200`}
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
          </Transition>
        );
      })}
    </div>
  );
};

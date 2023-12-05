import React from "react";

import { DEVMODE } from "../config";

export const Footer = () => {
  return (
    <div
      id="footer"
      className="flex justify-center pb-2 flex-grow items-end text-sm"
    >
      {DEVMODE && (
        <a
          href="/q/dev/"
          className="text-gray-400 dark:text-gray-600 hover:text-gray-500"
          target="_blank"
        >
          Visit Quarkus dev page
        </a>
      )}
    </div>
  );
};

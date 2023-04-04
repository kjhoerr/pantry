interface FooterProps {
  devMode: boolean;
}

export const Footer = ({ devMode }: FooterProps) => {
  return (
    <div
      id="footer"
      className="flex justify-center pb-2 flex-grow items-end text-sm"
    >
      {devMode && (
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

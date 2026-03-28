import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-green-400 dark:bg-green-700 py-8 mt-12">
      <div className="flex justify-center items-center gap-6 md:gap-10 flex-wrap text-white text-base md:text-lg">
        <a
          href="https://github.com/Goutamchoudhary907"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/goutamchoudhary"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          LinkedIn
        </a>
        <a
          href="https://twitter.com/goutam907"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Twitter
        </a>
        <a
          href="https://github.com/Goutamchoudhary907/pestiguide"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Source Code
        </a>
        <a
          href="mailto:goutamchoudhary907@gmail.com"
          className="hover:underline"
        >
          goutamchoudhary907@gmail.com
        </a>
      </div>
    </div>
  );
};

export default Footer;
import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-green-400 dark:bg-green-700 py-8 mt-12">
      <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap text-white text-lg md:text-xl">
        <a href="#" className="hover:underline">Instagram</a>
        <a href="#" className="hover:underline">Twitter</a>
        <a href="#" className="hover:underline">LinkedIn</a>
        <a href="mailto:PestiGuide@gmail.com" className="hover:underline">PestiGuide@gmail.com</a>
      </div>
    </div>
  );
};

export default Footer;
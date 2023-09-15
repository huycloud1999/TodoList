import React from "react";
import { ReactComponent as ReactLogo } from "../assets/logo/logo.svg";
function Header() {
  return (
    <div className=" bg-gray700 py-9 pb-[53px] ">
      <div className="cursor-pointer flex items-center justify-center  gap-2">
      <ReactLogo  />
      <div className="text-[40px] font-extra-bold ">
        <p className="text-blue">
          to<span className="text-purpleDark">do</span>
        </p>
      </div>
      </div>
      
    </div>
  );
}

export default Header;

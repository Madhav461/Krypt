import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "./images/logo.png";

const NavBarItem = ({ title, classprops }) => (
  <a href={`/${title}`}><li className={`mx-4 cursor-pointer ${classprops} `}>{title}</li></a>
);




const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="w-full flex md:ml-[5%] justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial  justify-center items-center">
        <a href="/"><img src={logo} alt="logo" className="w-52 cursor-pointer ethereum-logo" />
        </a>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
        <a href="/signup"><li className="bg-[#2952e3] ethereum-logo py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
        </a>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer " onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3  sm:w-[50vw] w-[60vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg mr-4" />,
            )}
            <a href="/signup"><li className="bg-[#2952e3] py-2 px-7  ethereum-logo rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
        </a>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import React,{useContext} from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "./images/logo.png";
import { TransactionContext } from "./context/TransactionContext";
const NavBarItem = ({ title, classprops ,Link}) => (
  <a href={Link}><li className={`mx-4 cursor-pointer ${classprops} `}>{title}</li></a>
);




const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const {currentAccount } = useContext(TransactionContext);
  return (
    <nav className="w-full flex md:ml-[5%] justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial  justify-center items-center">
        <a href="/"><img src={logo} alt="logo" className="w-52 cursor-pointer ethereum-logo" />
        </a>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
      <NavBarItem title="Market" Link="https://www.cnbctv18.com/market/" key={0} classprops="my-2 text-lg mr-4" ></NavBarItem>
            <NavBarItem title="Finance" Link="https://www.cnbctv18.com/personal-finance/" key={1} classprops="my-2 text-lg mr-4" ></NavBarItem>
            <NavBarItem title="Exchange" Link="https://www.google.com/finance/quote/INR-USD?sa=X&ved=2ahUKEwju4uDv0oOAAxU69zgGHTlOD54QmY0JegQIBhAc" key={0} classprops="my-2 text-lg mr-4" ></NavBarItem>
            <NavBarItem title="Wallet" Link ={`https://sepolia.etherscan.io/address/${currentAccount}`} key={0} classprops="my-2 text-lg mr-4" ></NavBarItem>
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

            <NavBarItem title="Market" Link="https://www.cnbctv18.com/market/" key={0} classprops="my-2 text-lg mr-4" ></NavBarItem>
            <NavBarItem title="Finance" Link="https://www.cnbctv18.com/personal-finance/" key={1} classprops="my-2 text-lg mr-4" ></NavBarItem>
            <NavBarItem title="Exchange" Link="https://www.google.com/finance/quote/INR-USD?sa=X&ved=2ahUKEwju4uDv0oOAAxU69zgGHTlOD54QmY0JegQIBhAc" key={0} classprops="my-2 text-lg mr-4" ></NavBarItem>
            <NavBarItem title="Wallet" Link ={`https://sepolia.etherscan.io/address/${currentAccount}`} key={0} classprops="my-2 text-lg mr-4" ></NavBarItem>
            {/* {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => <NavBarItem key={item + index} title={item} link  />,
            )} */}

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
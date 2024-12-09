import React from "react";
import { useAuth } from "../Zustand/useAuth";
import {Avatar , Button} from "antd"
import { FcTodoList } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData , log_out } = useAuth();
  return (
    <header className={`flex ${userData ? "justify-between" : " justify-center"} items-center px-8 max-sm:px-2 py-4`}>
      <h1 onClick={()=>{
        navigate("/")
      }} className={`text-xl flex justify-between items-center cursor-pointer max-sm:text-lg font-thin`}>Taskify <FcTodoList className=" inline size-6 ml-2"/></h1>
        {
          userData  && <div className=" flex space-x-4 max-sm:space-x-1 items-center">
               {<FiLogOut onClick={async () => {
                   await log_out();
               }}  className="text-3xl cursor-pointer mr-2"/>}
               <div onClick={()=>{
                       navigate("/profile")
               }} className="flex items-center justify-center cursor-pointer space-x-2 text-blue-500">
                   <Avatar className=" text-black" icon={userData.name.trim().split(" ")[0]?.charAt(0).toUpperCase()}/>
               </div>
          </div>
        }
    </header>
  );
};

export default Navbar;

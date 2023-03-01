import React from "react";
import facebookLogo from "./assets/Facebook_logo_PNG12.png";
import {
  AiOutlineSearch,
  AiFillHome,
  AiOutlineYoutube,
  AiOutlineShop,
} from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { CgGames, CgMenuGridO, CgProfile } from "react-icons/cg";
import { RiMessengerFill } from "react-icons/ri";
import { FaBell } from "react-icons/fa";

import "./navbar.css";
const Navbar = () => {

  const activeLink = e => {
    console.log(e.target);
  }

  return (
    <nav className="facebook__navbar">
      <div className="navbar__left-list-item">
      <div className="facebook__logo">
        <img src={facebookLogo} alt="facebook-logo" />
      </div>
      <div className="navbar__search">
        <AiOutlineSearch color="#65676B" size={22}/>
        <input type="search" placeholder="Search Facebook" />
        <div className="navbar__search-output">
            <small>No recent search</small>
        </div>
      </div>
      </div>
      <div className="navbar__main-list-items ">
        <div className="list-item" onClick={activeLink}>
          <AiFillHome color="#65676B" size={30} />
        </div>
        <div className="list-item">
          <AiOutlineYoutube color="#65676B" size={30}/>
        </div>
        <div className="list-item">
          <AiOutlineShop color="#65676B" size={30}/>
        </div>
        <div className="list-item">
          <HiUserGroup color="#65676B" size={30}/>
        </div>
        <div className="list-item">
          <CgGames color="#65676B" size={30}/>
        </div>
      </div>
      <div className="navbar__right-list-items">
        <div className="list-item">
          <CgMenuGridO size={30}/>
        </div>
        <div className="list-item">
          <RiMessengerFill size={20}/>
        </div>
        <div className="list-item">
          <FaBell size={20}/>
        </div>
        <div className="list-item">
          <CgProfile size={20}/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

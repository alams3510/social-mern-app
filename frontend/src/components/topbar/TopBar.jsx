import "./topbar.css";
import { FiSearch } from "react-icons/fi";
import { BsPersonFill, BsFillChatLeftDotsFill } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const TopBar = () => {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;

  const {user}=useContext(AuthContext);
  return (
    <div className="topbarContainer">
      <div className="tobarLeft">
        <Link to='/' style={{textDecoration:"none"}}>
        <span className="logo">facebook</span>
        </Link>
      </div>

      <div className="topbarMid">
        <div className="searchBar">
          <FiSearch className="searchIcon" />
          <input
            placeholder="Search for friends or videos"
            type="text"
            className="search"
          />
        </div>
      </div>
      <div className="topRight">
        <div className="topRightwrapper">
          <div className="textLink">
            <span className="text">HomePage</span>
            <span className="text">Timeline</span>
          </div>
          <div className="linkIcons">
            <div className="icon">
              <BsPersonFill />
              <span className="num">1</span>
            </div>
            <div className="icon">
              <BsFillChatLeftDotsFill />
              <span className="num">1</span>
            </div>
            <div className="icon">
              <IoMdNotifications />
              <span className="num">2</span>
            </div>
          </div>
          <div className="profileLink">
            <Link to={`/profile/${user.username}`}>          
            <img
              src={user.profilePicture ?PF+ user.profilePicture : PF+"person/noAvatar.png"}
              alt="img"
              className="profileImgbar"
            />
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

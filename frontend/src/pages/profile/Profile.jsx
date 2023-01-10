import "./profile.css";
import TopBar from "../../components/topbar/TopBar";
import SideBar from "../../components/sideBar/SideBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Profile = () => {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const username=useParams().username;

  const [user,setUser]=useState([]);
    useEffect(()=>{
      const  fetchUser=async()=>{
      const res=  await axios.get(`/users?username=${username}`);
      setUser(res.data);
      };
      fetchUser()
      },[username])
  return (
    <>
      <TopBar />

      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={PF+user.coverPicture ? PF+user.coverPicture: PF+'person/coverPicture.webp'} alt="" className="coverImg" />
              <img src={PF+user.profilePicture ?PF+user.profilePicture: PF+'person/noAvatar.png'} alt="" className="profileImg" />
            </div>
            <div className="profileInfo">
              <h4 className="profileName">{user.username}</h4>
              <span className="profileDesc">{user.desc}</span>
            </div>
          </div>

          <div className="profileBottomRight">
            <Feed username={username}/>
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

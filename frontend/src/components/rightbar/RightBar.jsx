import "./rightbar.css";
import { GrFormAdd } from "react-icons/gr";
import { useContext, useEffect } from "react";
import {axiosInstance} from "../../config"
import { useState } from "react";
import {AuthContext} from "../../context/AuthContext"
import {Link, useParams} from "react-router-dom"


const RightBar = ({ user }) => {
 const PF=process.env.REACT_APP_PUBLIC_FOLDER
const {user:currentUser,dispatch}=useContext(AuthContext);
 const[friend,setFriend]=useState([]);
 const [follow,setFollow]=useState(false);
console.log(follow);
console.log(user);
console.log(currentUser);
 useEffect(()=>{
    const fetchFriendlist= async()=>{
        try {
          const friendList=  await axiosInstance.get("/users/friends/"+currentUser._id)
              setFriend(friendList.data);
        } catch (error) {
              console.log(error);
        }
    }
    fetchFriendlist()
 },[currentUser._id]);

 useEffect(()=>{
setFollow(currentUser.followings.includes(user?._id))
 },[user])

    const handleFollow=async()=>{
       try {
        if(!follow){
          await axiosInstance.put("/users/"+user._id+"/follow",{
            userId:currentUser._id
          });
          dispatch({type:"FOLLOW",payload:user._id})
        }
        else{
          await axiosInstance.put("/users/"+user._id+"/unfollow",{
            userId:currentUser._id
          });
          dispatch({type:"UNFOLLOW",payload:user._id})
        }
       } catch (error) {
        console.log(error);
       }
       setFollow(!follow);
    }


  const HomeRightBar = () => {
    return (
      <div className="rightbarContainer">
        <div className="rightbarWrapper">
          <div className="birthdayGift">
            <img src="./asset/gift.png" alt="" className="bday" />
            <span className="rightbarGiftText">
              <b>Pola foster</b> and <b>2 other</b> have Birthday Today
            </span>
          </div>

          <div className="rightbarAd">
            <img src="./asset/ad.jpeg" alt="" className="ad" />
          </div>

          <div className="onlineFriends">
            <span className="onlineText">Online Friends</span>

        {
          friend.map((friend)=>{
              return (
                <div className="friends" key={friend._id}>
                <div className="online">
                  <img src={friend.profilePicture?PF+friend.profilePicture:PF+'/person/noAvatar.png'} alt="" className="onlinePic" />
                  <span className="status"></span>
                </div>
                <span className="onlineName">{friend.username}</span>
              </div>
              )
          })
        }
           
           
          </div>
        </div>
      </div>
    );
  };

  const ProfileRightBar = () => {
const name=useParams()
console.log(name);
console.log(currentUser.username);
   
    return (
      <div  className="profileContainer">
       {name.username !== currentUser.username &&<button className="followbtn" onClick={handleFollow}>
          <div>{follow?"UnFollow":"Follow"}</div> <GrFormAdd className="addicon" />
        </button>}
        <div className="userInfo">
          <h4 className="userHeading">User Information</h4>
          <hr />
          <div className="userdetails">
            <span>
              <b>City</b> {user.city}
            </span>
            <span>
              <b>From</b> {user.from}
            </span>
            <span>
              <b>RelationShip</b> {user.relationship ===1 ? "Single": user.relationship===2? "Married": ""}
            </span>
          </div>
          <hr />
          <div className="userFriends">
            <h2>User Friends</h2>
            {
          friend.map((friend)=>{
              return (
               <>
               <Link to={"/profile/"+friend.username} >
                <img src={friend.profilePicture?PF+friend.profilePicture:PF+'/person/noAvatar.png'}  alt="img" className="friendImg" />
                </Link>
            <span className="userName">{friend.username}</span>
               </>
              )
          })
        }
      </div>
        </div>
      </div>
    );
  };
  return user ? <ProfileRightBar /> : <HomeRightBar />;
};

export default RightBar;

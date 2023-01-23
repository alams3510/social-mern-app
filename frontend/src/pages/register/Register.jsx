import { useRef } from "react";
import "./register.css";
import axios from "axios";
import {useNavigate} from "react-router-dom"
const Register = () => {
  const navigate=useNavigate();

  const username=useRef();
  const email=useRef();
  const password=useRef();
  const passwordAgain=useRef();

 

  const handlesubmit=async(e)=>{
      e.preventDefault();
     
      if(password.current.value!==passwordAgain.current.value){
          passwordAgain.current.setCustomValidity('passwords doesnot matches!');
      }else{
        const user={
          username:username.current.value,
          email:email.current.value,
          password:password.current.value,    
        }
        try {
          await axios.post("api/auth/register",user);
          navigate("/login")
        } catch (error) {
          console.log(error);
        }
          
      }

  }
  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        <div className="textRegister">
          <span className="texts">facebook</span>
          <span className="desc">connect with friends and people</span>
        </div>

        <form className="registerform" onSubmit={handlesubmit}>
          <input placeholder="UserName" ref={username} type="text" className="registerInput" />
          <input placeholder="Email"  ref={email} type="email" className="registerInput" />
          <input placeholder="Password" minLength='6' ref={password} type="password" className="registerInput" />
          <input
          ref={passwordAgain}
            placeholder="Password Again"
            type="password"
            className="registerInput"
          />
          <button className="registerInput" id="signup" type="submit">
            Sign Up
          </button>
          <button className="registerInput" id="loginto">
            Log Into Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

import {axiosInstance} from "./config"
 const loginCalls=async(userCredentials,dispatch)=>{
    dispatch({type:"LOGIN_START"});
    try {
        const res=await axiosInstance.post('api/auth/login',userCredentials);
        dispatch({type:"LOGIN_SUCCESS",
                    payload:res.data})
    } catch (error) {
        dispatch({type:"LOGIN_FAILED",payload:error})
    }
}
export default loginCalls;
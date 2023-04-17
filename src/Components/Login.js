import React,{ useState}from "react";
import { useNavigate , NavLink} from "react-router-dom";
import {
    MDBInput,
    MDBBtn
  } from 'mdb-react-ui-kit';
import axios from "axios";

const Login = (props) => {

    const navigate = useNavigate();
    let isLoggedIn = null;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (e) =>{
      e.preventDefault();   
      axios.post("http://localhost:3000/auth", { email : email , password : password} , {
        withCredentials: true}).then((res)=> 
      { 
       if(res.data.User.length !== 0){
        let Role = res.data.User[0].role
        // let userName = res.User[0].find((user) => user.Email === Email) && res.User[0].find((user)=> user.Password === Password).FirstName
        isLoggedIn = true;
        props.statusMethod(isLoggedIn , Role , res.data.User[0])
        navigate('/blogs');
        if(isLoggedIn === true){
          localStorage.setItem("jwt",res.data.Token);
          localStorage.setItem("refreshToken",res.data.RefreshToken);
          localStorage.setItem("Token",JSON.stringify(res.data.User[0]));
          localStorage.setItem("isLoggedIn",true);
        }
        else{
          localStorage.clear();
        }
       }
       else{
        console.log('false');
        let Role = 'user';
        // let Id = null
        // let userName = null
        isLoggedIn = false;
        props.statusMethod(isLoggedIn, Role , 'none' )
       }
      })}

  return (
    <div className="container w-50 mt-5">
      <form onSubmit={submitHandler}>
      <h1 className='text-center fs-1 mb-5 shadow p-2'>Login</h1>
        <MDBInput
          className="mb-4 fs-6"
          type="email"
          id="form5Example2"
          label="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <MDBInput className="mb-4 fs-6" id="form5Example1" type="password" label="Password" onChange={(e) => setPassword(e.target.value)} />
        <MDBBtn type="submit" className="fs-6 mb-2" block>
          Login
        </MDBBtn>
        <NavLink to="/forgotPassword">Forgot Password ?</NavLink>
        <br />
        <MDBBtn type="button" block onClick={()=>navigate('/signup')} className='mt-2 fs-6' color='secondary'>
            Register
        </MDBBtn>
      </form>
    </div>
  );
};

export default Login;

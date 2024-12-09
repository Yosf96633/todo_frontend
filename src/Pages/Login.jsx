import React , {useEffect} from "react";
import { Design } from "../Components/index";
import { Input, Form, Button , message } from "antd";
import { Link , useNavigate } from "react-router-dom";
import { IoMailOutline, IoKeyOutline } from "react-icons/io5";
import {useAuth} from "../Zustand/useAuth"
const Login = () => {
  const p = `We’re happy to see you! Please provide your details to get started`
  const h1 = `Log In to Your Account`
  return (
    <div className="  h-screen grid sm:grid-cols-2 place-content-center">
    <div className=" flex flex-col justify-center items-center">
      <h1 className=" text-xl font-medium my-4">Log in</h1>
     <LoginForm/>
    </div>
    <div>
      <Design h1={h1} p={p}/>
    </div>
  </div>
  )
}

export default Login
const LoginForm = () => {
  const navigate = useNavigate();
  const {  messagee , reset , success , isLoading , log_in } = useAuth();
    useEffect(() => {
      if (success) {
             console.log(messagee);
             
        message.success(messagee);
        setTimeout(() => {
          navigate("/"); 
        }, 1500);
      } else if (messagee) {
        message.error(messagee);
      }
      return ()=>{
        reset();
      }
    } , [messagee , success]);
  return (
    <Form
      onFinish={async (e) => {
        const {email, password } = e;
        await log_in({ email, password }); 
      }}
    >
      <Form.Item
        name={"email"}
        rules={[{ required: true, message: "This field is required!" }]}
      >
        <Input prefix={<IoMailOutline />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "This field is required!" }]}
      >
        <Input.Password prefix={<IoKeyOutline />} placeholder="Password" />
      </Form.Item>
      <Button loading={isLoading} htmlType="submit" block type="primary">
        Login
      </Button>
      <p className="text-base my-4">
       Have'nt an account?{" "}
        <Link className="text-blue-500" to={"/signup"}>
          Sign up
        </Link>
      </p>
    </Form>
  );
};
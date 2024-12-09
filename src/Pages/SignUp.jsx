import React , {useEffect} from "react";
import { Design } from "../Components/index";
import { Input, Form, Button , message } from "antd";
import { Link , useNavigate } from "react-router-dom";
import { IoPersonOutline, IoMailOutline, IoKeyOutline } from "react-icons/io5";
import {useAuth} from "../Zustand/useAuth"
const h1 = `Create your Account`;
const p = `Create an account to enjoy all the features of our platform. Please fill out the form with your details to get started. We value your privacy and will keep your information secure.`;
const SignUp = () => {
  return (
    <div className=" h-screen grid sm:grid-cols-2 place-content-center">
      <div className=" flex flex-col justify-center items-center">
        <h1 className=" text-xl font-medium my-4">Let's connect with us</h1>
        <SignUpForm />
      </div>
      <div>
        <Design h1={h1} p={p}/>
      </div>
    </div>
  );
};

export default SignUp;

const SignUpForm = () => {
    const navigate = useNavigate();
    const {  messagee , reset , success , isLoading , sign_up } = useAuth();
    
    useEffect(() => {
      if (success) {
        message.success(messagee);
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after successful registration
        }, 1500);
      } else if (messagee) {
        message.error(messagee); // Show error message if registration failed
      }
      return ()=>{
             reset();
      }
    } , [messagee , success]);
     
    return (
      <Form
        onFinish={async (e) => {
          const { name, email, password } = e;
          await sign_up({ name, email, password }); // Wait for sign_up to complete
        }}
      >
        <Form.Item
          name={"name"}
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <Input prefix={<IoPersonOutline />} placeholder="Name" />
        </Form.Item>
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
          Sign up
        </Button>
        <p className="text-base my-4">
          Already have an account?{" "}
          <Link className="text-blue-500" to={"/login"}>
            Login
          </Link>
        </p>
      </Form>
    );
  };

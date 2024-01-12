import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Link from "next/link";
import "../styles/login.style.css";
// import 'app/global.css'

type LoginFormData = {
  username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [loginError, setLoginError] = useState<string>("");

  const handleLogin = async (data: LoginFormData) => {
    try {
      signIn("credentials", {
        username: data.username,
        password: data.password,
        callbackUrl: "/about",
      });
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError("An error occurred during login.");
    }
  };

  return (
    <div style={{background: 'chocholate', width: '100rem'}}>
      <div className="loginContent">
        <h1 className="titleLogin">L O G {'  '}I N</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="loginForm">
          <div style={{marginBottom: '30px'}}>
            <input
              {...register("username", { required: true })}
              className="loginInput"
              style={{width: '22rem'}}
              placeholder="username"
            />
            {errors.username && <span>Username is required</span>}
          </div>
          <div style={{marginBottom: '30px'}}>
            <input
              type="password"
              {...register("password", { required: true })}
              style={{width: '22rem'}}
              placeholder="password"
            />
            {errors.password && <span>Password is required</span>}
          </div>
          {loginError && <p>{loginError}</p>}
          <button type="submit" className="loginButton">
            Login
          </button>
        </form>

        <p>
          Dont have an account? <Link href="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

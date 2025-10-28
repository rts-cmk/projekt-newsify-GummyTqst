import { useNavigate } from "react-router"
import logo from "../assets/img/logo.png"
import "../styles/Login.sass"
import { useEffect } from "react";

const themeColor = () => {
    const savedTheme = localStorage.getItem("theme");
    const themeToApply = savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "dark-theme"
        : "light-theme";
    document.body.className = themeToApply;
}

export default function Login() {
    const navigate = useNavigate()

    useEffect(() => {
        themeColor();
    }, [])

    function handleNavigate() {
        navigate("/home")
    }


    return (
        <div className="loginContainer">
            <header className="loginContainer__header">
                <img src={logo} alt="Logo" className="loginContainer__logo" />
                <h1 className="loginContainer__title">Newsify</h1>
            </header>
            <p className="loginContainer__subtitle">Welcome! Let's dive into your account</p>
            <div className="loginContainer__btns">
                <button onClick={handleNavigate} className="loginContainer__btn loginContainer__btn--facebook">
                    Continue with Facebook
                </button>
                <button onClick={handleNavigate} className="loginContainer__btn loginContainer__btn--google">
                    Continue with Google
                </button>
            </div>

            <div className="loginContainer__seperator">
                Or
            </div>

            <footer className="loginContainer__footer">
                <button onClick={handleNavigate} className="loginContainer__btn loginContainer__btn--password">
                    Sign in with password
                </button>
                <p className="loginContainer__signupText">
                    Don't have an account? <a href="/signup" className="loginContainer__signupLink">Sign Up</a>
                </p>
            </footer>
        </div>
    )
}
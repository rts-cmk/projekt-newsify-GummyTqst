import logo from "../assets/img/logo.png"
import "../styles/Login.sass"

export default function Login() {
    return (
        <div className="loginContainer">
            <header className="loginContainer__header">
                <img src={logo} alt="Logo" className="loginContainer__logo" />
                <h1 className="loginContainer__title">Newsify</h1>
            </header>
            <p className="loginContainer__subtitle">Welcome! Let's dive into your account</p>
            <div className="loginContainer__btns">
                <button className="loginContainer__btn loginContainer__btn--facebook">
                    Continue with Facebook
                </button>
                <button className="loginContainer__btn loginContainer__btn--google">
                    Continue with Google
                </button>
            </div>

            <div className="loginContainer__seperator">
                Or
            </div>

            <footer className="loginContainer__footer">
                <button className="loginContainer__btn loginContainer__btn--password">
                    Sign in with password
                </button>
                <p className="loginContainer__signupText">
                    Don't have an account? <a href="/signup" className="loginContainer__signupLink">Sign Up</a>
                </p>
            </footer>
        </div>
    )
}
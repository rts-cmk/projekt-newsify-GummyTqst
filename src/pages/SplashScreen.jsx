import { useNavigate } from "react-router"
import { motion } from "framer-motion"
import Onboarding from "../components/Onboarding/Onboarding"
import { useEffect, useState } from "react";
import logo from "../assets/img/logo.png"
import "../styles/SplashScreen.sass"


function SplashScreen() {
    const navigate = useNavigate();
    const [showOnboarding, setShowOnboarding] =  useState(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            const firstVisit = localStorage.getItem("firstVisitOnboarding");
            const token = localStorage.getItem("loginToken");

            if (!firstVisit) {
                setShowOnboarding(true);
            } else if (!token) {
                navigate("/login")
            } else {
                navigate("/home");
            }

            setLoading(false);
        }, 2200)

        return () => clearTimeout(timer);
    }, [navigate])

    if (loading) {
        return (
            <div className="splash">
                <motion.img 
                    src={logo} 
                    alt="App Logo" 
                    className="splash__logo"
                    initial={{ opacity: 0, scale: 0.3 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 1.2, ease: "easeOut" }} 
                />

                <motion.h1
                    className="splash__title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 1,
                        duration: 0.8,
                        ease: "easeOut",
                    }}
                >
                    Newsify
                </motion.h1>
            </div>
        )
    }

    if (showOnboarding) {
        return <Onboarding onComplete={() => navigate("/login")} />
    }

    return null;
}

export default SplashScreen;
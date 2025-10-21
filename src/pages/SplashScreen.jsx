import { useNavigate } from "react-router"
import { motion } from "framer-motion"
import Onboarding from "../components/Onboarding/Onboarding"
import { useEffect, useState } from "react";


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
            } else if (token) {
                navigate("/login")
            } else {
                navigate("/home");
            }

            setLoading(false);
        }, 1500)

        return () => clearTimeout(timer);
    }, [navigate])

    if (loading) {
        return (
            <div className="splash-screen">
                <motion.img src="/logo.png" alt="App Logo" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} />
            </div>
        )

        if (showOnboarding) {
            return <Onboarding onComplete={() => navigate("/login")} />
        }

        return null;
    }
}

export default SplashScreen;
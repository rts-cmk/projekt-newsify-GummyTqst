import ThemeToggle from "../components/DarkMode/Darkmode"
import CategoryToggle from "../components/CategoryToggle/CategoryToggle"
import "../styles/Settings.sass"

export default function Settings() {
    return (
        <div className="settings-page">
            <h1>Settings</h1>
            <CategoryToggle />
            <ThemeToggle />
        </div>
    )
}
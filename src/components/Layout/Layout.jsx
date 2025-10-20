import { Link, Outlet } from "react-router";
import "../Layout/Layout.sass" 

export default function Layout() {
    return (
        <div className="app-container">
            {/* Page content */}
            <Outlet />
        </div>
    )
}
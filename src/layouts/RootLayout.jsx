import { Outlet, NavLink } from 'react-router-dom'
import Navbar from '../components/ui/Navbar'
export default function RootLayout() {
    return (
        <div className="min-h-dvh">
            <Navbar />
            <main className="max-w-6xl mx-auto p-4"><Outlet /></main>
        </div>
    )
}
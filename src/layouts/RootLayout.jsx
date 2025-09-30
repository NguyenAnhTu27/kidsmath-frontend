import { Outlet, NavLink } from 'react-router-dom'
import Navbar from '../components/ui/Navbar'
import { Footer } from '../components/ui/footer'
export default function RootLayout() {
    return (
        <div className="min-h-dvh">
            <Navbar />
            <main className="max-w-screen-2xl mx-auto p-4"><Outlet /></main>
            <Footer />
        </div>
    )
}
import { Link } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
export default function Navbar() {
    const { user, logout } = useAuthStore()
    return (
        <header className="bg-white/80 backdrop-blur border-b">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="font-black text-secondary">KidsMath</Link>
                <nav className="flex items-center gap-4">
                    {!user && (<>
                        <Link to="/login">Login</Link>
                        <Link to="/register" className="btn bg-secondary text-white">Register</Link>
                    </>)}
                    {user && (
                        <>
                            <span className="text-sm text-gray-600">{user.role}: {user.username}</span>
                            <button className="btn" onClick={logout}>Logout</button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}
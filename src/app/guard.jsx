import { Navigate, useLocation } from 'react-router-dom'
import useAuthStore from '../store/authStore'


export default function Guard({ roles = [], children }) {
    const { user } = useAuthStore()
    const loc = useLocation()
    if (!user) return <Navigate to="/login" state={{ from: loc }} replace />
    if (roles.length && !roles.includes(user.role)) return <Navigate to="/" replace />
    return children
}
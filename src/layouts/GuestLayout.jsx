import { Outlet, NavLink } from 'react-router-dom'
export default function GuestLayout() {
    return (
        <div>
            <section><Outlet /></section>
        </div>
    )
}
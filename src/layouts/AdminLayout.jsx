import { Outlet, NavLink } from 'react-router-dom'
export default function AdminLayout() {
    return (
        <div className="grid gap-4 md:grid-cols-[200px_1fr]">
            <aside className="card h-fit sticky top-4">
                <nav className="flex flex-col gap-2">
                    <NavLink to="/admin">Dashboard</NavLink>
                    <NavLink to="/admin/users">Users</NavLink>
                    <NavLink to="/admin/payments">Payments</NavLink>
                    <NavLink to="/admin/support">Support</NavLink>
                </nav>
            </aside>
            <section><Outlet /></section>
        </div>
    )
}
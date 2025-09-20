import { Outlet, NavLink } from 'react-router-dom'
export default function StudentLayout() {
    return (
        <div className="grid gap-4 md:grid-cols-[200px_1fr]">
            <aside className="card h-fit sticky top-4">
                <nav className="flex flex-col gap-2">
                    <NavLink to="/student">Dashboard</NavLink>
                </nav>
            </aside>
            <section><Outlet /></section>
        </div>
    )
}
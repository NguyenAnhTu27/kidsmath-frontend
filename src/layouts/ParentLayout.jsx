import { Outlet, NavLink } from 'react-router-dom'
export default function ParentLayout() {
    return (
        <div className="grid gap-4 md:grid-cols-[200px_1fr]">
            <aside className="card h-fit sticky top-4">
                <nav className="flex flex-col gap-2">
                    <NavLink to="/parent">Dashboard</NavLink>
                    <NavLink to="/parent/courses">Courses</NavLink>
                    <NavLink to="/parent/purchase">Purchase</NavLink>
                    <NavLink to="/parent/assign">Assign</NavLink>
                    <NavLink to="/parent/progress">Progress</NavLink>
                </nav>
            </aside>
            <section><Outlet /></section>
        </div>
    )
}
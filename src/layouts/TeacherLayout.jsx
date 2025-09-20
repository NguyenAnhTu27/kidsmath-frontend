import { Outlet, NavLink } from 'react-router-dom'
export default function TeacherLayout() {
    return (
        <div className="grid gap-4 md:grid-cols-[200px_1fr]">
            <aside className="card h-fit sticky top-4">
                <nav className="flex flex-col gap-2">
                    <NavLink to="/teacher">Dashboard</NavLink>
                    <NavLink to="/teacher/schedule">Schedule</NavLink>
                    <NavLink to="/teacher/grade">Grading</NavLink>
                    <NavLink to="/teacher/chat">Live chat</NavLink>
                </nav>
            </aside>
            <section><Outlet /></section>
        </div>
    )
}
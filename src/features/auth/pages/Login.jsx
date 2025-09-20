import { useState } from 'react'
import useAuthStore from '../../../store/authStore'


export default function Login() {
    const [form, setForm] = useState({ username: '', password: '', role: 'parent' })
    const { login } = useAuthStore()
    const onSubmit = async (e) => { e.preventDefault(); await login(form) }
    return (
        <div className="max-w-md mx-auto card">
            <h2 className="text-xl font-bold mb-3">Đăng nhập</h2>
            <form onSubmit={onSubmit} className="grid gap-3">
                <input className="input" placeholder="Username" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
                <input className="input" type="password" placeholder="Password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
                <select className="input" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                    <option value="parent">Parent</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                </select>
                <button className="btn bg-secondary text-white">Login</button>
            </form>
        </div>
    )
}
import { useState } from 'react'
import http from '../../../libs/http'
import useAuthStore from '../../../store/authStore'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' })
    const [err, setErr] = useState('')
    const { login } = useAuthStore()
    const navigate = useNavigate()


    const onSubmit = async (e) => {
        e.preventDefault(); setErr('')
        try {
            const { data } = await http.post('/auth/login', form)
            localStorage.setItem('token', data.accessToken)
            await login({ username: data.user.username, role: data.user.role })
            navigate('/parent', { replace: true })  // or redirect by role (important)
        } catch (e) { setErr(e?.response?.data?.message || e.message) }
    }
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
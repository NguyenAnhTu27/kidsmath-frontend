import { useState } from 'react'
export default function Register() {
    const [form, setForm] = useState({ fullname: '', phone: '', email: '', username: '', password: '' })
    const onSubmit = (e) => { e.preventDefault(); alert('Registered (mock)') }
    return (
        <div className="max-w-md mx-auto card">
            <h2 className="text-xl font-bold mb-3">Đăng ký (Parent)</h2>
            <form onSubmit={onSubmit} className="grid gap-3">
                <input className="input" placeholder="Họ tên phụ huynh" value={form.fullname} onChange={e => setForm(f => ({ ...f, fullname: e.target.value }))} />
                <input className="input" placeholder="Số điện thoại" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                <input className="input" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                <input className="input" placeholder="Username" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
                <input className="input" type="password" placeholder="Password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
                <button className="btn bg-secondary text-white">Đăng ký</button>
            </form>
        </div>
    )
}
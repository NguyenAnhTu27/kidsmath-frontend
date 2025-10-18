import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import http from '../../../libs/http'
import { Mail, User, Phone, Lock, Eye, EyeOff } from 'lucide-react'

export default function Register() {
    const [form, setForm] = useState({
        fullname: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        confirm: '',
    })
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleInputChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };


    const onSubmit = async (e) => {
        e.preventDefault()
        setErr('')
        if (form.password !== form.confirm) {
            setErr('Mật khẩu xác nhận không khớp.')
            return
        }
        setLoading(true)
        try {
            await http.post('/auth/register', {
                fullName: form.fullname,
                phone: form.phone,
                email: form.email,
                username: form.username,
                password: form.password,
                role: 'parent',
            })
            // thông báo nhẹ + điều hướng
            navigate('/login', { replace: true })
        } catch (e) {
            setErr(e?.response?.data?.message || e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">


            <div className="flex items-center justify-center px-4 pb-12">
                <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 items-center">
                    {/* Hình minh hoạ (ẩn ở mobile) */}
                    <div className="hidden md:block">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1525829528215-ffae12a76ac8?q=80&w=1080&auto=format&fit=crop"
                                alt="Đăng ký tài khoản phụ huynh"
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg animate-bounce">
                                <div className="text-2xl">🎉</div>
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg animate-bounce [animation-delay:300ms]">
                                <div className="text-2xl">🧮</div>
                            </div>
                        </div>
                    </div>

                    {/* Card form */}
                    <div className="w-full max-w-md mx-auto pt-5">

                        <div className="border-0 bg-white rounded-2xl shadow-xl">
                            <div className="px-6 pt-6 text-center space-y-1">
                                <h2 className="text-2xl font-semibold">Tạo tài khoản phụ huynh</h2>
                                <p className="text-gray-500">Quản lý khóa học và theo dõi tiến độ học tập của con</p>
                            </div>

                            <div className="px-6 py-6">
                                {/* Error banner */}
                                {err && (
                                    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-sm">
                                        {err}
                                    </div>
                                )}

                                <form onSubmit={onSubmit} className="space-y-4">
                                    {/* Họ tên */}
                                    <FormRow
                                        id="fullname"
                                        label="Họ và tên phụ huynh"
                                        icon={<User className="w-5 h-5" />}
                                    >
                                        <input
                                            id="fullname"
                                            type="text"
                                            value={form.fullname}
                                            onChange={(e) => setForm((f) => ({ ...f, fullname: e.target.value }))}
                                            placeholder="VD: Nguyễn Văn A"
                                            required
                                            className={inputClass}
                                        />
                                    </FormRow>

                                    {/* SĐT */}
                                    <FormRow id="phone" label="Số điện thoại" icon={<Phone className="w-5 h-5" />}>
                                        <input
                                            id="phone"
                                            type="tel"
                                            value={form.phone}
                                            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                                            placeholder="VD: 090xxxxxxx"
                                            required
                                            className={inputClass}
                                        />
                                    </FormRow>

                                    {/* Email */}
                                    <FormRow id="email" label="Email" icon={<Mail className="w-5 h-5" />}>
                                        <input
                                            id="email"
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                            placeholder="Nhập email của bạn"
                                            required
                                            className={inputClass}
                                        />
                                    </FormRow>

                                    {/* Username */}
                                    <FormRow id="username" label="Username" icon={<User className="w-5 h-5" />}>
                                        <input
                                            id="username"
                                            type="text"
                                            value={form.username}
                                            onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                                            placeholder="Tên đăng nhập"
                                            required
                                            className={inputClass}
                                        />
                                    </FormRow>


                                    <div className="space-y-2">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Mật khẩu
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Tạo mật khẩu"
                                                value={form.password}
                                                onChange={(e) => handleInputChange("password", e.target.value)}
                                                className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-gray-300 
                       text-gray-800 placeholder-gray-400 bg-white
                       shadow-sm hover:border-blue-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
                       transition duration-200 ease-in-out"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="space-y-2">
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                            Xác nhận mật khẩu
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                                            <input
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Nhập lại mật khẩu"
                                                value={form.confirmPassword}
                                                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                                className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-gray-300 
                       text-gray-800 placeholder-gray-400 bg-white
                       shadow-sm hover:border-blue-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
                       transition duration-200 ease-in-out"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Terms */}
                                    <div className="flex items-start gap-2">
                                        <input id="terms" type="checkbox" required className="mt-1 rounded border-gray-300" />
                                        <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                                            Tôi đồng ý với{' '}
                                            <a href="#" className="text-blue-600 hover:text-blue-800">Điều khoản sử dụng</a> và{' '}
                                            <a href="#" className="text-blue-600 hover:text-blue-800">Chính sách bảo mật</a>.
                                        </label>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full inline-flex items-center justify-center rounded-lg px-4 py-2.5 font-semibold text-white
                               bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500/60
                               transition disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
                                    </button>
                                </form>

                                {/* Footer nhỏ */}
                                <div className="text-center text-sm text-gray-600 mt-4">
                                    Đã có tài khoản?{' '}
                                    <button
                                        type="button"
                                        onClick={() => navigate('/login')}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Đăng nhập ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* /Card */}
                    </div>
                </div>
            </div >
        </div >
    )
}

/* ---- Sub components & styles ---- */

function FormRow({ id, label, icon, children }) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    {icon}
                </span>
                {children}
            </div>
        </div>
    )
}

const inputClass =
    'w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 ' +
    'shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition'

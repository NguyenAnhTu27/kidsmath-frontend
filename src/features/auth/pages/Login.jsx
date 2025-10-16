import { useState } from 'react'
import http from '../../../libs/http'
import useAuthStore from '../../../store/authStore'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft, Mail, Lock, UserCheck, Shield } from 'lucide-react'

export default function Login() {
    const [loginType, setLoginType] = useState('student') // 'student' | 'admin' | 'parent' | 'teacher'
    const [showPassword, setShowPassword] = useState(false)
    const [form, setForm] = useState({ username: '', password: '' })
    const [isLoading, setIsLoading] = useState(false)
    const [err, setErr] = useState('')

    const { login } = useAuthStore()
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        setErr('')
        setIsLoading(true)
        try {
            const { data } = await http.post('/auth/login', {
                username: form.username,
                password: form.password,
                // loginType ở đây chỉ dùng cho UI; backend mock hiện không cần gửi.
            })
            localStorage.setItem('token', data.accessToken)
            await login({ username: data.user.username, role: data.user.role })

            // Điều hướng theo role BE trả về (ưu tiên), fallback theo lựa chọn UI
            const role = data?.user?.role || loginType
            if (role === 'admin') navigate('/admin', { replace: true })
            else if (role === 'teacher') navigate('/teacher', { replace: true })
            else if (role === 'parent') navigate('/parent', { replace: true })
            else navigate('/student', { replace: true })
        } catch (e) {
            setErr(e?.response?.data?.message || e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* Header: back home */}


            <div className="flex items-center justify-center px-4 pb-12">
                <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Illustration */}
                    <div className="hidden lg:block">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1525829528215-ffae12a76ac8?q=80&w=1080&auto=format&fit=crop"
                                alt="Học sinh đăng nhập"
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg animate-bounce">
                                <div className="text-2xl">🎓</div>
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg animate-bounce [animation-delay:300ms]">
                                <div className="text-2xl">📚</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Login Card */}
                    <div className="w-full max-w-md mx-auto">
                        {/* Logo */}


                        {/* Role selector */}
                        <div className="flex mb-6 p-1 bg-gray-100 rounded-lg">
                            {[
                                { key: 'student', label: 'Học sinh', icon: <UserCheck className="w-4 h-4" /> },
                                { key: 'admin', label: 'Quản trị', icon: <Shield className="w-4 h-4" /> },
                                { key: 'parent', label: 'Phụ huynh', icon: <Shield className="w-4 h-4" /> },
                                { key: 'teacher', label: 'Giáo viên', icon: <Shield className="w-4 h-4" /> },
                            ].map((r) => (
                                <button
                                    key={r.key}
                                    type="button"
                                    onClick={() => setLoginType(r.key)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all ${loginType === r.key
                                        ? 'bg-white shadow-sm text-blue-600'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    {r.icon}
                                    <span>{r.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Card */}
                        <div className="border-0 shadow-xl bg-white rounded-2xl">
                            <div className="text-center space-y-1 px-6 pt-6">
                                <h2 className="text-2xl font-semibold">
                                    {loginType === 'admin' ? 'Đăng nhập quản trị' : 'Chào mừng trở lại!'}
                                </h2>
                                <p className="text-gray-500">
                                    {loginType === 'admin'
                                        ? 'Đăng nhập để tiếp tục hành trình học toán'
                                        : 'Đăng nhập để tiếp tục hành trình học toán'}
                                </p>
                            </div>

                            <div className="px-6 py-6 space-y-5">
                                {/* Error */}
                                {err && (
                                    <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-sm">
                                        {err}
                                    </div>
                                )}

                                <form onSubmit={onSubmit} className="space-y-4">
                                    {/* Username (hoặc Email nếu backend dùng email) */}
                                    <div className="space-y-2">
                                        <label htmlFor="username" className="text-sm font-medium text-gray-700">
                                            Tên đăng nhập
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                id="username"
                                                type="text"
                                                placeholder="Nhập tên đăng nhập"
                                                value={form.username}
                                                onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                                                className="pl-10 w-full px-3 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-2">
                                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                            Mật khẩu
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Nhập mật khẩu"
                                                value={form.password}
                                                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                                                className="pl-10 pr-10 w-full px-3 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((v) => !v)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                aria-label="Toggle password"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Options */}
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 text-sm">
                                            <input type="checkbox" className="rounded border-gray-300" />
                                            <span className="text-gray-600">Ghi nhớ đăng nhập</span>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => navigate('/forgot-password')}
                                            className="text-sm text-blue-600 hover:text-blue-800"
                                        >
                                            Quên mật khẩu?
                                        </button>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full inline-flex items-center justify-center rounded-lg px-4 py-2.5 font-semibold text-white
                               bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500/60
                               transition disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                                    </button>
                                </form>

                                {/* Separator */}
                                <div className="relative my-2">
                                    <div className="h-px bg-gray-200" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="bg-white px-2 text-xs text-gray-500">HOẶC</span>
                                    </div>
                                </div>

                                {/* Social login demo */}
                                <button
                                    type="button"
                                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 bg-white hover:bg-gray-50 transition"
                                >
                                    {/* Google icon simplified */}
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Đăng nhập với Google
                                </button>

                                <div className="text-center text-sm text-gray-600">
                                    Chưa có tài khoản?{' '}
                                    <button
                                        onClick={() => navigate('/register')}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Đăng ký ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* /Card */}
                    </div>
                </div>
            </div>
        </div>
    )
}

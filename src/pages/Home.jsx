export default function Home() {
    return (
        <div className="grid gap-6 md:grid-cols-2 items-center">
            <div>
                <h1 className="text-4xl font-black">KidsMath</h1>
                <p className="text-gray-600 mt-3">Học Toán vui như chơi – dành cho học sinh tiểu học.</p>
                <div className="mt-6 flex gap-3">
                    <a className="btn bg-primary text-white" href="/register">Bắt đầu</a>
                    <a className="btn bg-white border" href="/login">Đăng nhập</a>
                </div>
            </div>
            <div className="card">Danh mục: Cộng/Trừ, Nhân/Chia, Hình học, Đo lường...</div>
        </div>
    )
}
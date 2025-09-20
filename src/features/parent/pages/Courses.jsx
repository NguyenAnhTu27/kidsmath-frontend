export default function Courses() {
    const list = [
        { id: 'c1', title: 'Cộng trong phạm vi 100' },
        { id: 'c2', title: 'Bảng cửu chương 2-5' },
    ]
    return (
        <div className="grid gap-3">
            <h2 className="text-xl font-bold">Courses</h2>
            <div className="grid md:grid-cols-2 gap-3">
                {list.map(c => (
                    <div key={c.id} className="card flex items-center justify-between">
                        <div>{c.title}</div>
                        <a href="/parent/purchase" className="btn bg-primary text-white">Mua</a>
                    </div>
                ))}
            </div>
        </div>
    )
}
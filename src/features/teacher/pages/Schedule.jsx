export default function Schedule() {
    const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    return (
        <div className="grid gap-3">
            <h2 className="text-xl font-bold">Lịch dạy trong tuần</h2>
            <div className="grid md:grid-cols-5 gap-3">
                {week.map(d => <div key={d} className="card h-40">{d}</div>)}
            </div>
        </div>
    )
}
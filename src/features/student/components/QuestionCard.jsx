export default function QuestionCard({ q, choices, onChoose }) {
    return (
        <div className="card">
            <div className="text-xl font-black mb-3">{q}</div>
            <div className="grid gap-2">
                {choices.map((c) => (
                    <button key={c} className="btn bg-accent" onClick={() => onChoose(c)}>{c}</button>
                ))}
            </div>
        </div>
    )
}
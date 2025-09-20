import { useParams, Link } from 'react-router-dom'
export default function LearnChapter() {
    const { chapterId } = useParams()
    return (
        <div className="grid gap-3">
            <div className="card">Nội dung chương {chapterId} (lesson 1...n)</div>
            <Link to={`/student/quiz/${chapterId}`} className="btn bg-secondary text-white w-fit">Làm Quiz</Link>
        </div>
    )
}
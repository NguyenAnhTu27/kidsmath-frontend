import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import useEnergyStore from '../../../store/energyStore'
import QuestionCard from '../components/QuestionCard'


const sample = [
    { id: nanoid(), q: '7 + 5 = ?', choices: ['10', '11', '12', '13'], ans: '12' },
    { id: nanoid(), q: '9 − 4 = ?', choices: ['4', '5', '6', '7'], ans: '5' },
]


export default function Quiz() {
    const { chapterId } = useParams()
    const { energy, spend } = useEnergyStore()
    const [idx, setIdx] = useState(0)
    const [correct, setCorrect] = useState(0)
    const cur = sample[idx]


    useEffect(() => {
        if (energy <= 0) alert('Hết năng lượng! Hãy đợi hồi 20 phút mỗi năng lượng.')
    }, [energy])


    const choose = (c) => {
        if (energy <= 0) return
        spend(1) // mỗi câu tốn 1 năng lượng
        if (c === cur.ans) setCorrect(v => v + 1)
        if (idx < sample.length - 1) setIdx(i => i + 1)
        else alert(`Hoàn thành chương ${chapterId}! Điểm: ${correct + (c === cur.ans ? 1 : 0)}/${sample.length}`)
    }


    return (
        <div className="max-w-xl mx-auto grid gap-3">
            <div className="card">Năng lượng còn lại: {energy}</div>
            <QuestionCard q={cur.q} choices={cur.choices} onChoose={choose} />
        </div>
    )
}
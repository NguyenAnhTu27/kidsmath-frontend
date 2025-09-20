import useEnergyStore from '../../../store/energyStore'
import { useEffect } from 'react'
export default function StudentDashboard() {
    const { energy, level, recoverTick } = useEnergyStore()
    useEffect(() => {
        const t = setInterval(recoverTick, 60 * 1000)
        return () => clearInterval(t)
    }, [recoverTick])
    return (
        <div className="card">
            <div className="font-bold">Student Dashboard</div>
            <div>Năng lượng: {energy} | Cấp: {level}</div>
        </div>
    )
}
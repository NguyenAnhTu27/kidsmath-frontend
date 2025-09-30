import http from '../../../libs/http'
import { useState } from 'react'


export default function Purchase() {
    const [loading, setLoading] = useState(false)
    const createCheckout = async () => {
        setLoading(true)
        try {
            const { data } = await http.post('/payments/checkout', {
                courseId: 'course_101', method: 'momo',
                returnUrl: window.location.origin + '/parent/purchase?status=return',
                cancelUrl: window.location.origin + '/parent/purchase?status=cancel',
            })
            window.location.href = data.redirectUrl
        } finally { setLoading(false) }
    }
    return (
        <div className="card">
            <div>Thanh toán khoá học demo</div>
            <button className="btn bg-primary text-white" onClick={createCheckout} disabled={loading}>
                {loading ? 'Đang tạo đơn...' : 'Thanh toán'}
            </button>
        </div>
    )
}
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
// import Navbar from '../components/ui/Navbar'
import LeftPicture from '../assets/leftMath.png'
import { motion } from "framer-motion";
import FloatingMathBG from "../components/ui/FloatingMathBG";
// 
import { useNavigate } from 'react-router-dom'


const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
};
export default function Home() {
    // const navigate = useNavigate()
    const [loginType, setLoginType] = useState('student') // 'student' | 'admin' | 'parent' | 'teacher'

    return (


        <div>
            <div className="relative">
                {/* anh deep background */}
                <DecorBG />

                {/* NỀN PHÉP TÍNH NỔI */}
                <FloatingMathBG />

                <section className="relative max-w-7xl mx-auto px-4 py-10 md:py-14 overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">

                        {/* Hình minh hoạ bên trái (animated nhẹ) */}
                        <motion.div
                            className="w-full md:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <img
                                src={LeftPicture}
                                alt="Minh hoạ học toán"
                            />
                        </motion.div>

                        {/* Nội dung bên phải */}
                        <div className="w-full md:w-1/2">
                            <motion.h1
                                className="text-3xl md:text-3xl lg:text-3xl font-extrabold tracking-tight text-[#033187] leading-tight md:leading-[1.1] [text-wrap:balance]"
                                variants={fadeUp}
                                initial="initial"
                                animate="animate"
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                Học Toán vui như chơi — dành cho học sinh tiểu học.
                            </motion.h1>

                            <motion.p
                                className="mt-4 md:mt-6 text-base md:text-lg text-gray-600 leading-relaxed"
                                variants={fadeUp}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
                            >
                                Chúng tôi là một tổ chức phi lợi nhuận với sứ mệnh cung cấp nền giáo dục
                                miễn phí, đẳng cấp thế giới cho bất kỳ ai, ở bất kỳ đâu.
                            </motion.p>

                            {/* Button group (hover nhích + mount-in) */}
                            <motion.div
                                className="mt-6 md:mt-8 flex flex-wrap gap-3 md:gap-4"
                                variants={fadeUp}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                            >
                                <NavLink to="/login?type=student" state={{ preselect: 'student' }}>
                                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                                        <CTAButton>Người học</CTAButton>
                                    </motion.div>
                                </NavLink>
                                <NavLink to="/login?type=teacher" state={{ preselect: 'teacher' }}>
                                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                                        <CTAButton variant="outline">Giáo viên</CTAButton>
                                    </motion.div>
                                </NavLink>
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <NavLink to="/login?type=parent" state={{ preselect: 'parent' }}>
                                        <CTAButton variant="soft">Cha mẹ</CTAButton>
                                    </NavLink>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div >
        </div >
    )
}

/* Button đẹp hơn: 3 biến thể – solid (mặc định), outline, soft */
function CTAButton({ children, variant = 'solid', className = '', ...props }) {
    const base =
        'inline-flex items-center justify-center rounded-full px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
    const styles = {
        solid:
            'bg-gradient-to-r from-[#1865F2] to-[#0f49c9] text-white shadow-md hover:shadow-lg hover:brightness-110 focus-visible:ring-[#1865F2]/60',
        outline:
            'border border-[#1865F2] text-[#1865F2] bg-white hover:bg-[#1865F2]/10 focus-visible:ring-[#1865F2]/40',
        soft:
            'bg-[#1865F2]/10 text-[#1865F2] hover:bg-[#1865F2]/20 focus-visible:ring-[#1865F2]/30',
    }
    return (
        <button className={`${base} ${styles[variant]} ${className}`} {...props}>
            {children}
        </button>
    )
}
function DecorBG() {
    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
            {/* Vệt gradient mềm ở xa (đằng sau hết) */}
            <div className="absolute -left-28 -top-24 h-80 w-80 rounded-full bg-gradient-to-br from-amber-200 to-pink-200 opacity-70 blur-3xl" />
            <div className="absolute -right-32 top-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-200 to-sky-200 opacity-70 blur-3xl" />


            {/* Ảnh “ẩn ở sâu” (máy tính/compass/etc) */}
            <img
                src="https://lms.emg.edu.vn/pluginfile.php/1/theme_emgelementary/math_backgroundimg/0/math_bg.jpg"
            />
            {/* Mask fade để cạnh ảnh chìm mượt */}
            <div className="absolute inset-0 bg-white/0 [mask-image:radial-gradient(60%_60%_at_80%_20%,black,transparent_70%)]" />
        </div>
    )
}
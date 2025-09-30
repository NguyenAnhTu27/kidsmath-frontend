import { Link } from "react-router-dom"
import { useState } from "react"
import useAuthStore from "../../store/authStore"
import { motion, AnimatePresence } from "framer-motion"

const MotionLink = motion(Link)

const fadeDown = {
    initial: { y: -12, opacity: 0 },
    animate: { y: 0, opacity: 1 },
}

export default function Navbar() {
    const { user, logout } = useAuthStore()
    const [search, setSearch] = useState("")

    return (
        <motion.header
            className="shadow-sm sticky top-0 z-50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="backdrop-blur border-b">
                <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between gap-6">

                    {/* Logo + Brand */}
                    <motion.div
                        className="flex items-center cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex-shrink-0">
                            <motion.div whileHover={{ rotate: 5 }} transition={{ duration: 0.2 }}>
                                <div className="w-12 h-12 bg-[#1865F2] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
                                    {/* icon giữ nguyên */}
                                    <svg width="24" height="24" viewBox="0 0 24 24" className="text-white" fill="none">
                                        <path d="M12 3L1 9L12 15L21 9V16H23V9L12 3Z" fill="currentColor" />
                                        <path d="M5 13.18V17.18C5 17.97 5.53 18.71 6.26 19.03C7.84 19.81 9.84 20.18 12 20.18C14.16 20.18 16.16 19.81 17.74 19.03C18.47 18.71 19 17.97 19 17.18V13.18L12 17L5 13.18Z" fill="currentColor" />
                                    </svg>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            className="ml-3"
                            variants={fadeDown}
                            initial="initial"
                            animate="animate"
                            transition={{ duration: 0.35 }}
                        >
                            <Link
                                to="/"
                                className="font-bold text-2xl text-[#033187] hover:text-[#1865F2] transition-colors duration-300"
                            >
                                M5G Education
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Search box */}
                    <motion.div
                        className="flex-1 flex justify-center"
                        variants={fadeDown}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.05, duration: 0.35 }}
                    >
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>

                            <motion.input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Tìm khóa học..."
                                className="pl-10 w-40 md:w-56 lg:w-72 px-3 py-2 border border-gray-300 rounded-full focus:w-96 transition-all duration-500 ease-in-out outline-none shadow-sm focus:shadow-md"
                                whileFocus={{ boxShadow: "0 6px 20px rgba(24,101,242,0.15)" }}
                            />
                        </div>
                    </motion.div>

                    {/* Auth */}
                    <AnimatePresence initial={false} mode="wait">
                        {!user ? (
                            <motion.nav
                                key="guest"
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                className="flex items-center gap-4"
                            >
                                <MotionLink
                                    to="/login"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn hover:text-[#1865F2] transition"
                                >
                                    Đăng nhập
                                </MotionLink>

                                <MotionLink
                                    to="/register"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn bg-[#1865F2] text-white hover:bg-[#033187] transition-colors"
                                >
                                    Đăng ký
                                </MotionLink>
                            </motion.nav>
                        ) : (
                            <motion.nav
                                key="user"
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                className="flex items-center gap-4"
                            >
                                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-gray-600">
                                    {user.role}: {user.username}
                                </motion.span>
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn hover:bg-gray-100 transition"
                                    onClick={logout}
                                >
                                    Logout
                                </motion.button>
                            </motion.nav>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </motion.header>
    )
}

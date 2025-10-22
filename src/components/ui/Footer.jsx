import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1, y: 0,
        transition: { duration: 0.5, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.08 }
    },
};

const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const linkHover = { y: -2 };
const iconHover = { scale: 1.1, rotate: 2 };

export function Footer() {
    return (
        <motion.footer
            className="bg-[#011947] text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 "
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <motion.div className="space-y-4" variants={item}>
                        <motion.div className="flex items-center gap-3" variants={item}>
                            <motion.div
                                className="w-12 h-12 bg-[#1865F2] rounded-full flex items-center justify-center shadow-lg"
                                whileHover={{ scale: 1.06, rotate: 3 }}
                                transition={{ type: "spring", stiffness: 220, damping: 16 }}
                            >
                                {/* Graduation cap icon */}
                                <svg width="24" height="24" viewBox="0 0 24 24" className="text-white" fill="none">
                                    <path d="M12 3L1 9L12 15L21 9V16H23V9L12 3Z" fill="currentColor" />
                                    <path d="M5 13.18V17.18C5 17.97 5.53 18.71 6.26 19.03C7.84 19.81 9.84 20.18 12 20.18C14.16 20.18 16.16 19.81 17.74 19.03C18.47 18.71 19 17.97 19 17.18V13.18L12 17L5 13.18Z" fill="currentColor" />
                                </svg>
                            </motion.div>
                            <motion.div whileHover={linkHover}>
                                <Link
                                    to="/"
                                    className="font-bold text-2xl text-[#1865F2] hover:text-[#1865F2] transition-colors duration-300"
                                >
                                    M5G Education
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.p className="text-gray-400 leading-relaxed" variants={item}>
                            Ứng dụng học toán hàng đầu dành cho học sinh tiểu học.
                            Biến việc học toán thành trò chơi thú vị và hiệu quả.
                        </motion.p>

                        <motion.div className="flex space-x-4" variants={item}>
                            <motion.a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" whileHover={iconHover} whileTap={{ scale: 0.96 }}>
                                <Facebook className="w-5 h-5" />
                            </motion.a>
                            <motion.a href="#" className="text-gray-400 hover:text-pink-400 transition-colors" whileHover={iconHover} whileTap={{ scale: 0.96 }}>
                                <Instagram className="w-5 h-5" />
                            </motion.a>
                            <motion.a href="#" className="text-gray-400 hover:text-red-400 transition-colors" whileHover={iconHover} whileTap={{ scale: 0.96 }}>
                                <Youtube className="w-5 h-5" />
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    {/* Product */}
                    <motion.div variants={item}>
                        <h4 className="font-bold mb-4">Sản phẩm</h4>
                        <ul className="space-y-3">
                            {["Khóa học", "Bài tập", "Trò chơi", "Báo cáo tiến độ", "Ứng dụng mobile"].map((t) => (
                                <motion.li key={t} variants={item}>
                                    <motion.a href="#" className="text-gray-400 hover:text-white transition-colors" whileHover={linkHover}>
                                        {t}
                                    </motion.a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Support */}
                    <motion.div variants={item}>
                        <h4 className="font-bold mb-4">Hỗ trợ</h4>
                        <ul className="space-y-3">
                            {["Trung tâm trợ giúp", "Hướng dẫn sử dụng", "Câu hỏi thường gặp", "Liên hệ", "Báo lỗi"].map((t) => (
                                <motion.li key={t} variants={item}>
                                    <motion.a href="#" className="text-gray-400 hover:text-white transition-colors" whileHover={linkHover}>
                                        {t}
                                    </motion.a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div variants={item}>
                        <h4 className="font-bold mb-4">Liên hệ</h4>
                        <motion.div className="space-y-3" variants={container}>
                            <motion.div className="flex items-center space-x-3" variants={item}>
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-400">support@M5G.vn</span>
                            </motion.div>
                            <motion.div className="flex items-center space-x-3" variants={item}>
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-400">1900-123-456</span>
                            </motion.div>
                            <motion.div className="flex items-start space-x-3" variants={item}>
                                <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                                <span className="text-gray-400">
                                    123 Đường ABC, Quận 1<br />
                                    TP. Hồ Chí Minh, Việt Nam
                                </span>
                            </motion.div>
                        </motion.div>

                        {/* Newsletter */}
                        <motion.div className="mt-6" variants={item}>
                            <h5 className="font-medium mb-3">Nhận tin tức mới nhất</h5>
                            <div className="flex">
                                <motion.input
                                    type="email"
                                    placeholder="Email của bạn"
                                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-blue-500 text-sm"
                                    whileFocus={{ boxShadow: "0 0 0 3px rgba(24,101,242,0.25)" }}
                                />
                                <motion.button
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <Mail className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom */}
                <motion.div
                    className="border-t border-gray-800 mt-12 pt-8"
                    variants={item}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <motion.p className="text-gray-400 text-sm" variants={item}>
                            © 2024 M5G Education. Tất cả quyền được bảo lưu.
                        </motion.p>
                        <motion.div className="flex space-x-6 text-sm" variants={container}>
                            {["Điều khoản sử dụng", "Chính sách bảo mật", "Cookie"].map((t) => (
                                <motion.a
                                    key={t}
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                    variants={item}
                                    whileHover={linkHover}
                                >
                                    {t}
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.footer>
    );
}

// src/components/FloatingMathBG.jsx
import { motion } from "framer-motion";

export default function FloatingMathBG() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* + */}
            <motion.div
                className="absolute top-10 left-6 text-4xl opacity-20"
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                ➕
            </motion.div>

            {/* − */}
            <motion.div
                className="absolute top-40 right-10 text-3xl opacity-20"
                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                ➖
            </motion.div>

            {/* × */}
            <motion.div
                className="absolute bottom-36 left-12 text-5xl opacity-20"
                animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
                ✖️
            </motion.div>

            {/* ÷ */}
            <motion.div
                className="absolute bottom-10 right-6 text-4xl opacity-20"
                animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
                ➗
            </motion.div>
        </div>
    );
}

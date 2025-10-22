import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { to: "/parent", label: "Dashboard" },
    { to: "/parent/courses", label: "Courses" },
    { to: "/parent/purchase", label: "Purchase" },
    { to: "/parent/assign", label: "Assign" },
    { to: "/parent/progress", label: "Progress" },
];

const sidebarVariants = {
    open: {
        x: 0,
        opacity: 1,
        transition: { stiffness: 120 },
    },
    closed: {
        x: "-100%",
        opacity: 0,
        transition: { stiffness: 120 },
    },
};

const itemVariants = {
    hidden: { x: -8, opacity: 0 },
    visible: (i) => ({ x: 0, opacity: 1, transition: { delay: i * 0.05 } }),
};

export default function ParentLayout() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinkClass = ({ isActive }) =>
        [
            "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
            isActive
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100/60 hover:backdrop-blur-sm",
        ].join(" ");

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800">
            <section className="relative max-w-7xl mx-auto px-4 py-7 md:py-10 overflow-visible">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">

                        <div>
                            <h1 className="text-lg md:text-2xl font-bold tracking-tight">Parent Portal</h1>
                            <p className="text-xs text-gray-500">Manage courses & monitor progress</p>
                        </div>
                    </div>

                    {/* Mobile menu toggle */}
                    <div className="md:hidden">
                        <button
                            aria-label="Toggle menu"
                            onClick={() => setIsOpen((v) => !v)}
                            className="p-2 rounded-md bg-white/80 shadow-sm hover:scale-105 active:scale-100 transition-transform"
                        >
                            {isOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-10 md:gap-14">
                    <div className="grid gap-9 md:grid-cols-[220px_1fr] w-full">
                        {/* Sidebar for md+ */}
                        <aside className="hidden md:block">
                            <motion.nav
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="card h-fit sticky top-6 p-4 bg-white/70 backdrop-blur rounded-xl shadow-md border border-gray-100"
                            >
                                <ul className="flex flex-col gap-2">
                                    {navItems.map((nav, idx) => (
                                        <motion.li key={nav.to} custom={idx} initial="hidden" animate="visible" variants={itemVariants}>
                                            <NavLink to={nav.to} className={navLinkClass}>
                                                {nav.label}
                                            </NavLink>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.nav>
                        </aside>

                        {/* Mobile sidebar (overlay) */}
                        <AnimatePresence>
                            {isOpen && (
                                <motion.aside
                                    className="md:hidden fixed inset-0 z-40"
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    variants={sidebarVariants}
                                >
                                    {/* backdrop */}
                                    <motion.div
                                        className="absolute inset-0 bg-black/40"
                                        onClick={() => setIsOpen(false)}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                    <motion.div
                                        className="relative w-72 max-w-full h-full bg-white/95 backdrop-blur-lg shadow-xl p-5"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: 0 }}
                                        exit={{ x: "-100%" }}
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-9 h-9 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-sm">🧮</div>
                                                <div>
                                                    <p className="text-sm font-semibold">Parent Portal</p>
                                                    <p className="text-xs text-gray-500">Quick navigation</p>
                                                </div>
                                            </div>
                                            <button
                                                aria-label="Close"
                                                onClick={() => setIsOpen(false)}
                                                className="p-2 rounded-md hover:bg-gray-100"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                        <nav className="flex flex-col gap-2">
                                            {navItems.map((nav, idx) => (
                                                <motion.div key={nav.to} custom={idx} initial="hidden" animate="visible" variants={itemVariants}>
                                                    <NavLink
                                                        to={nav.to}
                                                        onClick={() => setIsOpen(false)}
                                                        className={({ isActive }) =>
                                                            [
                                                                "block px-3 py-2 rounded-md text-sm font-medium transition-all duration-150",
                                                                isActive
                                                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow"
                                                                    : "text-gray-700 hover:bg-gray-100/60",
                                                            ].join(" ")
                                                        }
                                                    >
                                                        {nav.label}
                                                    </NavLink>
                                                </motion.div>
                                            ))}
                                        </nav>
                                    </motion.div>
                                </motion.aside>
                            )}
                        </AnimatePresence>

                        {/* Main content area */}
                        <section className="min-w-0">
                            <motion.div
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35 }}
                                className="p-4 md:p-6 bg-white/60 backdrop-blur rounded-xl shadow-sm border border-gray-100"
                            >
                                <Outlet />
                            </motion.div>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}
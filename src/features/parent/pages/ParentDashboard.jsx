import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const initialChildren = [
    {
        id: 1,
        name: "Cong2003",
        avatar: null,
        minutes: 2,
        skillsWorked: 0,
        leveledUp: 0,
        toProf: 0,
        proficiencyText: "No skills worked on",
        recent: [
            { id: 1, title: "Phép cộng cơ bản", type: "lesson", points: 50, time: "2 giờ trước" },
            { id: 2, title: "Quiz: Bảng cửu chương", type: "quiz", points: 0, time: "Đang chờ" },
        ],
    },
];

export default function ParentDashboard() {
    const [children, setChildren] = useState(initialChildren);
    const [activeTab, setActiveTab] = useState("activity");
    const [dateRange, setDateRange] = useState("7");
    const [expandedId, setExpandedId] = useState(null);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [addStep, setAddStep] = useState(1);
    const [childName, setChildName] = useState("");
    const [childMonth, setChildMonth] = useState("");
    const [childYear, setChildYear] = useState("");
    const navigate = useNavigate();
    const closeButtonRef = useRef(null);

    useEffect(() => {
        if (isAddOpen) {
            // focus the close button for accessibility when modal opens
            closeButtonRef.current?.focus();
            // prevent page scroll while modal open
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            // reset add form when closed
            setAddStep(1);
            setChildName("");
            setChildMonth("");
            setChildYear("");
        }
    }, [isAddOpen]);

    const months = [
        { value: "01", label: "January" },
        { value: "02", label: "February" },
        { value: "03", label: "March" },
        { value: "04", label: "April" },
        { value: "05", label: "May" },
        { value: "06", label: "June" },
        { value: "07", label: "July" },
        { value: "08", label: "August" },
        { value: "09", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" },
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (_, i) => String(currentYear - i)); // last 20 years

    function handleAddChildNext() {
        // In the pictured modal the step shown is birthday. We'll require a name and birthday to proceed.
        if (!childName.trim() || !childMonth || !childYear) return;

        const newChild = {
            id: Date.now(),
            name: childName.trim(),
            avatar: null,
            minutes: 0,
            skillsWorked: 0,
            leveledUp: 0,
            toProf: 0,
            proficiencyText: "No skills worked on",
            recent: [],
            birthday: `${childYear}-${childMonth}`,
        };

        setChildren((c) => [newChild, ...c]);
        setIsAddOpen(false);
    }

    return (
        <div className="min-h-[60vh]">
            {/* Tabs */}
            <div className="border-b bg-white">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ul className="flex gap-6 text-sm">
                        <li>
                            <button
                                onClick={() => {
                                    setActiveTab("activity");
                                    navigate("/parent/");
                                }}
                                className={`py-4 inline-block ${activeTab === "activity" ? "text-blue-600 border-b-4 border-blue-600" : "text-gray-600 hover:text-gray-800"}`}
                            >
                                Activity
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    setActiveTab("assignments");
                                    navigate("/parent/assignments");
                                }}
                                className={`py-4 inline-block ${activeTab === "assignments" ? "text-blue-600 border-b-4 border-blue-600" : "text-gray-600 hover:text-gray-800"}`}
                            >
                                Assignments
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    setActiveTab("settings");
                                    navigate("/parent/settings");
                                }}
                                className={`py-4 inline-block ${activeTab === "settings" ? "text-blue-600 border-b-4 border-blue-600" : "text-gray-600 hover:text-gray-800"}`}
                            >
                                Settings
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main content */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">Your children</h2>
                        <p className="text-sm text-gray-600 mt-2">See all of your children's activity on the platform</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <label htmlFor="dateRange" className="sr-only">Date range</label>
                        <select
                            id="dateRange"
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="rounded-md border px-3 py-2 text-sm bg-white shadow-sm"
                        >
                            <option value="7">Last 7 days</option>
                            <option value="30">Last 30 days</option>
                            <option value="90">Last 90 days</option>
                            <option value="all">All time</option>
                        </select>

                        <button
                            type="button"
                            onClick={() => setIsAddOpen(true)}
                            className="ml-2 inline-flex items-center px-4 py-2 border rounded-md text-sm text-blue-600 bg-white hover:bg-blue-50 shadow-sm"
                        >
                            Add a child
                        </button>
                    </div>
                </div>

                {/* Table Header / Legend */}
                <div className="mt-8 bg-white rounded-md border shadow-sm overflow-hidden">
                    <div className="px-4 py-4 border-b">
                        <div className="">
                            <div className="text-xs text-gray-600 flex justify-center pl-56 gap-3">
                                <span className="flex items-center gap-1">
                                    <span className="h-2 w-2 rounded-full bg-blue-400 inline-block" aria-hidden="true" />
                                    <span className="text-gray-700">Learning minutes</span>
                                </span>

                                <span className="flex items-center gap-1">
                                    <span className="h-2 w-2 rounded-full bg-green-400 inline-block" aria-hidden="true" />
                                    <span className="text-gray-700">Skills worked on</span>
                                </span>

                                <span className="flex items-center gap-1">
                                    <span className="h-2 w-2 rounded-full bg-indigo-400 inline-block" aria-hidden="true" />
                                    <span className="text-gray-700">Skills leveled up</span>
                                </span>

                                <span className="flex items-center gap-1">
                                    <span className="h-2 w-2 rounded-full bg-purple-400 inline-block" aria-hidden="true" />
                                    <span className="text-gray-700">Skills to Prof+</span>
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Table rows */}
                    <div className="px-4 py-4">
                        <div className="divide-y">
                            {initialChildren.map((child) => {
                                const isOpen = expandedId === child.id;
                                return (
                                    <div key={child.id} className="py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => setExpandedId(isOpen ? null : child.id)}
                                                    aria-expanded={isOpen}
                                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                                >
                                                    <svg className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-90" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M6 4l6 6-6 6V4z" clipRule="evenodd" />
                                                    </svg>
                                                </button>

                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                                                        {child.avatar ? (
                                                            <img src={child.avatar} alt={child.name} className="w-10 h-10 rounded-full object-cover" />
                                                        ) : (
                                                            child.name.charAt(0).toUpperCase()
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-sm font-medium text-gray-900">{child.name}</h3>
                                                            <span className="text-xs text-gray-500">👤</span>
                                                        </div>
                                                        <p className="text-xs text-gray-500">See individual reports by expanding</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="hidden sm:flex items-center gap-6 text-sm text-gray-700">
                                                <div className="text-center min-w-[48px]">
                                                    <div className="font-medium">{child.minutes}</div>
                                                    <div className="text-xs text-gray-500">Total</div>
                                                    <div className="text-xs text-gray-400">learning min</div>
                                                </div>

                                                <div className="text-center min-w-[48px]">
                                                    <div className="font-medium">{child.skillsWorked}</div>
                                                    <div className="text-xs text-gray-500">Total</div>
                                                    <div className="text-xs text-gray-400">skills</div>
                                                </div>

                                                <div className="text-center min-w-[48px]">
                                                    <div className="font-medium">{child.leveledUp}</div>
                                                    <div className="text-xs text-gray-500">Total</div>
                                                    <div className="text-xs text-gray-400">leveled</div>
                                                </div>

                                                <div className="text-center min-w-[48px]">
                                                    <div className="font-medium">{child.toProf}</div>
                                                    <div className="text-xs text-gray-500">Total</div>
                                                    <div className="text-xs text-gray-400">to prof+</div>
                                                </div>

                                                <div className="min-w-[160px] text-right">
                                                    <div className="text-xs text-gray-500">Proficiency</div>
                                                    <div className="text-sm text-gray-700">{child.proficiencyText}</div>
                                                </div>
                                            </div>

                                            {/* Mobile compact view */}
                                            <div className="sm:hidden text-right">
                                                <div className="text-xs text-gray-500">Proficiency</div>
                                                <div className="text-sm text-gray-700">{child.proficiencyText}</div>
                                            </div>
                                        </div>

                                        {/* Expanded panel */}
                                        {isOpen && (
                                            <div className="mt-4 bg-gray-50 rounded-md p-4 border border-gray-100">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-800 mb-2">Recent activity</h4>
                                                        <ul className="space-y-2">
                                                            {child.recent.map((r) => (
                                                                <li key={r.id} className="flex items-center justify-between bg-white border rounded p-3">
                                                                    <div>
                                                                        <div className="text-sm font-medium">{r.title}</div>
                                                                        <div className="text-xs text-gray-500">{r.type} • {r.time}</div>
                                                                    </div>
                                                                    <div className="text-sm text-gray-700 font-semibold">{r.points}</div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-800 mb-2">Skill breakdown</h4>
                                                        <div className="text-xs text-gray-500 mb-2">(Placeholder chart) — integrate chart library for real visual</div>
                                                        <div className="w-full bg-white border rounded p-4">
                                                            <div className="h-24 flex items-center justify-center text-sm text-gray-400">No skills data to display</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Add Child Modal */}
                    {isAddOpen && (
                        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
                            {/* backdrop */}
                            <div
                                className="fixed inset-0 bg-black/40"
                                onClick={() => setIsAddOpen(false)}
                                aria-hidden="true"
                            />

                            <div
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="add-child-title"
                                className="relative z-50 w-full max-w-2xl bg-white rounded-md shadow-xl border"
                            >
                                <div className="flex items-start justify-between px-6 py-4 border-b">
                                    <h3 id="add-child-title" className="text-lg font-semibold text-gray-900">Add a child</h3>
                                    <button
                                        ref={closeButtonRef}
                                        onClick={() => setIsAddOpen(false)}
                                        aria-label="Close"
                                        className="text-gray-900 hover:text-gray-700 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            aria-hidden="true"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l8 8M6 14l8-8" />
                                        </svg>
                                    </button>

                                </div>

                                <div className="px-6 py-6">
                                    <p className="text-sm text-gray-700 mb-4">
                                        Let’s create an account for your child.
                                    </p>

                                    {/* Step 1: Basic info (optional) */}
                                    {addStep === 1 && (
                                        <div className="space-y-4">
                                            <label className="block text-sm font-medium text-gray-700">Child's name</label>
                                            <input
                                                type="text"
                                                value={childName}
                                                onChange={(e) => setChildName(e.target.value)}
                                                placeholder="e.g. John"
                                                className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
                                            />
                                        </div>
                                    )}

                                    {/* Step 2: Birthday */}
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Child's birthday
                                            <span className="ml-2 text-xs text-gray-400">i</span>
                                        </label>
                                        <div className="mt-3 flex items-center gap-3">
                                            <select
                                                value={childMonth}
                                                onChange={(e) => setChildMonth(e.target.value)}
                                                className="rounded-md border px-3 py-2 text-sm bg-white"
                                                aria-label="Month"
                                            >
                                                <option value="">Month</option>
                                                {months.map((m) => (
                                                    <option key={m.value} value={m.value}>{m.label}</option>
                                                ))}
                                            </select>

                                            <select
                                                value={childYear}
                                                onChange={(e) => setChildYear(e.target.value)}
                                                className="rounded-md border px-3 py-2 text-sm bg-white"
                                                aria-label="Year"
                                            >
                                                <option value="">Year</option>
                                                {years.map((y) => (
                                                    <option key={y} value={y}>{y}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between px-6 py-4 border-t">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (addStep === 1) {
                                                // cancel/back behaviour: close or do nothing — picture shows Back link to left
                                                setIsAddOpen(false);
                                            } else {
                                                setAddStep((s) => Math.max(1, s - 1));
                                            }
                                        }}
                                        className="text-blue-600 text-sm font-medium"
                                    >
                                        Back
                                    </button>

                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                // if currently step 1, move to birthday step (for illustration)
                                                setAddStep(2);
                                            }}
                                            className={`text-sm px-3 py-2 rounded-md border bg-white ${addStep === 1 ? "text-gray-700" : "hidden"}`}
                                        >
                                            Next
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleAddChildNext}
                                            disabled={!childName.trim() || !childMonth || !childYear}
                                            className={`text-sm px-4 py-2 rounded-md ${!childName.trim() || !childMonth || !childYear
                                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                : "bg-gray-800 text-white hover:bg-black"
                                                }`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div >
    );
}
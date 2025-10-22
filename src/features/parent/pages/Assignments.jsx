import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Assignments() {

    const [activeTab, setActiveTab] = useState("assignments");
    const [dateRange, setDateRange] = useState("7");
    const [expandedId, setExpandedId] = useState(null);
    const navigate = useNavigate();
    return (
        <div>
            <div className="border-b bg-white">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ul className="flex gap-6 text-sm">
                        <li>
                            <button
                                onClick={() => {
                                    setActiveTab("activity");
                                    navigate("/parent");
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
            con Assignments Page
        </div>
    )
}

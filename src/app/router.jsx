import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import ParentLayout from '../layouts/ParentLayout'
import StudentLayout from '../layouts/StudentLayout'
import TeacherLayout from '../layouts/TeacherLayout'
import AdminLayout from '../layouts/AdminLayout'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Login from '../features/auth/pages/Login'
import Register from '../features/auth/pages/Register'
import Guard from './guard'

import ParentDashboard from '../features/parent/pages/ParentDashboard'
import Courses from '../features/parent/pages/Courses'
import Purchase from '../features/parent/pages/Purchase'
import AssignCourse from '../features/parent/pages/AssignCourse'
import TrackProgress from '../features/parent/pages/TrackProgress'


import StudentDashboard from '../features/student/pages/StudentDashboard'
import LearnChapter from '../features/student/pages/LearnChapter'
import Quiz from '../features/student/pages/Quiz'


import TeacherDashboard from '../features/teacher/pages/TeacherDashboard'
import Schedule from '../features/teacher/pages/Schedule'
import Grade from '../features/teacher/pages/Grade'
import LiveChat from '../features/teacher/pages/LiveChat'


import AdminDashboard from '../features/admin/pages/AdminDashboard'
import ManageUsers from '../features/admin/pages/ManageUsers'
import Payments from '../features/admin/pages/Payments'
import Support from '../features/admin/pages/Support'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },


            {
                path: 'parent',
                element: (
                    <Guard roles={["parent"]}>
                        <ParentLayout />
                    </Guard>
                ),
                children: [
                    { index: true, element: <ParentDashboard /> },
                    { path: 'courses', element: <Courses /> },
                    { path: 'purchase', element: <Purchase /> },
                    { path: 'assign', element: <AssignCourse /> },
                    { path: 'progress', element: <TrackProgress /> },
                ],
            },


            {
                path: 'student',
                element: (
                    <Guard roles={["student"]}>
                        <StudentLayout />
                    </Guard>
                ),
                children: [
                    { index: true, element: <StudentDashboard /> },
                    { path: 'learn/:chapterId', element: <LearnChapter /> },
                    { path: 'quiz/:chapterId', element: <Quiz /> },
                ],
            },


            {
                path: 'teacher',
                element: (
                    <Guard roles={["teacher"]}>
                        <TeacherLayout />
                    </Guard>
                ),
                children: [
                    { index: true, element: <TeacherDashboard /> },
                    { path: 'schedule', element: <Schedule /> },
                    { path: 'grade', element: <Grade /> },
                    { path: 'chat', element: <LiveChat /> },
                ],
            },


            {
                path: 'admin',
                element: (
                    <Guard roles={["admin"]}>
                        <AdminLayout />
                    </Guard>
                ),
                children: [
                    { index: true, element: <AdminDashboard /> },
                    { path: 'users', element: <ManageUsers /> },
                    { path: 'payments', element: <Payments /> },
                    { path: 'support', element: <Support /> },
                ],
            },


            { path: '*', element: <NotFound /> },
        ],
    },
])
import { create } from "zustand";

const useCourseStore = create((set) => ({
  courses: [],
  chapters: {}, // courseId -> chapters[]
  progress: {}, // studentId -> { [chapterId]: { lesson: number, done: boolean } }
  setCourses: (arr) => set({ courses: arr }),
}));
export default useCourseStore;

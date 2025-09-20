export interface Lesson {
  id: string;
  title: string;
}
export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}
export interface Course {
  id: string;
  title: string;
  chapters: Chapter[];
}

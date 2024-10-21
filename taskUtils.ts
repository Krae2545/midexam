// Part 9
// taskUtils.ts

import { Task } from './task';

// ฟังก์ชันเพื่อคำนวณจำนวน task ที่ทำเสร็จ
export function calculateTotalCompletedTasks(tasks: Task[]): number {
    return tasks.reduce((count, task) => task.completed ? count + 1 : count, 0);
}

// index.ts

import { Task } from './task';
import { calculateTotalCompletedTasks } from './taskUtils';

// สร้างตัวอย่างอาเรย์ของ Task
const tasks: Task[] = [
    new Task("ออกแบบหน้าแรก", "สร้าง mockup สำหรับหน้าแรก"),
    new Task("พัฒนาฟีเจอร์ใหม่", "สร้างฟีเจอร์สำหรับผู้ใช้ใหม่"),
    new Task("ทดสอบระบบ", "ทดสอบฟีเจอร์ต่างๆ")
];

// ทำเครื่องหมายให้บาง task เสร็จ
tasks[0].markCompleted(); // ออกแบบหน้าแรก เสร็จแล้ว

// ใช้ฟังก์ชัน calculateTotalCompletedTasks
const completedTasksCount = calculateTotalCompletedTasks(tasks);
console.log("Total Completed Tasks:", completedTasksCount); // แสดงผล: 1

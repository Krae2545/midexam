# Midterm Exam Section B

// Part 1
class Task {
    private static taskCount = 0;
    title: string;
    description: string;
    completed: boolean;
// สร้าง class ปกติ
constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
    this.completed = false;
    Task.taskCount++;
}
// สร้างค่าเริ่มต้นของ class นี้โดยมี completed เป็น false ในค่าเริ้มต้นและเพิ่มค่า taskCount เพื่อนับจำนวน task
markCompleted(): void {
    this.completed = true;
}
// เป็น method ปรับค่าใน class ปกติ
updateDescription(newDescription: string): void {
    this.description = newDescription;
}
// เป็น method ปรับค่าใน class โดยใช้ parameter ที่ส่งมา
static totalTasks(): number {
    return Task.taskCount;
}
// เป็น method ส่งค่าจำนวน task ใน class ออกไปโดยตั้งเป็น static ช่วยให้คุณสามารถสร้างสมาชิกที่เป็นของคลาสโดยตรง ซึ่งมีค่าเดียวสำหรับทุกอ็อบเจกต์ที่สร้างจากคลาสนั้น และช่วยให้สามารถเข้าถึงเมธอดหรือคุณสมบัติได้โดยไม่ต้องสร้างอินสแตนซ์ใหม่


// Part 2
class PriorityTask extends Task
// extends Task ระบุว่า PriorityTask สืบทอดมาจากคลาส Task หมายความว่า PriorityTask จะมีคุณสมบัติและเมธอดทั้งหมดที่มีใน Task และสามารถเพิ่มเติมหรือลบเมธอดได้ตามต้องการ
priority: 'low' | 'medium' | 'high';
// ประการคุณสมบัติใหม่
markCompleted(): void {
    super.markCompleted(); // เรียกใช้เมธอด markCompleted ของ Task
    console.log(`Priority task "${this.title}" completed.`); // แสดงข้อความเมื่อ task เสร็จสมบูรณ์
}
// Override method โดยการเรียกชื่อ method เดิมแต่ใส่คุณสมบัติใหม่ได้ โดย super จะเป็นการเรียกใช้ method ของตัวแม่ เทคนิค `` เป็นการแสดงข้อความโดยสามารถใช้ $"" เพื่อเรียกใช้ method ได้


// Part 3
interface TeamMember {
    name: string;
    role: string;
    tasks: Task[];
}
// สร้างโครงสร้าง interface เพื่อเก็บข้อมูลอย่างง่ายและเป็นระเบียบขึ้น
function assignTask(member: TeamMember, task: Task): void {
    member.tasks.push(task); // เพิ่ม task ลงใน tasks array ของสมาชิก
}
// สร้าง method assignTask เพื่อเพิ่ม Task ของสมาชิก โดยใช้ parameter member, task มาแก้ไขข้อมูลของ interface TeamMember


// Part 4
class Queue<T> {
    private items: T[] = []; // สร้างอาเรย์เพื่อเก็บข้อมูลใน queue
// ประกาศคลาส Queue โดยใช้ generic type <T> ซึ่งหมายความว่า Queue สามารถเก็บข้อมูลประเภทใดก็ได้ที่ระบุในช่วงเวลาที่สร้างอ็อบเจกต์ ที่เหลือสร้าง method ทั่วไปโดยใช้ push, shift


// Part 5
function createTaskUpdater(updateFn: (task: PriorityTask) => void): (task: PriorityTask) => void {
    return (task: PriorityTask) => {
        updateFn(task);
    };
}
// เรียกใช้งาน updateFn ด้วย task ที่ถูกส่งเข้ามาโดย task จะดูจากค่าอื่น ๆ เช่น task.priority
const markAsUrgent = createTaskUpdater((task: PriorityTask) => {
    task.priority = 'high';
});
// ใช้ task.priority ส่งค่าไปใน updateFn เพื่อตั้งค่าความสำคัญเป็น high สรุปคือ method markAsUrgent ทำให้วามสำคัญเป็น high


// Part 6
async function fetchTasks(): Promise<Task[]> {
// ทำงานแบบ asynchronous และสามารถใช้คำสั่ง await ภายในฟังก์ชันได้ โดย Promise ที่จะมี Array ของ Task นี่หมายความว่าเมื่อฟังก์ชันทำงานเสร็จสิ้น มันจะคืนค่าอาเรย์ของงาน
try {
    const tasks: Task[] = await new Promise((resolve, reject) => {
// การใช้ try/ catch: try { ... }: เริ่มต้นบล็อก try เพื่อจับข้อผิดพลาดที่อาจเกิดขึ้นในระหว่างการทำงาน, await new Promise(...): ใช้ await เพื่อรอให้ Promise ที่ถูกสร้างขึ้นทำงานเสร็จจากนั้นจะใช้ Promise เพื่อจำลองการดึง api
setTimeout(() => {
    const dummyTasks: Task[] = [
        new Task("ออกแบบหน้าแรก", "สร้าง mockup สำหรับหน้าแรก"),
        new Task("พัฒนาฟีเจอร์ใหม่", "สร้างฟีเจอร์สำหรับผู้ใช้ใหม่"),
        new Task("ทดสอบระบบ", "ทดสอบฟีเจอร์ต่างๆ")
    ];
    resolve(dummyTasks);
}, 2000);
// setTimeout: ใช้เพื่อจำลองความล่าช้า (delay) ในการตอบกลับจาก API เป็นเวลา 2 วินาที (2000 มิลลิวินาที), dummyTasks: สร้างอาเรย์ของ Task ที่มีงานตัวอย่าง 3 งาน, resolve(dummyTasks);: เรียกใช้ resolve เพื่อส่งคืนข้อมูลที่จำลองเป็นอาเรย์ของ Task
return tasks; 
// คืนค่ารายการของ Task
} catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks"); // สร้างข้อผิดพลาดในกรณีที่เกิดปัญหา
}
สร้าง catch ต่อจากบล็อก try เพื่อทำงานเมื่อตอนที่ try error โดยแสดง error ออกมา


// Part 7
const tasks: Task[] = [
    new Task("ออกแบบหน้าแรก", "สร้าง mockup สำหรับหน้าแรก"),
    new Task("พัฒนาฟีเจอร์ใหม่", "สร้างฟีเจอร์สำหรับผู้ใช้ใหม่"),
    new Task("ทดสอบระบบ", "ทดสอบฟีเจอร์ต่างๆ")
];
tasks[0].markCompleted(); // ออกแบบหน้าแรก เสร็จแล้ว
tasks[1].markCompleted(); // พัฒนาฟีเจอร์ใหม่ เสร็จแล้ว
// สร้าง Array เพื่อทดสอบ
const taskTitles = tasks.map(task => task.title);
console.log("Task Titles:", taskTitles);
// ใช้ map() เพื่อสร้างอาเรย์ของชื่อ Task
const incompleteTasks = tasks.filter(task => !task.completed);
console.log("Incomplete Tasks:", incompleteTasks);
// ใช้ filter() เพื่อคืนค่าเฉพาะ Task ที่ยังไม่เสร็จ
const completedCount = tasks.reduce((count, task) => task.completed ? count + 1 : count, 0);
console.log("Completed Tasks Count:", completedCount); // แสดงผล: 2
// ใช้ reduce() เพื่อนับจำนวน Task ที่ทำเสร็จ


// Part 8
function parseTaskData(jsonData: string): Task[] | string {
// รับพารามิเตอร์ jsonData ซึ่งเป็น string ที่มีข้อมูลในรูปแบบ JSON
try {
    const taskData = JSON.parse(jsonData);
// พยายามแปลง jsonData จาก string เป็นอาเรย์ของ object
if (!Array.isArray(taskData) || !taskData.every(task => typeof task.title === 'string' && typeof task.description === 'string')) {
    throw new Error("Invalid task data format");
}
// ตรวจสอบว่าข้อมูลที่ได้จาก JSON.parse เป็นอาเรย์หรือไม่, ตรวจสอบว่าแต่ละ object ในอาเรย์มี title และ description ที่เป็น string ถ้าผิดพลาดจะมี error แจ้งเตือน
return taskData.map((task: { title: string; description: string }) => new Task(task.title, task.description));
// แปลงข้อมูลเป็นอาเรย์ของ Task โดยใช้ map


// Part 9
// taskUtils.ts
export function calculateTotalCompletedTasks(tasks: Task[]): number {
// export: ทำให้ฟังก์ชันนี้สามารถนำเข้าไปใช้งานในไฟล์อื่นได้
// index.ts
const completedCount = calculateTotalCompletedTasks(tasks);
console.log("Total Completed Tasks:", completedCount);
// เรียกใช้ export function ของไฟล์ taskUtils.ts และแสดงผล

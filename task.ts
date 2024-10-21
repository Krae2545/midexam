// Part 1
// สร้าง class Task
class Task {
    private static taskCount = 0;
    title: string;
    description: string;
    completed: boolean;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
        this.completed = false;
        Task.taskCount++;
    }

    markCompleted(): void {
        this.completed = true;
    }

    updateDescription(newDescription: string): void {
        this.description = newDescription;
    }

    static totalTasks(): number {
        return Task.taskCount;
    }
}


// Part 2
// PriorityTask ที่สืบทอดจาก Task
class PriorityTask extends Task {
    priority: 'low' | 'medium' | 'high';

    constructor(title: string, description: string, priority: 'low' | 'medium' | 'high') {
        super(title, description); // เรียกใช้ constructor ของ Task
        this.priority = priority;
    }

    // Override เมธอด markCompleted
    markCompleted(): void {
        super.markCompleted(); // เรียกใช้เมธอด markCompleted ของ Task
        console.log(`Priority task "${this.title}" completed.`); // แสดงข้อความเมื่อ task เสร็จสมบูรณ์
    }
}

// Part 3
// สร้าง interface TeamMember
interface TeamMember {
    name: string;
    role: string;
    tasks: Task[];
}

// ฟังก์ชัน assignTask
function assignTask(member: TeamMember, task: Task): void {
    member.tasks.push(task); // เพิ่ม task ลงใน tasks array ของสมาชิก
}


// Part 4
// คลาส Queue ที่เป็น generic
class Queue<T> {
    private items: T[] = []; // สร้างอาเรย์เพื่อเก็บข้อมูลใน queue

    // เมธอด enqueue เพิ่ม item ลงใน queue
    enqueue(item: T): void {
        this.items.push(item);
    }

    // เมธอด dequeue ลบและคืนค่ารายการแรกใน queue
    dequeue(): T | undefined {
        return this.items.shift(); // คืนค่ารายการแรกและลบออกจาก queue
    }
}


// Part 5
// ฟังก์ชัน higher-order createTaskUpdater
function createTaskUpdater(updateFn: (task: PriorityTask) => void): (task: PriorityTask) => void {
    return (task: PriorityTask) => {
        updateFn(task);
    };
}

// ฟังก์ชัน markAsUrgent ใช้ createTaskUpdater
const markAsUrgent = createTaskUpdater((task: PriorityTask) => {
    task.priority = 'high'; // ตั้งค่าความสำคัญเป็น high
});


// Part 6
// ฟังก์ชัน async fetchTasks
async function fetchTasks(): Promise<Task[]> {
    try {
        // จำลองการดึงข้อมูลจาก API ด้วย Promise
        const tasks: Task[] = await new Promise((resolve, reject) => {
            setTimeout(() => {
                // จำลองข้อมูลที่ได้จาก API
                const dummyTasks: Task[] = [
                    new Task("ออกแบบหน้าแรก", "สร้าง mockup สำหรับหน้าแรก"),
                    new Task("พัฒนาฟีเจอร์ใหม่", "สร้างฟีเจอร์สำหรับผู้ใช้ใหม่"),
                    new Task("ทดสอบระบบ", "ทดสอบฟีเจอร์ต่างๆ")
                ];
                resolve(dummyTasks); // คืนค่าข้อมูลที่จำลอง
            }, 2000); // รอ 2 วินาทีก่อนจะคืนค่า
        });
        
        return tasks; // คืนค่ารายการของ Task
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw new Error("Failed to fetch tasks"); // สร้างข้อผิดพลาดในกรณีที่เกิดปัญหา
    }
}


// Part 7
// สร้างตัวอย่างอาเรย์ของ Task
const tasks: Task[] = [
    new Task("ออกแบบหน้าแรก", "สร้าง mockup สำหรับหน้าแรก"),
    new Task("พัฒนาฟีเจอร์ใหม่", "สร้างฟีเจอร์สำหรับผู้ใช้ใหม่"),
    new Task("ทดสอบระบบ", "ทดสอบฟีเจอร์ต่างๆ")
];

// ทำเครื่องหมายให้บาง task เสร็จ
tasks[0].markCompleted(); // ออกแบบหน้าแรก เสร็จแล้ว
tasks[1].markCompleted(); // พัฒนาฟีเจอร์ใหม่ เสร็จแล้ว

// 1. ใช้ map() เพื่อสร้างอาเรย์ของชื่อ task
const taskTitles = tasks.map(task => task.title);
console.log("Task Titles:", taskTitles); // แสดงผล: [ 'ออกแบบหน้าแรก', 'พัฒนาฟีเจอร์ใหม่', 'ทดสอบระบบ' ]

// 2. ใช้ filter() เพื่อคืนค่าเฉพาะ task ที่ยังไม่เสร็จ
const incompleteTasks = tasks.filter(task => !task.completed);
console.log("Incomplete Tasks:", incompleteTasks); // แสดงผล: [ Task { ... 'ทดสอบระบบ' } ]

// 3. ใช้ reduce() เพื่อนับจำนวน task ที่ทำเสร็จ
const completedCount = tasks.reduce((count, task) => task.completed ? count + 1 : count, 0);
console.log("Completed Tasks Count:", completedCount); // แสดงผล: 2

//Part 9
// ฟังก์ชัน parseTaskData
function parseTaskData(jsonData: string): Task[] | string {
    try {
        // พยายาม parse JSON string เป็นอาเรย์ของ object
        const taskData = JSON.parse(jsonData);

        // ตรวจสอบว่าแต่ละรายการในอาเรย์เป็น object ที่ถูกต้อง
        if (!Array.isArray(taskData) || !taskData.every(task => typeof task.title === 'string' && typeof task.description === 'string')) {
            throw new Error("Invalid task data format");
        }

        // แปลงเป็นอาเรย์ของ Task
        return taskData.map((task: { title: string; description: string }) => new Task(task.title, task.description));
    } catch (error) {
        // จัดการข้อผิดพลาดและคืนค่าเป็นข้อความข้อผิดพลาด
        return `Error parsing task data: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
}

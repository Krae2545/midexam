# midexam

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
// เป็น function ปรับค่าใน class ปกติ
updateDescription(newDescription: string): void {
    this.description = newDescription;
}
// เป็น function ปรับค่าใน class โดยใช้ parameter ที่ส่งมา
static totalTasks(): number {
    return Task.taskCount;
}
// เป็น function ส่งค่าจำนวน task ใน class ออกไปโดยตั้งเป็น static ช่วยให้คุณสามารถสร้างสมาชิกที่เป็นของคลาสโดยตรง ซึ่งมีค่าเดียวสำหรับทุกอ็อบเจกต์ที่สร้างจากคลาสนั้น และช่วยให้สามารถเข้าถึงเมธอดหรือคุณสมบัติได้โดยไม่ต้องสร้างอินสแตนซ์ใหม่

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



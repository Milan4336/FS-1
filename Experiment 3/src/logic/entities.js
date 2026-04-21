export class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    getDetails() {
        return `Name: ${this.name}, Age: ${this.age}`;
    }

    greet() {
        return `Hello, my name is ${this.name}.`;
    }

    getRole() {
        return "Person";
    }
}

export class Student extends Person {
    constructor(name, age, studentId, course) {
        super(name, age);
        this.studentId = studentId;
        this.course = course;
    }

    getDetails() {
        return `${super.getDetails()}, ID: ${this.studentId}, Course: ${this.course}`;
    }

    greet() {
        return `Hi! I'm ${this.name}, and I'm studying ${this.course}.`;
    }

    getRole() {
        return "Student";
    }
}

export class Teacher extends Person {
    constructor(name, age, employeeId, subject) {
        super(name, age);
        this.employeeId = employeeId;
        this.subject = subject;
    }

    getDetails() {
        return `${super.getDetails()}, EmpID: ${this.employeeId}, Subject: ${this.subject}`;
    }

    greet() {
        return `Good morning. My name is ${this.name}, and I teach ${this.subject}.`;
    }

    getRole() {
        return "Teacher";
    }
}

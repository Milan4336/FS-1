const inquirer = require('inquirer');
const chalk = require('chalk');

// Array-based storage for experiments
let employees = [
    { id: 1, name: 'Alice Smith', position: 'Developer', salary: 75000 },
    { id: 2, name: 'Bob Johnson', position: 'Designer', salary: 68000 }
];

async function mainMenu() {
    console.log(chalk.blue.bold('\n--- Employee Management System (CLI) ---'));
    
    const { action } = await inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'Add New Employee',
            'Update Employee',
            'Delete Employee',
            'Exit'
        ]
    }]);

    switch (action) {
        case 'View All Employees':
            console.table(employees);
            break;
        case 'Add New Employee':
            await addEmployee();
            break;
        case 'Update Employee':
            await updateEmployee();
            break;
        case 'Delete Employee':
            await deleteEmployee();
            break;
        case 'Exit':
            console.log(chalk.green('Goodbye!'));
            process.exit();
    }
    mainMenu();
}

async function addEmployee() {
    const questions = [
        { type: 'input', name: 'name', message: "Enter employee name:", validate: val => val.length > 0 },
        { type: 'input', name: 'position', message: "Enter position:" },
        { type: 'number', name: 'salary', message: "Enter salary:" }
    ];

    const data = await inquirer.prompt(questions);
    const id = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    employees.push({ id, ...data });
    console.log(chalk.green('\n✓ Employee added successfully!'));
}

async function updateEmployee() {
    if (employees.length === 0) return console.log(chalk.red('No employees found.'));
    
    const { id } = await inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: 'Select employee to update:',
        choices: employees.map(e => ({ name: `${e.name} (${e.position})`, value: e.id }))
    }]);

    const employee = employees.find(e => e.id === id);
    const updates = await inquirer.prompt([
        { type: 'input', name: 'position', message: `Update position (${employee.position}):`, default: employee.position },
        { type: 'number', name: 'salary', message: `Update salary (${employee.salary}):`, default: employee.salary }
    ]);

    Object.assign(employee, updates);
    console.log(chalk.yellow('\n✓ Employee updated!'));
}

async function deleteEmployee() {
    const { id } = await inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: 'Select employee to delete:',
        choices: employees.map(e => ({ name: e.name, value: e.id }))
    }]);

    employees = employees.filter(e => e.id !== id);
    console.log(chalk.red('\n✓ Employee deleted!'));
}

mainMenu();

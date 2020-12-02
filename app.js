const inquirer = require('inquirer')
const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '#eemaMi05',
  database: 'emplyoee_tracker'
})
require('console.table')

const viewAllEmployee = () => {
  db.query(`
  SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager on manager.id = employee.manager_id`, (err, employee) => {
    if (err) { console.log(err) }
    console.log(employee)
    main()
  })

}

const viewByDepartments = () => {
  db.query(`
  SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager on manager.id = employee.manager_id WHERE ?`, {department.name}, (err, employee) => {
    if (err) { console.log(err) }
    console.log(employee)
    main()
  })

}
const viewByManager = () => {
  db.query(`
  SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager on manager.id = employee.manager_id WHERE ?`, { manager.first_name }, (err, employee) => {
    if (err) { console.log(err) }
    console.log(employee)
    main()
  })

}

const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first',
      message: 'What is the first name of the Employee?'
    },
    {
      type: 'input',
      name: 'last',
      message: 'What is the last name of the Employee?'
    },
    {
      type: 'list',
      name: 'role',
      message: 'What is the role of the Employee?'
      choices: ['Sales', 'Engineering', 'Finance', 'Planning', 'Opration']
    },
    {
      type: 'number',
      name: 'price',
      message: 'What is the new menu item price?'
    }
  ])
    .then(item => {
      db.query('INSERT INTO menu SET ?', item, err => {
        if (err) { console.log(err) }
        console.log('New Menu Item Added!')
        main()
      })
    })
}

const deleteItem = () => {
  db.query('SELECT * FROM menu', (err, menu) => {
    if (err) { console.log(err) }

    inquirer.prompt({
      type: 'list',
      name: 'id',
      message: 'Select the menu item you want to delete:',
      choices: menu.map(item => ({
        name: item.name,
        value: item.id
      }))
    })
      .then(({ id }) => {
        db.query('DELETE FROM menu WHERE ?', { id }, err => {
          if (err) { console.log(err) }
          console.log('Menu Item Deleted!')
          main()
        })
      })
      .catch(err => console.log(err))
  })
}

const updateItem = () => {
  db.query('SELECT * FROM menu', (err, menu) => {
    if (err) { console.log(err) }

    inquirer.prompt([
      {
        type: 'list',
        name: 'id',
        message: 'Select the menu item you want to update the price:',
        choices: menu.map(item => ({
          name: `${item.name} (${item.price})`,
          value: item.id
        }))
      },
      {
        type: 'number',
        name: 'price',
        message: 'Enter the new value for the item price:'
      }
    ])
      .then(({ id, price }) => {
        db.query('UPDATE menu SET ? WHERE ?', [{ price }, { id }], err => {
          if (err) { console.log(err) }
          console.log('Menu Item Price Updated!')
          main()
        })
      })
      .catch(err => console.log(err))
  })
}

const main = () => {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View All Employees', 'View All Employees by Departmetnt', 'View All Employees by Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager']
  })
    .then(({ action }) => {
      switch (action) {
        case 'View All Employees':
          viewAllEmployee()
          break
        case 'View All Employees by Departmetnt':
          viewByDepartments()
          break
        case 'View All Employees by Manager':
          viewByManager()
          break
        case 'Remove Employee':
          deleteItem()
          break
        case 'Update Employee Role':
          deleteItem()
          break
        case 'Update Employee Manager':
          deleteItem()
          break
        case 'EXIT':
          process.exit()
          break
      }
    })
    .catch(err => console.log(err))
}

main()
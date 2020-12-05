const inquirer = require('inquirer')
const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '#eemaMi05',
  database: 'employee_tracker'
})
require('console.table')

const viewAllEmployee = () => {
  db.query(`
  SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager on manager.id = employee.manager_id`, (err, employee) => {
    if (err) { console.log(err) }
    console.table(employee)
    mainMenu()
  })

}

const viewByDepartments = () => {
  db.query(`
  SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager on manager.id = employee.manager_id ORDER BY role.department_id `, (err, employee) => {
    if (err) { console.log(err) }
    console.table(employee)
    mainMenu()
  })

}
const viewByManager = () => {
  db.query(`
  SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager on manager.id = employee.manager_id ORDER BY employee.manager_id`, (err, employee) => {
    if (err) { console.log(err) }
    console.table(employee)
    mainMenu()
  })

}

const addEmployee = () => {
  db.query('SELECT * FROM role', (err, role) => {
    if (err) { console.log(err) }
    db.query(`SELECT * FROM employee`, (err, employee) => {
      if (err) { console.log(err) }
      
      inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: `What is the employee's first name?`
        },
        {
          type: 'input',
          name: 'last_name',
          message: `What is the employee's last name?`
        },
        {
          type: 'list',
          name: 'role_id',
          message: `What is the employee's role`,
          choices: role.map(role => ({
            name: `${role.title}`,
            value: role.id
          }))
        },
        
        {
          type: 'list',
          name: 'manager_id',
          message: `Who is the employee's manager`,
          choices: employee.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
          })),
          
        }
      ])
        .then(data => {
          
          db.query('INSERT INTO employee SET ?', data, err => {
            if (err) { console.log(err) }
            console.log(` New Employee added ${data.first_name} ${data.last_name} `)
           
            mainMenu()
          })
        })
    })
  })
}
 


const addDept = () => {
  
  inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'What is the name of the New Department?'
  })
  .then(name => {
    db.query('INSERT INTO department SET ?', name, err => {
      if (err) {console.log(err)}
      console.log('New Department Added :' + name.name)
      mainMenu()
    })
  })
  .catch(err => console.log(err))
}


const addRole = () => {
  db.query('SELECT * FROM department', (err, department) =>{
    if (err) { console.log(err) }
  
    inquirer.prompt([
      {
      type: 'input',
      name: 'title',
      message:'What is the role title?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for this role'
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select the Department to add this role',
      choices: department.map(dept => ({
        name: dept.name,
        value: dept.id
      }))
    }])
      .then((role) => {
        db.query('INSERT INTO role SET ?', role, err => {
          if (err) { console.log(err) }
          console.log('Role Created!')
          mainMenu()
        })
    })
    .catch(err => console.log(err))
  })
}

// const deleteItem = () => {
//   db.query('SELECT * FROM menu', (err, menu) => {
//     if (err) { console.log(err) }

//     inquirer.prompt({
//       type: 'list',
//       name: 'id',
//       message: 'Select the menu item you want to delete:',
//       choices: menu.map(item => ({
//         name: item.name,
//         value: item.id
//       }))
//     })
//       .then(({ id }) => {
//         db.query('DELETE FROM menu WHERE ?', { id }, err => {
//           if (err) { console.log(err) }
//           console.log('Menu Item Deleted!')
//           mainMenu()
//         })
//       })
//       .catch(err => console.log(err))
//   })
// }

// const updateItem = () => {
//   db.query('SELECT * FROM menu', (err, menu) => {
//     if (err) { console.log(err) }

//     inquirer.prompt([
//       {
//         type: 'list',
//         name: 'id',
//         message: 'Select the menu item you want to update the price:',
//         choices: menu.map(item => ({
//           name: `${item.name} (${item.price})`,
//           value: item.id
//         }))
//       },
//       {
//         type: 'number',
//         name: 'price',
//         message: 'Enter the new value for the item price:'
//       }
//     ])
//       .then(({ id, price }) => {
//         db.query('UPDATE menu SET ? WHERE ?', [{ price }, { id }], err => {
//           if (err) { console.log(err) }
//           console.log('Menu Item Price Updated!')
//           mainMenu()
//         })
//       })
//       .catch(err => console.log(err))
//   })
// }

const mainMenu = () => {
  inquirer.prompt(
    {
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
      choices: ['View All Employees', 'View All Employees by Department', 'View All Employees by Manager', 'Add Employee', 'Add Department', 'Add Role', 'Exit']
    
  })
    .then(({ action }) => {
      switch (action) {
        case 'View All Employees':
          viewAllEmployee()
          break
        case 'View All Employees by Department':
          viewByDepartments()
          break
        case 'View All Employees by Manager':
          viewByManager()
          break
        case 'Add Employee':
          addEmployee()
          break
        case 'Add Department':
          addDept()
          break
        case 'Add Role':
          addRole()
          break
        case 'Exit':
          process.exit()
          break
      }
    })
    .catch(err => console.log(err))
}

mainMenu()
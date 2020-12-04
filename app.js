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

// const addEmployee = () => {
//   inquirer.prompt([
//     {
//       type: 'input',
//       name: 'first',
//       message: 'What is the first name of the Employee?'
//     },
//     {
//       type: 'input',
//       name: 'last',
//       message: 'What is the last name of the Employee?'
//     },
//     {
//       type: 'list',
//       name: 'role_id',
//       message: 'Pick the role id for this Employee',
//       choices: function() {
//         rolesArray = []
//         result.forEach(result => {
//           rolesArray.push(
//             result.title
//           )
//         })
//         return rolesArray
//       }
//     },
    
//   ])
//     .then((function (data) {
//       console.log(data);
//       const role = data.roleName;
//       db.query('SELECT * FROM role', function (err, res) {
//         if (err) { console.log(err) }
//         let filteredRole = res.filter(function (res) {
//           return res.title == role
//         })
//         let roleId = filteredRole[0].id;
//         db.query("SELECT * FROM employee", function (err, res) {
//           inquirer
//             .prompt([
//               {
//                 name: "manager",
//                 type: "list",
//                 message: "Who is the Manager?",
//                 choices: function () {
//                   managersArray = []
//                   res.forEach(res => {
//                     managersArray.push(
//                       res.last_name)

//                   })
//                   return managersArray;
//                 }
//               }
//             ]).then(function (managerdata) {
//               const manager = managerdata.manager;
//               db.query('SELECT * FROM employee', function (err, res) {
//                 if (err) throw (err);
//                 let filteredManager = res.filter(function (res) {
//                   return res.last_name == manager;
//                 })
//                 let managerId = filteredManager[0].id;
//                 console.log(managerdata);
//                 let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
//                 let values = [data.firstName, data.lastName, roleId, managerId]
//                 console.log(values);
//                 db.query(query, values,
//                   function (err, res, fields) {
//                     console.log(`You have added this employee: ${(values[0]).toUpperCase()}.`)
//                   })
//                 viewEmployees();
//               })
//             })
//         })
//       })
//     }))
//   .catch(err => console.log(err))
// }

// const addDepartment = () => {
//   inquirer.prompt({
//     type: 'input',
//     name: 'name',
//     message: 'What is the name of the Department?'
//   })
//   .then(name => {
//     db.query('INSERT INTO department SET ?', name, err => {
//       if (err) {console.log(err)}
//       console.log('New Department Added :' + name)
//       mainMenu()
//     })
//   })
//   .catch(err => console.log(err))
// }

// const addRole = () => {
  
//     inquirer.prompt([
//       {
//       type: 'input',
//       name: 'title',
//       message:'What is the role title?'
//     },
//     {
//       type: 'input',
//       name: 'salary',
//       message: 'Enter the salary for this role'
//     },
//     {
//       type: 'list',
//       name: 'id',
//       message: 'Select the Department to add this role',
//         choices: function () {
//           let choicesArray = []
//           res.forEach(res => {
//             choicesArray.push(
//               res.name
//             )
//           })
//           return choicesArray
//         }
//       }
//     ]) 
    
//     .then(function (data) {
//       const department = data.departmentName
//       db.query('SELECT * FROM DEPARTMENT', function (err, res) {

//         if (err) {console.log(err)}
//         let filteredDept = res.filter(function (res) {
//           return res.name == department;
//         }
//         )
//         let id = filteredDept[0].id
//         let values = [data.title, parseInt(data.salary), id]
//         db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', values, err => {
//         if (err) { console.log(err) }
//            console.log(`You have added this role: ${(values[0]).toUpperCase()}.`)
//            viewRoles()
//         mainMenu()
        
//       })
//     })
//   })
//   .catch(err => console.log(err))
// }

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
    choices: ['View All Employees', 'View All Employees by Departmetnt', 'View All Employees by Manager']
    // , 'Add Employee', 
    // 'Add Departmet', 'Add Role']
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
        // case 'Add Employee':
        //   addEmployee()
        //   break
        // case 'Add Departmet':
        //   addDepartment()
        //   break
        // case 'Add Role':
        //   addRole()
        //   break
        // case 'EXIT':
        //   process.exit()
        //   break
      }
    })
    .catch(err => console.log(err))
}

mainMenu()
var restify = require('restify');

let employees = []
let currentID = 1

let Employee = function(first, last) {
    this.id = currentID
    this.firstName = first;
    this.lastName = last;
    currentID = currentID++
}

function getEmployee(req, res, next) {
    let id = req.params.id;
    console.log(id);

    let found;
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].id == id) {
            found = employees[i]
            break;
        }
    }
    res.send(found);
    next();
}

function getEmployees(req, res, next) {
    employee = new Employee(firstName, lastName)
    res.send(employee);
    next();
}

function postEmployee(req, res, next) {
	let newEmployee = new Employee(req.body.firstName, req.body.lastName);
	employees.push(newEmployee);
    res.send(newEmployee);
    next();
}

var server = restify.createServer();
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/employees/:id', getEmployee);
server.get('/employees/', getEmployees);
server.post('/employees/', postEmployee);
server.put('/employees/:id', editEmployee);
server.del('employees/:id', deleteEmployee);
//server.head('/hello/:name', respond);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
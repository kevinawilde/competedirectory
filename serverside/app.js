var restify = require('restify');
var server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

let employees = [];
let currentID = 0;

function Employee() {
    currentID++;
    this.id = currentID;
    this.dateCreated = date;
};
function getEmployees(req, res, next) {
    // Resitify currently has a bug which doesn't allow you to set default headers
    // These headers comply with CORS and allow us to serve our response to any origin
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    //find the appropriate data
    res.send(employees);
}
function getEmployee(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var employee = employees.filter(function(employee) {
        return employee.id == req.params.id;
    });
    res.send(employee);
}
function putEmployees(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //Make new person
    var employee = new Employee();
    let id = req.params.id;
    let exists = false;
    console.log(id);
    //See if this person exists
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].id == id) {
            employee = employees[i];
            employee.firstName = req.body.firstName;
            employee.lastName = req.body.lastName;
            employees[i] = employee;
            exists = true;
            break;
        }
    }
    if (!exists) {
        employee.firstName = req.body.firstName;
        employee.lastName = req.body.lastName; //save the new message to the collection
        employee.id = parseInt(id);
        employees.push(employee);
    }
    console.log(employee);
    res.send(employee);
}
function delEmployee(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    let id = parseInt(req.params.id);

    for (let i = 0; i < employees.length; i++) {
        if (employees[i].id === id) {
            employees.splice(i, 1);
        };
    }
    console.log(employees);
    res.end();
};
server.get('/employees', getEmployees);
server.get('/employees/:id', getEmployee);
server.post('/employees', postEmployees);
server.put('/employees/:id', putEmployees);
server.del('/employees/:id', delEmployee);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
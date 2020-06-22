const fs = require('fs')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3003
const students = JSON.parse(fs.readFileSync('students.json'))
app.use(bodyParser.json())
app.use(express.json())

app.get('/students',(req,res) =>{
res.json(students)
})

app.get('/students/:studentId',(req,res) =>{
    let id = parseInt(req.params.studentId)
res.send(students.slice().filter(student => student.id === id)[0])

})
app.get('/grades/:studentId',(req,res) =>{
    let id = parseInt(req.params.studentId)
    let student = students.slice().filter(student => student.id === id)[0]
    res.send(`The grade for student ${id} is ` + student.grade.toString())

})

app.get('/search',(req,res) => {
    const query = decodeURIComponent(req.query.query)
    const filteredStudents = students.filter(student => student.includes(query))
    
    res.send(filteredStudents)
});


app.post('/send', function(req, res){
let result;
const studentSender = req.body
if(studentSender.id && studentSender.grade && studentSender.name){
    students.push({id:studentSender.id, grade:studentSender.grade, name:studentSender.name})
    result = {
        "status": "success",
        "message": "The message was successfully sent"
    }
}else{ 
    result = {
        "status": "failed",
        "message": "The message was not sent"
    }
    res.status(400);
}

res.json(result);
})


app.listen(port, () => console.log('Listening now'))
var id = 0;
var teachers = [];
var students = [];
var sections = [];
function createHTMLElements() {
    selectBox = document.getElementById("additionSelectBox");
    newStudentForm = document.getElementById("newStudentForm");
    newTeacherForm= document.getElementById("newTeacherForm");
    newSectionForm = document.getElementById("newSectionForm");
    messageDiv = document.getElementById("messageDiv");
    studentFirstNameTextBox = document.getElementById("newStudentFirstName");
    studentLastNameTextBox = document.getElementById("newStudentLastName");
    studentGradeSelectBox = document.getElementById("newStudentGradeSelectBox");
    teacherSubjectTextBox = document.getElementById("newTeacherSubjectTextBox");
    teacherFirstNameTextBox = document.getElementById("newTeacherFirstName");
    teacherLastNameTextBox = document.getElementById("newTeacherLastName");
    newSectionNameTextBox = document.getElementById("newSectionNameTextBox");
    newSectionMaxSizeTextBox= document.getElementById("newSectionMaxSizeTextBox");
    newSectionSelectTeacherBox = document.getElementById("newSectionSelectTeacher");
}
function Person(firstName,lastName) {
    this.id = id;
    id++;
    this.firstName = firstName;
    this.lastName = lastName;
}

function Student(grade, firstName, lastName) {
    this.grade = grade;
    Person.call(this, firstName,  lastName);
}

function Teacher(subject, firstName, lastName) {
    this.subject = subject;
    Person.call(this, firstName, lastName);
}
Student.prototype = new Person();
Teacher.prototype = new Person();

function Section(name, maxSize, teacher) {
    this.name = name;
    this.teacher = teacher;
    this.maxSize = maxSize;
    this.students = [];
    this.currentSize = 0;
    this.addStudent = function (student) {
        if(this.currentSize != this.maxSize){
            this.currentSize++;
            this.students.push(student);
        }
    };

    this.removeStudent = function(id) {
        for(var i = 0; i < this.students.length; i++) {
            for(var key in this.students[i]){
                if(this.students[i][key] == id){
                    this.students.splice(i,  1);
                }
            }
        }
    };

    this.sectionSeatsRemaining = function () {
        return this.maxSize - this.currentSize;
    };


}

function selectBoxOptionChosen() {
    messageDiv.innerHTML = "";
    document.body.fontStyle = 'normal';
    switch (parseInt(selectBox.value)) {
        case 0:
            newStudentForm.style.display = "inline";
            newTeacherForm.style.display = "none";
            newSectionForm.style.display = "none";
            break;
        case 1:
            newTeacherForm.style.display = "inline";
            newStudentForm.style.display = "none";
            newSectionForm.style.display = "none";
            break;
        case 2:
            newSectionForm.style.display = "inline";
            newTeacherForm.style.display = "none";
            newStudentForm.style.display = "none";
            if (teachers.length == 0) {
                newSectionForm.style.display = "none";
                messageDiv.style.fontStyle = 'italic';
                messageDiv.innerHTML = "You must add at least one teacher before adding a section.";
            } else {
                newSectionSelectTeacherBox.children = [];
                for (var i = 0; i < teachers.length; i++) {
                    var newEl = document.createElement("option");
                    newEl.value = i;
                    newEl.innerHTML = teachers[i].firstName + " " + teachers[i].lastName;
                    newSectionSelectTeacherBox .appendChild(newEl);
                }
            }
            break;
    }
}


function addObject() {
    var newObject;
    switch (parseInt(selectBox.value)){
        case 0:
            newObject = new Student(studentFirstNameTextBox.value, studentLastNameTextBox.value, parseInt(studentGradeSelectBox.value));
            students.push(newObject);
            messageDiv.innerHTML = "New Student Added!";
            break;
        case 1:
            newObject = new Teacher(teacherSubjectTextBox.value ,teacherFirstNameTextBox.value, teacherLastNameTextBox.value);
            teachers.push(newObject);
            messageDiv.innerHTML = "New Teacher Added!";
            break;
        case 2:
            newObject = new Section(newSectionNameTextBox.value, parseInt(newSectionMaxSizeTextBox.value), parseInt(newSectionSelectTeacherBox.value));
            sections.push(newObject);
            messageDiv.innerHTML = "New Section Added";
            break;
    }

}
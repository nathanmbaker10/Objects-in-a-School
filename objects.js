var id = 0;
function Person(firstName,lastName) {
    this.id = id;
    id++;
    this.firstName = firstName;
    this.lastName = lastName;
}

function Student(grade, firstName, lastName) {
    this.grade = grade;
    Person.call(this, firstName, lastName);
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
        if (this.currentSize != this.maxSize) {
            this.currentSize++;
            for (var i = 0; i < this.students.length; i++) {
                if (student === this.students[i]) {
                    return;
                }
            }
            this.students.push(student);
        }
    };
    this.removeStudent = function (id) {
        for (var i = 0; i < this.students.length; i++) {
            if (this.students[i]["id"] == id) {
                this.students.splice(i, 1);
                this.currentSize--;
            }
        }
    };

    this.sectionSeatsRemaining = function () {
        return this.maxSize - this.currentSize;
    };
}

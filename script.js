var teachers = [];
var students = [];
var sections = [];
function createHTMLElements() {
    selectBox = document.getElementById("additionSelectBox");
    newObjectDiv = document.getElementById("addForm");
    removeObjectDiv = document.getElementById("removeDiv");
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
    removeSelectBox = document.getElementById("removeSelectBox");
    objectRemovalSelectBox = document.getElementById("objectForRemovalSelectBox");
    removeButton = document.getElementById("removeButton");
    editSectionForm = document.getElementById("editSectionForm");
    sectionsSelectBox = document.getElementById("chooseSection");
    addStudentToSectionBox = document.getElementById("addStudent");
    removeStudentFromSectionBox = document.getElementById("removeStudent");
    listDiv = document.getElementById("listDiv");
    sectionsTable = document.getElementById("sectionsTable");
    teachersTable = document.getElementById("teachersTable");
    studentsTable = document.getElementById("studentsTable");
}




function iconClicked(button) {
    messageDiv.innerHTML = '';
    switch (button) {
        case "add":
            listDiv.style.display = "none";
            editSectionForm.style.display = "none";
            newObjectDiv.style.display = "inline";
            removeObjectDiv.style.display = "none";
            break;
        case "remove":
            listDiv.style.display = "none";
            editSectionForm.style.display = "none";
            newObjectDiv.style.display = '';
            if (students.length == 0 && teachers.length == 0 && sections.length == 0) {
                removeObjectDiv.style.display = "none";
                messageDiv.innerHTML = "You have nothing to remove";
            } else {
                removeObjectDiv.style.display = "inline";
            }
            break;
        case "search":
            editSectionForm.style.display = "none";
            newObjectDiv.style.display = "none";
            removeObjectDiv.style.display = "none";
            listDiv.style.display = "inline";
            if (sections.length != 0) {
                sectionsTable.style.display = "inline";
                populateSectionsTable();
            } else {
                sectionsTable.style.display = "none";
            }
            if (students.length != 0) {
                populateStudentsTable();
                studentsTable.style.display = "inline";
            } else {
                studentsTable.style.display = "none";
            }
            if (teachers.length != 0) {
                populateTeachersTable();
                teachersTable.style.display = "inline";
            } else {
                teachersTable.style.display = "none";
            }
            if (sections.length == 0 && teachers.length == 0 && students.length == 0) {
                listDiv.style.display = "none";
                messageDiv.innerHTML = "You have no items to list.";
            }


            break;
        case "edit":
            listDiv.style.display = "none";
            editSectionForm.style.display = "inline";
            newObjectDiv.style.display = "none";
            removeObjectDiv.style.display = "none";
            if (sections.length < 1) {
                editSectionForm.style.display = "none";
                messageDiv.innerHTML = "You have no sections to edit."
            }   else {
                sectionsSelectBox.options.length = 0;
                var initialChild = document.createElement("option");
                initialChild.innerHTML = "Pick Section!";
                initialChild.value = -1;
                sectionsSelectBox.appendChild(initialChild);
                for (var i = 0; i < sections.length; i++){
                    var newEl = document.createElement("option");
                    newEl.value = i;
                    newEl.innerHTML = sections[i].name;
                    sectionsSelectBox.appendChild(newEl);
                }
                populateRemoveAndAddStudentBoxesForSections();
            }


            break;
    }
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
            newTeacherForm.style.display = "none";
            newStudentForm.style.display = "none";
            if (teachers.length == 0) {
                newSectionForm.style.display = "none";
                messageDiv.style.fontStyle = 'italic';
                messageDiv.innerHTML = "You must add at least one teacher before adding a section.";
            } else {
                newSectionForm.style.display = "inline";
                newSectionSelectTeacherBox.options.length = 0;
                for (var i = 0; i < teachers.length; i++) {
                    var newEl = document.createElement("option");
                    newEl.value = i;
                    newEl.innerHTML = teachers[i].firstName + " " + teachers[i].lastName;
                    newSectionSelectTeacherBox.appendChild(newEl);
                }
            }
            break;
    }
}


function addObject() {
    var newObject;
    switch (parseInt(selectBox.value)){
        case 0:
            newObject = new Student(parseInt(studentGradeSelectBox.value), studentFirstNameTextBox.value, studentLastNameTextBox.value);
            studentFirstNameTextBox.value = "";
            studentLastNameTextBox.value = "";
            students.push(newObject);
            messageDiv.innerHTML = "New Student Added!";
            break;
        case 1:
            newObject = new Teacher(teacherSubjectTextBox.value ,teacherFirstNameTextBox.value, teacherLastNameTextBox.value);
            teacherSubjectTextBox.value = "";
            teacherLastNameTextBox.value = "";
            teacherFirstNameTextBox.value = "";
            teachers.push(newObject);
            messageDiv.innerHTML = "New Teacher Added!";
            break;
        case 2:
            newObject = new Section(newSectionNameTextBox.value, parseInt(newSectionMaxSizeTextBox.value), teachers[parseInt(newSectionSelectTeacherBox.value)]);
            newSectionMaxSizeTextBox.value = "";
            newSectionNameTextBox.value = "";
            sections.push(newObject);
            messageDiv.innerHTML = "New Section Added";
            break;
    }

}

function removalBoxOptionChosen() {
    objectRemovalSelectBox.options.length = 0;
    switch (parseInt(removeSelectBox.value)) {
        case 0:
            if (students.length == 0) {
                messageDiv.innerHTML = "You have no students to remove";
                removeButton.disabled= true;
            } else {
                removeButton.disabled = false;
            }
            for (var i = 0; i < students.length; i++) {
                var newEl = document.createElement("option");
                newEl.value = i;
                newEl.innerHTML = students[i].firstName + " " + students[i].lastName;
                objectRemovalSelectBox.appendChild(newEl);
            }
            break;
        case 1:
            if (teachers.length == 0) {
                messageDiv.innerHTML = "You have no teachers to remove";
                removeButton.disabled = true;
            } else {
                removeButton.disabled = false;
            }
            for (var i = 0; i < teachers.length; i++) {
                var newEl = document.createElement("option");
                newEl.value = i;
                newEl.innerHTML = teachers[i].firstName + " " + teachers[i].lastName;
                objectRemovalSelectBox.appendChild(newEl);
            }
            break;
        case 2:
            if (sections.length == 0) {
                messageDiv.innerHTML = "You have no sections to remove";
                removeButton.disabled = true;
            } else {
                removeButton.disabled = false;
            }
            for (var i = 0; i < sections.length; i++) {
                var newEl = document.createElement("option");
                newEl.value = i;
                newEl.innerHTML = sections[i].name;
                objectRemovalSelectBox.appendChild(newEl);
            }
            break;
    }
}

function removeObject() {
    switch (parseInt(removeSelectBox.value)){
        case 0:
            for (var i = 0; i < sections.length; i++) {
                sections[i].removeStudent(students[objectRemovalSelectBox.value].id);
            }
            students.splice(parseInt(objectRemovalSelectBox.value), 1);
            messageDiv.innerHTML = "Student Removed!";
            removalBoxOptionChosen();
            break;
        case 1:
            var teacherToRemove = teachers[parseInt(objectRemovalSelectBox.value)];
            var newSectionArray = [];
            for (var i = 0; i < sections.length; i++){
                if (sections[i].teacher !== teacherToRemove) {
                    newSectionArray.push(sections[i]);
                }
            }
            sections = newSectionArray;
            teachers.splice(parseInt(objectRemovalSelectBox.value), 1);
            messageDiv.innerHTML = "Teacher Removed!";
            removalBoxOptionChosen();
            break;
        case 2:
            sections.splice(parseInt(objectRemovalSelectBox.value), 1);
            messageDiv.innerHTML = "Section  Removed!";
            removalBoxOptionChosen();
            break;
    }
}

function populateRemoveAndAddStudentBoxesForSections() {
    var initialAdd = document.createElement("option");
    var initialRemove = document.createElement("option");
    initialAdd.innerHTML = "Student to Add";
    initialRemove.innerHTML = "Student to Remove";
    initialAdd.value = -1;
    initialRemove.value = -1;
    removeStudentFromSectionBox.length = 0;
    addStudentToSectionBox.length = 0;
    removeStudentFromSectionBox.appendChild(initialRemove);
    addStudentToSectionBox.appendChild(initialAdd);
    for (var i = 0; i < students.length; i++) {
        var newEl = document.createElement("option");
        newEl.value = i;
        newEl.innerHTML = students[i].firstName + " " + students[i].lastName;
        addStudentToSectionBox.appendChild(newEl);
    }
    if (parseInt(sectionsSelectBox.value) != -1) {
        for (var i = 0; i < sections[parseInt(sectionsSelectBox.value)].students.length; i++) {
            var newEl = document.createElement("option");
            newEl.value = i;
            newEl.innerHTML = sections[sectionsSelectBox.value].students[i].firstName + " " + sections[sectionsSelectBox.value].students[i].lastName
            removeStudentFromSectionBox.appendChild(newEl);
        }
    }
}

function addRemoveFromSection() {
    var section = sections[parseInt(sectionsSelectBox.value)];
    if (parseInt(addStudentToSectionBox.value) == -1 && parseInt(removeStudentFromSectionBox.value) == -1) {
        return;
    } else if (parseInt(addStudentToSectionBox.value) == -1) {
        section.students.splice(parseInt(removeStudentFromSectionBox.value), 1);
        section.currentSize--;
        populateRemoveAndAddStudentBoxesForSections();section.students.splice(parseInt(removeStudentFromSectionBox.value), 1);
        messageDiv.innerHTML = "Student Removed.";
    } else if (parseInt(removeStudentFromSectionBox.value) == -1) {
        section.addStudent(students[parseInt(addStudentToSectionBox.value)]);
        populateRemoveAndAddStudentBoxesForSections();
        messageDiv.innerHTML = "Student Added.";
    } else {
        section.addStudent(students[parseInt(addStudentToSectionBox.value)]);
        section.students.splice(parseInt(removeStudentFromSectionBox.value), 1);
        section.currentSize--;
        populateRemoveAndAddStudentBoxesForSections();
        messageDiv.innerHTML = "Student from add box added. Then Student from remove box removed from this section.";
    }
}


function populateSectionsTable(){
    sectionsTable.innerHTML = "";
    var firstRow = document.createElement('tr');
    var name = document.createElement("td"); name.innerHTML = "Name"; firstRow.appendChild(name);
    var teacher = document.createElement("td"); teacher.innerHTML = "Teacher"; firstRow.appendChild(teacher);
    var currentSize = document.createElement("td"); currentSize.innerHTML = "Current Size"; firstRow.appendChild(currentSize);
    var maxSize = document.createElement("td"); maxSize.innerHTML = "Max. Size"; firstRow.appendChild(maxSize);
    var students = document.createElement("td"); students.innerHTML = "Students"; firstRow.appendChild(students);
    sectionsTable.appendChild(firstRow);
    for (var i = 0; i < sections.length; i++){
        var currentSection = sections[i];
        var htmlRow = document.createElement("tr");
        var nameCell = document.createElement("td");
        var teacherCell = document.createElement("td");
        var currentSizeCell = document.createElement("td");
        var maxSizeCell = document.createElement("td");
        var studentsCell = document.createElement("td");
        var studentsSelectBox = document.createElement("select");
        nameCell.innerHTML = currentSection.name;
        teacherCell.innerHTML = currentSection.teacher.firstName + " " + currentSection.teacher.lastName;
        currentSizeCell.innerHTML = currentSection.currentSize;
        maxSizeCell.innerHTML = currentSection.maxSize;
        studentsCell.appendChild(studentsSelectBox);
        for (var k = 0; k < currentSection.students.length; k++){
            var newOption = document.createElement("option");
            newOption.innerHTML = currentSection.students[k].firstName + " " + currentSection.students[k].lastName;
            studentsSelectBox.appendChild(newOption);
        }
        htmlRow.appendChild(nameCell); htmlRow.appendChild(teacherCell); htmlRow.appendChild(teacherCell); htmlRow.appendChild(currentSizeCell);
        htmlRow.appendChild(maxSizeCell); htmlRow.appendChild(studentsCell);
        sectionsTable.appendChild(htmlRow);
    }
}

function populateTeachersTable() {
    teachersTable.innerHTML = "";
    var firstRow = document.createElement("tr");
    var name = document.createElement("td"); name.innerHTML = "Name"; firstRow.appendChild(name);
    var id = document.createElement("td"); id.innerHTML = "ID"; firstRow.appendChild(id);
    var subject = document.createElement("td"); subject.innerHTML = "Subject"; firstRow.appendChild(subject);
    teachersTable.appendChild(firstRow);
    for (var i = 0; i < teachers.length; i++){
        var currentTeacher = teachers[i];
        var newRow = document.createElement("tr"); teachersTable.appendChild(newRow);
        var currentName = document.createElement("td"); currentName.innerHTML = currentTeacher.firstName + " " + currentTeacher.lastName; newRow.appendChild(currentName);
        var currentId = document.createElement("td"); currentId.innerHTML = currentTeacher.id; newRow.appendChild(currentId);
        var currentSubject = document.createElement("td"); currentSubject.innerHTML = currentTeacher.subject; newRow.appendChild(currentSubject);
    }
}

function populateStudentsTable() {
    studentsTable.innerHTML = "";
    var firstRow = document.createElement("tr");
    var name = document.createElement("td"); name.innerHTML = "Name"; firstRow.appendChild(name);
    var id = document.createElement("td"); id.innerHTML = "ID"; firstRow.appendChild(id);
    var grade = document.createElement("td"); grade.innerHTML = "Grade"; firstRow.appendChild(grade);
    studentsTable.appendChild(firstRow);
    for (var i = 0; i < students.length; i++){
        var currentStudent = students[i];
        var newRow = document.createElement("tr"); studentsTable.appendChild(newRow);
        var currentName = document.createElement("td"); currentName.innerHTML = currentStudent.firstName + " " + currentStudent.lastName; newRow.appendChild(currentName);
        var currentId = document.createElement("td"); currentId.innerHTML = currentStudent.id; newRow.appendChild(currentId);
        var currentGrade = document.createElement("td"); currentGrade.innerHTML = currentStudent.grade; newRow.appendChild(currentGrade);
    }
}
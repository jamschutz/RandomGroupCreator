
function createGroups() {
    // load data
    var rawStudentData = document.getElementById('studentsList').value;
    var numGroups = document.getElementById('numWeeks').value;
    var groupSize = document.getElementById('groupSizes').value;
    console.log('got: ' + rawStudentData);
    console.log('num groups: ' + numGroups);
    console.log('group size: ' + groupSize);

    // parse students into array
    var students = getStudents(rawStudentData);

    // create dictionary for each student
    var studentGroupHistory = new Map();
    students.forEach(s => {
        studentGroupHistory.set(s, []);
    });

    var groups = getGroups(students, studentGroupHistory, groupSize);

    // print groups...
    for(let i = 0; i < groups.length; i++) {
        console.log('------------- GROUP ' + (i+1) + ' ----------------');
        for(let j = 0; j < groups[i].length; j++) {
            console.log(groups[i][j]);
        }
    }

    // clear previous groups...
    document.getElementById('groupsOutput').innerHTML = "";
    createGroupElement(groups, 'Week 1');
}



function getStudents(rawStudentData) {
    students = rawStudentData.split(',');

    for(var i = 0; i < students.length; i++) {
        students[i] = students[i].trim();
        console.log(students[i]);
    }

    return students;
}


function createGroupElement(groups, weekLabel) {
    // get groups output
    const body = document.getElementById('groupsOutput');
    
    // create header
    let header = document.createElement('h3');
    let headerLabel = document.createTextNode(weekLabel);
    header.appendChild(headerLabel);
    body.appendChild(header);

    // create groups
    let groupCounter = 1;
    for (let group of groups) {
        // create group div
        let groupDiv = document.createElement('div');

        // create "GROUP #: " label
        let groupLabel = document.createElement('b');
        groupLabel.appendChild(
            document.createTextNode(`Group ${groupCounter}: `)
        );
        groupDiv.appendChild(groupLabel);

        console.log(group);

        // list students
        let studentsList = '';
        for(let student of group) {
            studentsList += student + ', ';
        }
        // lop off trailing ', '
        studentsList = studentsList.substring(0, studentsList.length - 2);
        // add to group
        groupDiv.appendChild(
            document.createTextNode(studentsList)
        );

        body.appendChild(groupDiv);
        groupCounter++;
    }
    
}


function getGroups(students, studentGroupHistory, groupSizes) {
    var numGroups = Math.floor(students.length / groupSizes);
    console.log('going to make ' + numGroups + ' groups');

    var groups = [];
    for(let i = 0; i < numGroups; i++) {
        let group = new Array();
        groups.push(group);
    }

    // randomly assign each student to a group
    let counter = 0;
    students.forEach(s => {
        while(true) {
            // search for open group
            let randomGroup = Math.floor(Math.random() * numGroups);
            console.log('got random group: ' + randomGroup);
            if(groups[randomGroup].length <= Math.floor(counter / numGroups)) {
                counter++;
                groups[randomGroup].push(s);
                break;
            }
        }
    });

    return groups;
}
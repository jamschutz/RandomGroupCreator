
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
    createGroupElement(groups, 'Week1');
}



function getStudents(rawStudentData) {
    students = rawStudentData.split(',');

    for(var i = 0; i < students.length; i++) {
        students[i] = students[i].trim();
        console.log(students[i]);
    }

    return students;
}


function createGroupElement(groups, elementId) {
    // const body = document.getElementById('groupsOutput'), table = document.createElement('table');

    // // create headers
    // let thead = table.createTHead();
    // let headerRow = thead.insertRow();
    // thead.classList.add('table-element');
    // headerRow.classList.add('table-element');
    // for (let i = 0; i < groups.length; i++) {
    //     let th = document.createElement("th");
    //     let text = document.createTextNode("Group " + (i + 1));
    //     th.classList.add('table-element');
    //     // text.classList.add('table-element');
    //     th.appendChild(text);
    //     headerRow.appendChild(th);
    // }


    // // create groups
    // for (let group of groups) {
    //     let row = table.insertRow();
    //     row.classList.add('table-element');
    //     for(let student of group) {
    //         let cell = row.insertCell();
    //         let text = document.createTextNode(student);
    //         cell.classList.add('table-element');
    //         // text.classList.add('table-element');
    //         cell.appendChild(text);
    //     }
    // }
    // body.appendChild(table);
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
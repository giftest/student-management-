// Creating an SQLite database in-memory
const db = new SQL.Database();

// Creating a table for students
db.run("CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, name TEXT, grade TEXT)");

// Function to add a student to the database and update the table
function addStudent() {
    const name = document.getElementById('name').value;
    const grade = document.getElementById('grade').value;

    // Inserting data into the students table
    const stmt = db.prepare("INSERT INTO students (name, grade) VALUES (?, ?)");
    stmt.run(name, grade);

    // Clearing input fields
    document.getElementById('name').value = '';
    document.getElementById('grade').value = '';

    // Refreshing the student table
    displayStudents();
}

// Function to display students in the table
function displayStudents() {
    const table = document.getElementById('studentTable');

    // Clearing the table body
    table.innerHTML = "<tr><th>Name</th><th>Grade</th></tr>";

    // Fetching data from the students table
    const result = db.exec("SELECT * FROM students");

    // Displaying data in the table
    if (result[0] && result[0].values) {
        result[0].values.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    }
}

// Initial display of students
displayStudents();

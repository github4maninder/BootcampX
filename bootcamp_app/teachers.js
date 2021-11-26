const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: 'vagrant',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
values = [`%${cohortName}%`];

pool.query(`
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teachers.name;
`, values)
  .then(res => {
    //loop through each row!
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    })
  });
  
// pool.query (`
//   SELECT students.id as student_id, students.name as name, cohorts.name as cohort
//   FROM students
//   JOIN cohorts ON cohorts.id = cohort_id
//   WHERE cohorts.name LIKE $1
//   LIMIT $2;
//   `;
// .then(res => {
//   res.rows.forEach(row => {
//     console.log(`${row.cohort}: ${row.teacher}`);
//   })
// });
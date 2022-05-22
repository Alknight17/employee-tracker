USE employeeDb;


/* INSERT DEPARTMENTS */
INSERT INTO department (name)
VALUES ("Sound");
INSERT INTO department (name)
VALUES ("VFX");
INSERT INTO department (name)
VALUES ("Animation");
INSERT INTO department (name)
VALUES ("Editing");


/* INSERT ROLES */
INSERT INTO role (title, salary, department_id)
VALUES ("Sound Supervisor", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Boom Operator", 60000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Technical Director", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Background Artist", 80000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Compositor", 70000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Film Editor", 90000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ("Assistant Editor", 80000, 5);


/* INSERT EMPLOYEES */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Robert", "Johnson", 1, NULL );
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Stacy", "Wylde", 2, 1 );
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jason", "Fern", 3, NULL );
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kyra", "Peters", 4, NULL );
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Remy", "Onnet", 5, 2 );
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Robert", "Johnson", 6, NULL );
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Robert", "Johnson", 7, 3 );
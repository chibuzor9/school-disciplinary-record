CREATE DATABASE cosc333_db2; 
USE cosc333_db2; 

CREATE TABLE student( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL, 
    date_of_birth DATE NOT NULL, 
    email VARCHAR(50) NOT NULL, 
    parent_no VARCHAR(20) NOT NULL 
); 

CREATE TABLE incident( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    Incident_name VARCHAR(50) NOT NULL, 
    Incident_date DATE NOT NULL, 
    Incident_location VARCHAR(50) NOT NULL, 
    Incident_sl VARCHAR(50) NOT NULL 
); 

CREATE TABLE record ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    Disciplinary_Record_Description TEXT NOT NULL, 
    Disciplinary_Record_status VARCHAR(50) NOT NULL, 
    StudentID INT, 
    IncidentID INT, 
    FOREIGN KEY(StudentID) REFERENCES student(id) ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY(IncidentID) REFERENCES incident(id) ON DELETE CASCADE ON UPDATE CASCADE
); 

CREATE TABLE action ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    Disciplinary_Incident_Type VARCHAR(50) NOT NULL, 
    Disciplinary_action_Taken TEXT NOT NULL, 
    Disciplinary_Terms VARCHAR(50) NOT NULL 
); 

CREATE TABLE admin ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    Admin_name VARCHAR(50) NOT NULL, 
    Admin_date DATE NOT NULL, 
    Admin_location VARCHAR(50) NOT NULL, 
    Admin_sl VARCHAR(50) NOT NULL 
); 

CREATE TABLE appeal (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    Appeal_name VARCHAR(50) NOT NULL, 
    Appeal_reason TEXT NOT NULL, 
    Appeal_Status VARCHAR(50) NOT NULL,
    StudentID INT,
    IncidentID INT,
    FOREIGN KEY(StudentID) REFERENCES student(id) ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY(IncidentID) REFERENCES incident(id) ON DELETE CASCADE ON UPDATE CASCADE 
); 



USE users_db2;

CREATE TABLE users (
    id INT AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') NOT NULL,
    PRIMARY KEY (id, username)
);

INSERT INTO users (id, username, password, role) 
VALUES (1, 'admin', 'axios', 'admin');

INSERT INTO users (id, username, password, role) 
VALUES (2, '22/0060', 'axios', 'student');

INSERT INTO users (id, username, password, role) 
VALUES (2, '22/0035', 'axios', 'student');

ALTER TABLE users
ADD COLUMN StaffID INT NULL,
ADD COLUMN StudentID INT NULL;

ALTER TABLE users
ADD FOREIGN KEY (StudentID) REFERENCES cosc333_db2.student(id);




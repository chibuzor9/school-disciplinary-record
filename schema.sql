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

CREATE TABLE Incident( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    Incident_name VARCHAR(50) NOT NULL, 
    Incident_date DATE NOT NULL, 
    Incident_location VARCHAR(50) NOT NULL, 
    Incident_sl VARCHAR(50) NOT NULL 
); 

CREATE TABLE Disciplinary_Record ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    Disciplinary_Record_Description TEXT NOT NULL, 
    Disciplinary_Record_status VARCHAR(50) NOT NULL, 
    StudentID INT, 
    IncidentID INT, 
    CONSTRAINT fk_student FOREIGN KEY(StudentID) REFERENCES Students(StudentID) ON DELETE CASCADE ON UPDATE CASCADE, 
    CONSTRAINT fk_incident FOREIGN KEY(IncidentID) REFERENCES Incident(IncidentID) ON DELETE CASCADE ON UPDATE CASCADE
); 

CREATE TABLE Disciplinary_Action ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    Disciplinary_Incident_Type VARCHAR(50) NOT NULL, 
    Disciplinary_action_Taken TEXT NOT NULL, 
    Disciplinary_Terms VARCHAR(50) NOT NULL 
); 

CREATE TABLE Admin ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    Admin_name VARCHAR(50) NOT NULL, 
    Admin_date DATE NOT NULL, 
    Admin_location VARCHAR(50) NOT NULL, 
    Admin_sl VARCHAR(50) NOT NULL 
); 

CREATE TABLE Appeal (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    Appeal_name VARCHAR(50) NOT NULL, 
    Appeal_reason TEXT NOT NULL, 
    Appeal_Status VARCHAR(50) NOT NULL 
); 

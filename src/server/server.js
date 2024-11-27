import express from 'express';
import { createConnection } from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let db;

// Database connection function
async function connectToDatabase() {
	try {
		db = await createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'cosc333_db2',
		});
		console.log('Connected to MySQL database');
	} catch (err) {
		console.error('Database connection failed:', err);
	}
}

// Initialize database connection
connectToDatabase();

/** ********************************************************************************************* */

/** Student routes */
//Read Route
app.get('/api/students', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM STUDENTS',
		);
		res.json(results);
	} catch (err) {
		console.error('Error fetching students:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

//Post Route
app.post('/api/students', async (req, res) => {
	const {
		first_name,
		last_name,
		date_of_birth,
		email,
		parent_no,
	} = req.body;
	try {
		const [result] = await db.query(
			'INSERT INTO Students (first_name, last_name, date_of_birth, email, parent_no) VALUES (?, ?, ?, ?, ?)',
			[
				first_name,
				last_name,
				date_of_birth,
				email,
				parent_no,
			],
		);

		res.json({
			success: true,
			message: 'Student submitted successfully',
			appealId: result.insertId,
		});
	} catch (err) {
		console.error('Error submitting appeal:', err);
		res.status(500).json({ error: 'Database error' });
	}
});
/** ********************************************************************************************* */

/** ********************************************************************************************* */
// Incident Routes
// Get Route
app.get('/api/incidents', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM INCIDENT',
		);
		res.json(results);
	} catch (err) {
		console.error('Error fetching incidents:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

// Post Route
app.post('/api/incidents', async (req, res) => {
	const {
		Incident_name,
		Incident_date,
		Incident_location,
		Incident_sl,
	} = req.body;
	try {
		const [result] = await db.query(
			'INSERT INTO INCIDENT (Incident_name, Incident_date, Incident_location, Incident_sl) VALUES (?, ?, ?, ?)',
			[
				Incident_name,
				Incident_date,
				Incident_location,
				Incident_sl,
			],
		);

		res.json({
			success: true,
			message: 'Incident submitted successfully',
			appealId: result.insertId,
		});
	} catch (err) {
		console.error('Error submitting appeal:', err);
		res.status(500).json({ error: 'Database error' });
	}
});
/** ********************************************************************************************* */

/** ********************************************************************************************* */
// Admin routes
//Get route
app.get('/api/admins', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM ADMIN',
		);
		res.json(results);
	} catch (err) {
		console.error('Error fetching admins:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

//Post Route
app.post('/api/admins', async (req, res) => {
	const {
		admin_name,
		admin_date,
		admin_location,
		admin_sl,
	} = req.body;

	try {
		const [result] = await db.query(
			'INSERT INTO ADMIN (Admin_name, Admin_date, Admin_location, Admin_sl) VALUES (?, ?, ?, ?)',
			[
				admin_name,
				admin_date,
				admin_location,
				admin_sl,
			],
		);

		res.json({
			success: true,
			message: 'Admin submitted successfully',
			adminId: result.insertId,
		});
	} catch (err) {
		console.error('Error submitting admin:', err);
		res.status(500).json({ error: 'Database error' });
	}
});
/** ********************************************************************************************* */

/** ********************************************************************************************* */
// Appeal Routes
app.get('/api/appeals', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM APPEAL',
		);
		res.json(results);
	} catch (err) {
		console.error('Error fetching appeals:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

// Post Route
app.post('/api/appeals', async (req, res) => {
	const { appeal_name, appeal_reason, appeal_status } =
		req.body;
	try {
		const [result] = await db.query(
			'INSERT INTO APPEAL (appeal_name, appeal_reason, appeal_status) VALUES (?, ?, ?)',
			[appeal_name, appeal_reason, appeal_status],
		);

		res.json({
			success: true,
			message: 'Appeal submitted successfully',
			appealId: result.insertId,
		});
	} catch (err) {
		console.error('Error submitting appeal:', err);
		res.status(500).json({ error: 'Database error' });
	}
});
/** ********************************************************************************************* */

/** ********************************************************************************************* */
// Disciplinary Action routes
// Get Route
app.get('/api/disciplinary-actions', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM DISCIPLINARY_ACTION',
		);
		res.json(results);
	} catch (err) {
		console.error(
			'Error fetching disciplinary actions:',
			err,
		);
		res.status(500).json({ error: 'Database error' });
	}
});

// Post Route
app.post('/api/disciplinary-actions', async (req, res) => {
	const {
		Disciplinary_Incident_Type,
		Disciplinary_action_Taken,
		Disciplinary_Terms,
	} = req.body;
	try {
		const [result] = await db.query(
			'INSERT INTO DISCIPLINARY_ACTION (Disciplinary_Incident_Type, Disciplinary_action_Taken, Disciplinary_Terms) VALUES (?, ?, ?)',
			[
				Disciplinary_Incident_Type,
				Disciplinary_action_Taken,
				Disciplinary_Terms,
			],
		);

		res.json({
			success: true,
			message: 'Appeal submitted successfully',
			disciplinaryActionId: result.insertId,
		});
	} catch (err) {
		console.error(
			'Error submitting Disciplinary Action:',
			err,
		);
		res.status(500).json({ error: 'Database error' });
	}
});
/** ********************************************************************************************* */

/** ********************************************************************************************* */
// Disciplinary Record routes
//  Get Route
app.get('/api/disciplinary-records', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM DISCIPLINARY_RECORD',
		);
		res.json(results);
	} catch (err) {
		console.error(
			'Error fetching disciplinary records:',
			err,
		);
		res.status(500).json({ error: 'Database error' });
	}
});

// Post Route
app.post('/api/disciplinary-records', async (req, res) => {
	const {
		Disciplinary_Record_Description,
		Disciplinary_Record_status,
		StudentID,
		IncidentID,
	} = req.body;
	try {
		const [result] = await db.query(
			'INSERT INTO DISCIPLINARY_RECORD (Disciplinary_Record_Description, Disciplinary_Record_status, StudentID, IncidentID) VALUES (?, ?, ?, ?)',
			[
				Disciplinary_Record_Description,
				Disciplinary_Record_status,
				StudentID,
				IncidentID,
			],
		);

		res.json({
			success: true,
			message: 'Appeal submitted successfully',
			disciplinaryRecordId: result.insertId,
		});
	} catch (err) {
		console.error(
			'Error submitting Disciplinary Record:',
			err,
		);
		res.status(500).json({ error: 'Database error' });
	}
});
/** ********************************************************************************************* */

app.listen(PORT, () => {
	console.log(
		`Server is running on http://localhost:${PORT}`,
	);
});

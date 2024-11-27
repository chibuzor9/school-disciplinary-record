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

/** Incident Routes*/
// Get Route
app.get('/api/incidents', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM INCIDENT',
		);
		res.json(
			results,
		);
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

// Disciplinary Record routes
app.get('/api/disciplinary-records', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM DISCIPLINARY_RECORD',
		);
		res.json(
			results.length
				? results
				: dummyData.disciplinaryRecords,
		);
	} catch (err) {
		console.error(
			'Error fetching disciplinary records:',
			err,
		);
		res.status(500).json({ error: 'Database error' });
	}
});

// Disciplinary Action routes
app.get('/api/disciplinary-actions', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM DISCIPLINARY_ACTION',
		);
		res.json(
			results.length
				? results
				: dummyData.disciplinaryActions,
		);
	} catch (err) {
		console.error(
			'Error fetching disciplinary actions:',
			err,
		);
		res.status(500).json({ error: 'Database error' });
	}
});

// Admin routes
app.get('/api/admins', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM ADMIN',
		);
		res.json(
			results.length ? results : dummyData.admins,
		);
	} catch (err) {
		console.error('Error fetching admins:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

// Appeal routes
app.get('/api/appeals', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM APPEAL',
		);
		res.json(
			results.length ? results : dummyData.appeals,
		);
	} catch (err) {
		console.error('Error fetching appeals:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

// Submit Appeal route
app.post('/api/submit-appeal', async (req, res) => {
	const { appeal_name, appeal_rsn, appeal_se } = req.body;
	try {
		const [result] = await db.query(
			'INSERT INTO APPEAL (appeal_name, appeal_rsn, appeal_se) VALUES (?, ?, ?)',
			[appeal_name, appeal_rsn, appeal_se],
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

const dummyData = {
	disciplinaryRecords: [
		{
			id: 'DISR001',
			disr_des: 'First offense',
			disr_status: 'Active',
			student_id: 'STU001',
			incident_id: 'INC001',
		},
		{
			id: 'DISR002',
			disr_des: 'Repeated offense',
			disr_status: 'Active',
			student_id: 'STU002',
			incident_id: 'INC002',
		},
	],
	disciplinaryActions: [
		{
			id: 'DISA001',
			dis_it: 'Warning',
			action_taken: 'Verbal warning issued',
			dis_terms:
				'No further action if behavior improves',
		},
		{
			id: 'DISA002',
			dis_it: 'Suspension',
			action_taken: '3-day suspension',
			dis_terms: 'Must complete missed work',
		},
	],
	admins: [
		{
			id: 'ADM001',
			admin_name: 'Sarah Johnson',
			admin_date: '2023-01-01',
			admin_loc: 'Main Office',
			admin_sl: 'High',
		},
		{
			id: 'ADM002',
			admin_name: 'Michael Brown',
			admin_date: '2023-01-15',
			admin_loc: 'Discipline Office',
			admin_sl: 'Medium',
		},
	],
	appeals: [
		{
			id: 'APL001',
			appeal_name: 'Tardiness Appeal',
			appeal_rsn: 'Bus delay',
			appeal_se: 'Pending',
		},
		{
			id: 'APL002',
			appeal_name: 'Cheating Allegation Appeal',
			appeal_rsn: 'Misunderstanding of rules',
			appeal_se: 'Under Review',
		},
	],
};

app.listen(PORT, () => {
	console.log(
		`Server is running on http://localhost:${PORT}`,
	);
});

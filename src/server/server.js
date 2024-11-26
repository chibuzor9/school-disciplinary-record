import express, { json } from 'express';
import { createConnection } from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(json());

let db;

// Database connection function
async function connectToDatabase() {
	try {
		db = await createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'db_class',
		});
		console.log('Connected to MySQL database');
	} catch (err) {
		console.error('Database connection failed:', err);
	}
}

// Initialize database connection
connectToDatabase();

// Student-related routes
app.get('/api/group', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM grp_a',
		);
		res.json(
			results.length ? results : dummyData.students,
		);
	} catch (err) {
		console.error('Error fetching students:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

app.get('/api/incidents', async (req, res) => {
	try {
		res.json(dummyIncidents.incidents);
	} catch (err) {
		console.error('Error fetching students:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

/** 

Incidents routes
app.get('/api/incidents', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM incidents',
		);
		res.json(results.length ? results : dummyIncidents);
	} catch (err) {
		console.error('Error fetching incidents:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

// Staff routes
app.get('/api/staff', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM staff',
		);
		res.json(results.length ? results : dummyStaff);
	} catch (err) {
		console.error('Error fetching staff:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

// Appeals routes
app.get('/api/appeals', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM appeals',
		);
		res.json(results.length ? results : dummyAppeals);
	} catch (err) {
		console.error('Error fetching appeals:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

// Login route
app.post('/api/login', async (req, res) => {
	const { username, password } = req.body;
	try {
		const [results] = await db.query(
			'SELECT * FROM users WHERE username = ? AND password = ?',
			[username, password],
		);

		if (results.length > 0) {
			res.json({ success: true, user: results[0] });
		} else {
			res.status(401).json({
				success: false,
				message: 'Invalid credentials',
			});
		}
	} catch (err) {
		console.error('Login error:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

// Disciplinary Actions routes
app.get('/api/actions', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM disciplinary_actions',
		);
		res.json(results.length ? results : dummyActions);
	} catch (err) {
		console.error('Error fetching actions:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

// Submit Appeal route
app.post('/api/submit-appeal', async (req, res) => {
	const {
		student_id,
		incident_id,
		appeal_text,
		guardian_name,
		guardian_contact,
	} = req.body;
	try {
		const [result] = await db.query(
			'INSERT INTO appeals (student_id, incident_id, appeal_text, guardian_name, guardian_contact, status) VALUES (?, ?, ?, ?, ?, ?)',
			[
				student_id,
				incident_id,
				appeal_text,
				guardian_name,
				guardian_contact,
				'Pending',
			],
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

*/

const dummyData = {
	students: [
		{
			student_id: 'ST001',
			name: 'John Doe',
			cgpa: '3.5',
		},
		{
			student_id: 'ST002',
			name: 'Jane Smith',
			cgpa: '3.8',
		},
	],
};

const dummyIncidents = {incidents: [
	{
		id: 'INC001',
		student_id: 'STU001',
		description: 'Tardiness to morning assembly',
		date: '2023-05-15',
		status: 'Pending',
	},
	{
		id: 'INC002',
		student_id: 'STU001',
		description:
			'Unauthorized use of mobile phone during class',
		date: '2023-05-18',
		status: 'Under Review',
	},
	{
		id: 'INC003',
		student_id: 'STU001',
		description:
			'Failure to complete assigned homework',
		date: '2023-05-22',
		status: 'Resolved',
	},
	{
		id: 'INC004',
		student_id: 'STU002',
		description: 'Disruptive behavior in the cafeteria',
		date: '2023-05-20',
		status: 'Pending',
	},
	{
		id: 'INC005',
		student_id: 'STU002',
		description: 'Violation of dress code policy',
		date: '2023-05-23',
		status: 'Under Review',
	},
]};

const dummyStaff = [
	{
		id: 'STAFF001',
		name: 'John Smith',
		department: 'Administration',
	},
];

const dummyAppeals = [
	{
		id: 'AP001',
		student_id: 'STU001',
		incident_id: 'INC001',
		status: 'Pending',
	},
];

const dummyActions = [
	{
		id: 'ACT001',
		incident_id: 'INC001',
		action_type: 'Warning',
		description: 'First-time warning',
	},
];

app.listen(PORT, () => {
	console.log(
		`Server is running on http://localhost:${PORT}`,
	);
});

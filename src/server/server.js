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

// Generic CRUD operations
const crudOperations = (table) => {
	if (table[table.length - 1] === 's') {
		table = table.slice(0, -1); // Removes the last character
	}
	return {
		getAll: async (req, res) => {
			try {
				const [results] = await db.query(
					`SELECT * FROM ${table}`,
				);
				res.json(results);
			} catch (err) {
				console.error(
					`Error fetching ${table}:`,
					err,
				);
				res.status(500).json({
					error: 'Database error',
				});
			}
		},

		getOne: async (req, res) => {
			try {
				const [results] = await db.query(
					`SELECT * FROM ${table} WHERE id = ?`,
					[req.params.id],
				);
				if (results.length > 0) {
					res.json(results[0]);
				} else {
					res.status(404).json({
						error: 'Not found',
					});
				}
			} catch (err) {
				console.error(
					`Error fetching ${table} entry:`,
					err,
				);
				res.status(500).json({
					error: 'Database error',
				});
			}
		},

		create: async (req, res) => {
			try {
				const columns = Object.keys(req.body).join(
					', ',
				);
				const placeholders = Object.keys(req.body)
					.map(() => '?')
					.join(', ');
				const values = Object.values(req.body);

				const [result] = await db.query(
					`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
					values,
				);

				res.json({
					success: true,
					message: `${table} entry added successfully`,
					id: result.insertId,
				});
			} catch (err) {
				console.error(
					`Error adding ${table} entry:`,
					err,
				);
				res.status(500).json({
					error: 'Database error',
				});
			}
		},

		update: async (req, res) => {
			try {
				const id = req.params.id;
				const updates = Object.entries(req.body)
					// eslint-disable-next-line no-unused-vars
					.map(([key, value]) => `${key} = ?`)
					.join(', ');
				const values = [
					...Object.values(req.body),
					id,
				];

				await db.query(
					`UPDATE ${table} SET ${updates} WHERE id = ?`,
					values,
				);

				res.json({
					success: true,
					message: `${table} entry updated successfully`,
				});
			} catch (err) {
				console.error(
					`Error updating ${table} entry:`,
					err,
				);
				res.status(500).json({
					error: 'Database error',
				});
			}
		},

		delete: async (req, res) => {
			try {
				const id = req.params.id;

				await db.query(
					`DELETE FROM ${table} WHERE id = ?`,
					[id],
				);

				res.json({
					success: true,
					message: `${table} entry deleted successfully`,
				});
			} catch (err) {
				console.error(
					`Error deleting ${table} entry:`,
					err,
				);
				res.status(500).json({
					error: 'Database error',
				});
			}
		},
	};
};

// Apply CRUD operations to all tables
const tables = [
	'Student',
	'Incident',
	'Disciplinary_Record',
	'Disciplinary_Action',
	'Admin',
	'Appeal',
];

tables.forEach((table) => {
	const operations = crudOperations(table);

	app.get(
		`/api/${table.toLowerCase()}`,
		operations.getAll,
	);
	app.get(
		`/api/${table.toLowerCase()}/:id`,
		operations.getOne,
	);
	app.post(
		`/api/${table.toLowerCase()}`,
		operations.create,
	);
	app.put(
		`/api/${table.toLowerCase()}/:id`,
		operations.update,
	);
	app.delete(
		`/api/${table.toLowerCase()}/:id`,
		operations.delete,
	);
});

// Specific routes for Students
app.get('/api/student', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM Student',
		);
		res.json(results);
	} catch (err) {
		console.error('Error fetching students:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

app.post('/api/student', async (req, res) => {
	const {
		first_name,
		last_name,
		date_of_birth,
		email,
		parent_no,
	} = req.body;
	try {
		const [result] = await db.query(
			'INSERT INTO Student (first_name, last_name, date_of_birth, email, parent_no) VALUES (?, ?, ?, ?, ?)',
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
			message: 'Student added successfully',
			studentId: result.insertId,
		});
	} catch (err) {
		console.error('Error adding student:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

// Specific routes for Incidents
app.get('/api/incident', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM Incident',
		);
		res.json(results);
	} catch (err) {
		console.error('Error fetching incidents:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

app.post('/api/incident', async (req, res) => {
	const {
		Incident_name,
		Incident_date,
		Incident_location,
		Incident_sl,
	} = req.body;
	try {
		const [result] = await db.query(
			'INSERT INTO Incident (Incident_name, Incident_date, Incident_location, Incident_sl) VALUES (?, ?, ?, ?)',
			[
				Incident_name,
				Incident_date,
				Incident_location,
				Incident_sl,
			],
		);
		res.json({
			success: true,
			message: 'Incident added successfully',
			incidentId: result.insertId,
		});
	} catch (err) {
		console.error('Error adding incident:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

// Specific routes for Disciplinary Actions
app.get('/api/disciplinary-action', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM Disciplinary_Action',
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

app.post('/api/disciplinary-action', async (req, res) => {
	const {
		Disciplinary_Incident_Type,
		Disciplinary_action_Taken,
		Disciplinary_Terms,
	} = req.body;
	try {
		const [result] = await db.query(
			'INSERT INTO Disciplinary_Action (Disciplinary_Incident_Type, Disciplinary_action_Taken, Disciplinary_Terms) VALUES (?, ?, ?)',
			[
				Disciplinary_Incident_Type,
				Disciplinary_action_Taken,
				Disciplinary_Terms,
			],
		);
		res.json({
			success: true,
			message:
				'Disciplinary action added successfully',
			actionId: result.insertId,
		});
	} catch (err) {
		console.error(
			'Error adding disciplinary action:',
			err,
		);
		res.status(500).json({ error: 'Database error' });
	}
});

// Specific routes for Disciplinary Records
app.get('/api/disciplinary-record', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM Disciplinary_Record',
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

app.post('/api/disciplinary-record', async (req, res) => {
	const {
		Disciplinary_Record_Description,
		Disciplinary_Record_status,
		StudentID,
		IncidentID,
	} = req.body;
	try {
		const [result] = await db.query(
			'INSERT INTO Disciplinary_Record (Disciplinary_Record_Description, Disciplinary_Record_status, StudentID, IncidentID) VALUES (?, ?, ?, ?)',
			[
				Disciplinary_Record_Description,
				Disciplinary_Record_status,
				StudentID,
				IncidentID,
			],
		);
		res.json({
			success: true,
			message:
				'Disciplinary record added successfully',
			recordId: result.insertId,
		});
	} catch (err) {
		console.error(
			'Error adding disciplinary record:',
			err,
		);
		res.status(500).json({ error: 'Database error' });
	}
});

// Specific routes for Admins
app.get('/api/admin', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM Admin',
		);
		res.json(results);
	} catch (err) {
		console.error('Error fetching admins:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

app.post('/api/admin', async (req, res) => {
	const {
		Admin_name,
		Admin_date,
		Admin_location,
		Admin_sl,
	} = req.body;
	try {
		const [result] = await db.query(
			'INSERT INTO Admin (Admin_name, Admin_date, Admin_location, Admin_sl) VALUES (?, ?, ?, ?)',
			[
				Admin_name,
				Admin_date,
				Admin_location,
				Admin_sl,
			],
		);
		res.json({
			success: true,
			message: 'Admin added successfully',
			adminId: result.insertId,
		});
	} catch (err) {
		console.error('Error adding admin:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

// Specific routes for Appeals
app.get('/api/appeal', async (req, res) => {
	try {
		const [results] = await db.query(
			'SELECT * FROM Appeal',
		);
		res.json(results);
	} catch (err) {
		console.error('Error fetching appeals:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

app.post('/api/appeal', async (req, res) => {
	const { Appeal_name, Appeal_reason, Appeal_Status } =
		req.body;
	try {
		const [result] = await db.query(
			'INSERT INTO Appeal (Appeal_name, Appeal_reason, Appeal_Status) VALUES (?, ?, ?)',
			[Appeal_name, Appeal_reason, Appeal_Status],
		);
		res.json({
			success: true,
			message: 'Appeal added successfully',
			appealId: result.insertId,
		});
	} catch (err) {
		console.error('Error adding appeal:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

app.listen(PORT, () => {
	console.log(
		`Server is running on http://localhost:${PORT}`,
	);
});

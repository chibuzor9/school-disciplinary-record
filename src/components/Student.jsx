import { useState } from 'react';
import Login from './Login';

import StudentDashboard from './StudentDash';


const Student = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

	return (
		<>
			{isLoggedIn ? (
				<StudentDashboard /> // Show dashboard if logged in
			) : (
				<Login
					onSuccess={() => setIsLoggedIn(true)}
				/> // Pass success handler to Login
			)}
		</>
	);
};

export default Student;

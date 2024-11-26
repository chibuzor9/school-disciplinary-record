import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from 'react-router-dom';

import LandingPage from './components/LandingPage';
import LostPage from './components/LostPage';
import Student from './components/Student';
import Staff from './components/Staff';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route
					path="/staff"
					element={<Staff />}
				/>

				<Route
					path="/student"
					element={<Student />}
				/>
				<Route path="*" element={<LostPage />} />
			</Routes>
		</Router>
	);
};

export default App;

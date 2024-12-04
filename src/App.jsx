import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

import LandingPage from './components/LandingPage';
import LostPage from './components/LostPage';
import StudentDashboard from './components/StudentDash';
import AdminDashboard from './components/AdminDash';
import Login from './components/Login';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<Login />} />
				<Route
					path="/student"
					element={<StudentDashboard />}
				/>
				<Route
					path="/admin"
					element={<AdminDashboard />}
				/>
				<Route path="*" element={<LostPage />} />
			</Routes>
		</Router>
	);
};

export default App;

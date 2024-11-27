import { useState } from 'react';
import Login from './Login';

import StaffDash from './StaffDash';
import { useNavigate } from 'react-router-dom';

const Staff = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	return (
		<>
			{isLoggedIn ? (
				<StaffDash />
			) : (
				<Login
					onSuccess={(res) => {
						res === 'Admin'
							? navigate('/Admin')
							: setIsLoggedIn(true);
					}}
				/>
			)}
		</>
	);
};

export default Staff;

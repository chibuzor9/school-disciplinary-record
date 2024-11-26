import { useState } from 'react';
import Login from './Login';

import StaffDash from './StaffDash';

const Staff = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false); 

	return (
		<>
			{isLoggedIn ? (
				<StaffDash /> 
			) : (
				<Login
					onSuccess={() => setIsLoggedIn(true)}
				/> 
			)}
		</>
	);
};

export default Staff;

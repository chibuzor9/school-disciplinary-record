import {
	BookOpen,
	FileText,
	Home,
	Shield,
	Users,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
	{ name: 'Overview', href: '/teacher', icon: Home },
	{
		name: 'Students',
		href: '/staff/students',
		icon: Users,
	},
	{
		name: 'Incidents',
		href: '/staff/incidents',
		icon: Shield,
	},
	{
		name: 'Disciplinary Actions',
		href: '/staff/actions',
		icon: BookOpen,
	},
	{
		name: 'Appeals',
		href: '/staff/appeals',
		icon: FileText,
	},
];

export function Sidebar() {
	const location = useLocation(); // Get the current location

	return (
		<div className="flex h-full w-72 flex-col border-r bg-gray-100/40">
			<div className="flex h-14 lg:h-[60px] items-center border-b px-6">
				<Link
					to="/"
					className="flex items-center gap-2 font-semibold"
				>
					<Shield className="h-6 w-6" />
					<span>School System</span>
				</Link>
			</div>
			<div className="flex-1 overflow-auto py-2">
				<nav className="grid items-start px-4 text-sm font-medium">
					{navigation.map((item) => {
						const isActive =
							location.pathname === item.href; // Check if this item is active

						return (
							<Link
								key={item.name}
								to={item.href}
								className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
									isActive
										? 'bg-gray-200 text-gray-900 font-bold' // Active styles
										: 'text-gray-500 hover:text-gray-900' // Inactive styles
								}`}
							>
								<item.icon className="h-4 w-4" />
								{item.name}
							</Link>
						);
					})}
				</nav>
			</div>
		</div>
	);
}

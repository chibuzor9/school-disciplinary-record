import React from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from './ui/card';

interface Incident {
	id: string;
	student_id: string;
	description: string;
	date: string;
	status: string;
}

interface IncidentDetailsProps {
	incident: Incident;
}

const IncidentDetails: React.FC<IncidentDetailsProps> = ({
	incident,
}) => {
	return (
		<Card className="mb-6">
			<CardHeader>
				<CardTitle className="text-lg font-semibold text-customBlue">
					Incident Details
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<p>
					<span className="font-medium">
						Incident ID:
					</span>{' '}
					{incident.id}
				</p>
				<p>
					<span className="font-medium">
						Student ID:
					</span>{' '}
					{incident.student_id}
				</p>
				<p>
					<span className="font-medium">
						Date:
					</span>{' '}
					{incident.date}
				</p>
				<p>
					<span className="font-medium">
						Description:
					</span>{' '}
					{incident.description}
				</p>
				<p>
					<span className="font-medium">
						Status:
					</span>{' '}
					<span
						className={`px-2 py-1 rounded-full text-sm ${incident.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
					>
						{incident.status}
					</span>
				</p>
			</CardContent>
		</Card>
	);
};

export default IncidentDetails;

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Download } from 'lucide-react';

export function Reports() {
	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold">
					Comprehensive Reports
				</h2>
				<Button>
					<Download className="mr-2 h-4 w-4" />
					Export Report
				</Button>
			</div>

			<div className="grid gap-6">
				<Card>
					<CardHeader>
						<CardTitle>
							Student Performance Overview
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>
										Student ID
									</TableHead>
									<TableHead>
										Name
									</TableHead>
									<TableHead>
										CGPA
									</TableHead>
									<TableHead>
										Incidents
									</TableHead>
									<TableHead>
										Status
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>
										ST001
									</TableCell>
									<TableCell>
										John Smith
									</TableCell>
									<TableCell>
										3.8
									</TableCell>
									<TableCell>1</TableCell>
									<TableCell>
										<Badge variant="outline">
											Good Standing
										</Badge>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										ST002
									</TableCell>
									<TableCell>
										Sarah Johnson
									</TableCell>
									<TableCell>
										3.2
									</TableCell>
									<TableCell>2</TableCell>
									<TableCell>
										<Badge variant="secondary">
											Under Review
										</Badge>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>
							Incident Summary
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>
										Type
									</TableHead>
									<TableHead>
										Total Cases
									</TableHead>
									<TableHead>
										Resolved
									</TableHead>
									<TableHead>
										Pending
									</TableHead>
									<TableHead>
										Success Rate
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>
										Academic
									</TableCell>
									<TableCell>
										15
									</TableCell>
									<TableCell>
										12
									</TableCell>
									<TableCell>3</TableCell>
									<TableCell>
										80%
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										Behavioral
									</TableCell>
									<TableCell>8</TableCell>
									<TableCell>6</TableCell>
									<TableCell>2</TableCell>
									<TableCell>
										75%
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										Attendance
									</TableCell>
									<TableCell>
										20
									</TableCell>
									<TableCell>
										18
									</TableCell>
									<TableCell>2</TableCell>
									<TableCell>
										90%
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>
							Appeals Status
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>
										Appeal ID
									</TableHead>
									<TableHead>
										Student
									</TableHead>
									<TableHead>
										Related Incident
									</TableHead>
									<TableHead>
										Date Filed
									</TableHead>
									<TableHead>
										Status
									</TableHead>
									<TableHead>
										Decision
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>
										AP001
									</TableCell>
									<TableCell>
										Emma Wilson
									</TableCell>
									<TableCell>
										Academic Misconduct
									</TableCell>
									<TableCell>
										2024-01-15
									</TableCell>
									<TableCell>
										<Badge>
											Under Review
										</Badge>
									</TableCell>
									<TableCell>
										Pending
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										AP002
									</TableCell>
									<TableCell>
										James Davis
									</TableCell>
									<TableCell>
										Attendance
									</TableCell>
									<TableCell>
										2024-01-14
									</TableCell>
									<TableCell>
										<Badge variant="outline">
											Completed
										</Badge>
									</TableCell>
									<TableCell>
										Approved
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

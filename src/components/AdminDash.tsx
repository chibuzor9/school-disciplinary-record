'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from './ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';
import { useToast } from './ui/use-toast';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import axios from 'axios';
import React from 'react';

const studentSchema = z.object({
	first_name: z.string().min(1, 'First name is required'),
	last_name: z.string().min(1, 'Last name is required'),
	date_of_birth: z.date({
		required_error: 'Date of birth is required',
	}),
	email: z.string().email('Invalid email'),
	parent_no: z
		.string()
		.min(1, 'Parent number is required'),
});

const incidentSchema = z.object({
	Incident_name: z
		.string()
		.min(1, 'Incident name is required'),
	Incident_date: z.date({
		required_error: 'Incident date is required',
	}),
	Incident_location: z
		.string()
		.min(1, 'Incident location is required'),
	Incident_sl: z
		.string()
		.min(1, 'Severity level is required'),
});

const disciplinaryActionSchema = z.object({
	Disciplinary_Incident_Type: z
		.string()
		.min(1, 'Incident type is required'),
	Disciplinary_action_Taken: z
		.string()
		.min(1, 'Action taken is required'),
	Disciplinary_Terms: z
		.string()
		.min(1, 'Terms are required'),
});

const disciplinaryRecordSchema = z.object({
	Disciplinary_Record_Description: z
		.string()
		.min(1, 'Description is required')
		.max(
			255,
			'Description cannot exceed 255 characters',
		),
	Disciplinary_Record_status: z
		.string()
		.min(1, 'Status is required')
		.max(50, 'Status cannot exceed 50 characters'),
	StudentID: z
		.number()
		.int('Student ID must be an integer')
		.positive('Student ID must be a positive number'),
	IncidentID: z
		.number()
		.int('Incident ID must be an integer')
		.positive('Incident ID must be a positive number'),
});

const adminSchema = z.object({
	admin_name: z.string().min(1, 'Admin name is required'),
	admin_date: z.date({
		required_error: 'Date of Registration is required',
	}),
	admin_location: z
		.string()
		.min(1, 'Location is required'),
	admin_sl: z
		.string()
		.min(1, 'Severity Level is required'),
});

const appealSchema = z.object({
	appeal_name: z
		.string()
		.min(1, 'Appeal name is required'),
	appeal_reason: z.string().min(20, 'Reason is required'),
	appeal_status: z
		.string()
		.min(1, 'Appeal Status is required'),
});

interface Student {
	StudentID: number;
	first_name: string;
	last_name: string;
	date_of_birth: Date;
	email: string;
	parent_no: string;
}

interface Incident {
	IncidentID: number;
	Incident_name: string;
	Incident_date: Date;
	Incident_location: string;
	Incident_sl: string;
}

interface DisciplinaryAction {
	DisrActionID: number;
	Disciplinary_Incident_Type: string;
	Disciplinary_action_Taken: string;
	Disciplinary_Terms: string;
}

interface DisciplinaryRecord {
	recordID: number;
	Disciplinary_Record_Description: string;
	Disciplinary_Record_status: string;
	StudentID: number;
	IncidentID: number;
}

interface Admin {
	AdminID: number;
	Admin_name: string;
	Admin_date: Date;
	Admin_location: string;
	Admin_sl: string;
}

interface Appeal {
	AppealID: number;
	Appeal_name: string;
	Appeal_reason: string;
	Appeal_Status: string;
}

export default function StaffDashboard() {
	const { toast } = useToast();
	const [students, setStudents] = useState<Student[]>([]);
	const [admins, setAdmins] = useState<Admin[]>([]);
	const [appeals, setAppeals] = useState<Appeal[]>([]);
	const [records, setRecords] = useState<
		DisciplinaryRecord[]
	>([]);
	const [incidents, setIncidents] = useState<Incident[]>(
		[],
	);
	const [actions, setActions] = useState<
		DisciplinaryAction[]
	>([]);
	const [activeTab, setActiveTab] = useState('students');

	const studentForm = useForm({
		resolver: zodResolver(studentSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
			date_of_birth: new Date(),
			email: '',
			parent_no: '',
		},
	});

	const incidentForm = useForm({
		resolver: zodResolver(incidentSchema),
		defaultValues: {
			Incident_name: '',
			Incident_date: new Date(),
			Incident_location: '',
			Incident_sl: '',
		},
	});

	const actionForm = useForm({
		resolver: zodResolver(disciplinaryActionSchema),
		defaultValues: {
			Disciplinary_Incident_Type: '',
			Disciplinary_action_Taken: '',
			Disciplinary_Terms: '',
		},
	});

	const recordForm = useForm({
		resolver: zodResolver(disciplinaryRecordSchema),
		defaultValues: {
			Disciplinary_Record_Description: '',
			Disciplinary_Record_status: '',
			StudentID: 0,
			IncidentID: 0,
		},
	});

	const adminForm = useForm({
		resolver: zodResolver(adminSchema),
		defaultValues: {
			admin_name: '',
			admin_date: new Date(),
			admin_location: '',
			admin_sl: '',
		},
	});

	const appealForm = useForm({
		resolver: zodResolver(appealSchema),
		defaultValues: {
			appeal_name: '',
			appeal_reason: '',
			appeal_status: '',
		},
	});

	useEffect(() => {
		fetchStudents();
		fetchIncidents();
		fetchActions();
		fetchAdmins();
		fetchAppeals();
		fetchRecords();
	}, []);

	const fetchStudents = async () => {
		try {
			const response = await axios.get(
				'http://localhost:5000/api/students',
			);
			setStudents(
				response.data.map((student: any) => ({
					...student,
					date_of_birth: new Date(
						student.date_of_birth,
					),
				})),
			);
		} catch (error) {
			console.error(
				'Error fetching students:',
				error,
			);
			toast({
				title: 'Error',
				description: 'Failed to fetch students',
				variant: 'destructive',
			});
		}
	};

	const fetchAdmins = async () => {
		try {
			const response = await axios.get(
				'http://localhost:5000/api/admins',
			);
			setAdmins(response.data);
		} catch (error) {
			console.error('Error fetching admins:', error);
			toast({
				title: 'Error',
				description: 'Failed to fetch admins',
				variant: 'destructive',
			});
		}
	};

	const fetchAppeals = async () => {
		try {
			const response = await axios.get(
				'http://localhost:5000/api/appeals',
			);
			setAppeals(response.data);
		} catch (error) {
			console.error('Error fetching Appeals:', error);
			toast({
				title: 'Error',
				description: 'Failed to fetch Appeals',
				variant: 'destructive',
			});
		}
	};

	const fetchIncidents = async () => {
		try {
			const response = await axios.get(
				'http://localhost:5000/api/incidents',
			);
			setIncidents(
				response.data.map((incident: any) => ({
					...incident,
					Incident_date: new Date(
						incident.Incident_date,
					),
				})),
			);
		} catch (error) {
			console.error(
				'Error fetching incidents:',
				error,
			);
			toast({
				title: 'Error',
				description: 'Failed to fetch incidents',
				variant: 'destructive',
			});
		}
	};

	const fetchActions = async () => {
		try {
			const response = await axios.get(
				'http://localhost:5000/api/disciplinary-actions',
			);
			setActions(response.data);
		} catch (error) {
			console.error('Error fetching actions:', error);
			toast({
				title: 'Error',
				description:
					'Failed to fetch disciplinary actions',
				variant: 'destructive',
			});
		}
	};

	const fetchRecords = async () => {
		try {
			const response = await axios.get(
				'http://localhost:5000/api/disciplinary-records',
			);
			setRecords(response.data);
		} catch (error) {
			console.error('Error fetching records:', error);
			toast({
				title: 'Error',
				description:
					'Failed to fetch disciplinary records',
				variant: 'destructive',
			});
		}
	};

	const onSubmitStudent = async (
		data: z.infer<typeof studentSchema>,
	) => {
		try {
			const formattedData = {
				...data,
				date_of_birth: data.date_of_birth
					.toISOString()
					.split('T')[0],
			};
			await axios.post(
				'http://localhost:5000/api/students',
				formattedData,
			);
			toast({
				title: 'Success',
				description: 'Student added successfully',
			});
			studentForm.reset();
			fetchStudents();
		} catch (error) {
			console.error('Error adding student:', error);
			toast({
				title: 'Error',
				description: 'Failed to add student',
				variant: 'destructive',
			});
		}
	};

	const onSubmitIncident = async (
		data: z.infer<typeof incidentSchema>,
	) => {
		try {
			const formattedData = {
				...data,
				Incident_date:
					data.Incident_date.toISOString().split(
						'T',
					)[0],
			};
			await axios.post(
				'http://localhost:5000/api/incidents',
				formattedData,
			);
			toast({
				title: 'Success',
				description: 'Incident added successfully',
			});
			incidentForm.reset();
			fetchIncidents();
		} catch (error) {
			console.error('Error adding incident:', error);
			toast({
				title: 'Error',
				description: 'Failed to add incident',
				variant: 'destructive',
			});
		}
	};

	const onSubmitAction = async (
		data: z.infer<typeof disciplinaryActionSchema>,
	) => {
		try {
			await axios.post(
				'http://localhost:5000/api/disciplinary-actions',
				data,
			);
			toast({
				title: 'Success',
				description:
					'Disciplinary action added successfully',
			});
			actionForm.reset();
			fetchActions();
		} catch (error) {
			console.error('Error adding action:', error);
			toast({
				title: 'Error',
				description:
					'Failed to add disciplinary action',
				variant: 'destructive',
			});
		}
	};

	const onSubmitRecord = async (
		data: z.infer<typeof disciplinaryRecordSchema>,
	) => {
		try {
			await axios.post(
				'http://localhost:5000/api/disciplinary-records',
				data,
			);
			toast({
				title: 'Success',
				description:
					'Disciplinary Record added successfully',
			});
			recordForm.reset();
			fetchRecords();
		} catch (error) {
			console.error('Error adding record:', error);
			toast({
				title: 'Error',
				description:
					'Failed to add disciplinary record',
				variant: 'destructive',
			});
		}
	};

	const onSubmitAdmin = async (
		data: z.infer<typeof adminSchema>,
	) => {
		try {
			await axios.post(
				'http://localhost:5000/api/admins',
				data,
			);
			toast({
				title: 'Success',
				description: 'Admin added successfully',
			});
			adminForm.reset();
			fetchAdmins();
		} catch (error) {
			console.error('Error adding admin:', error);
			toast({
				title: 'Error',
				description:
					'Failed to add admin. Please try again.',
				variant: 'destructive',
			});
		}
	};

	const onSubmitAppeal = async (
		data: z.infer<typeof appealSchema>,
	) => {
		try {
			await axios.post(
				'http://localhost:5000/api/appeals',
				data,
			);
			toast({
				title: 'Success',
				description: 'Appeal added successfully',
			});
			appealForm.reset();
			fetchAppeals();
		} catch (error) {
			console.error('Error adding appeal:', error);
			toast({
				title: 'Error',
				description:
					'Failed to add appeal. Please try again.',
				variant: 'destructive',
			});
		}
	};

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">
				DBA Dashboard
			</h1>
			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
			>
				<TabsList>
					<TabsTrigger value="students">
						Students
					</TabsTrigger>
					<TabsTrigger value="incidents">
						Incidents
					</TabsTrigger>
					<TabsTrigger value="actions">
						Disciplinary Actions
					</TabsTrigger>
					<TabsTrigger value="records">
						Disciplinary Records
					</TabsTrigger>
					<TabsTrigger value="admins">
						Admins
					</TabsTrigger>
					<TabsTrigger value="appeals">
						Appeals
					</TabsTrigger>
				</TabsList>

				<TabsContent value="students">
					<Card>
						<CardHeader>
							<CardTitle>
								Add Student
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={studentForm.handleSubmit(
									onSubmitStudent,
								)}
								className="space-y-4"
							>
								<Input
									{...studentForm.register(
										'first_name',
									)}
									placeholder="First Name"
								/>
								<Input
									{...studentForm.register(
										'last_name',
									)}
									placeholder="Last Name"
								/>
								<Input
									{...studentForm.register(
										'date_of_birth',
										{
											valueAsDate:
												true,
										},
									)}
									type="date"
									placeholder="Date of Birth"
								/>
								<Input
									{...studentForm.register(
										'email',
									)}
									type="email"
									placeholder="Email"
								/>
								<Input
									{...studentForm.register(
										'parent_no',
									)}
									placeholder="Parent Number"
								/>
								<Button
									type="submit"
									className="w-full"
								>
									Add Student
								</Button>
							</form>
						</CardContent>
					</Card>

					<Card className="mt-6">
						<CardHeader>
							<CardTitle>
								Students List
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>
											ID
										</TableHead>
										<TableHead>
											Name
										</TableHead>
										<TableHead>
											Date of Birth
										</TableHead>
										<TableHead>
											Email
										</TableHead>
										<TableHead>
											Parent Number
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{students.map(
										(student) => (
											<TableRow
												key={
													student.StudentID
												}
											>
												<TableCell>
													{
														student.StudentID
													}
												</TableCell>
												<TableCell>{`${student.first_name} ${student.last_name}`}</TableCell>
												<TableCell>
													{student.date_of_birth
														.toLocaleDateString(
															'en-GB',
															{
																day: '2-digit',
																month: 'short',
																year: 'numeric',
															},
														)
														.replace(
															/ /g,
															'-',
														)}
												</TableCell>
												<TableCell>
													{
														student.email
													}
												</TableCell>
												<TableCell>
													{
														student.parent_no
													}
												</TableCell>
											</TableRow>
										),
									)}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="incidents">
					<Card>
						<CardHeader>
							<CardTitle>
								Add Incident
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={incidentForm.handleSubmit(
									onSubmitIncident,
								)}
								className="space-y-4"
							>
								<Input
									{...incidentForm.register(
										'Incident_name',
									)}
									placeholder="Incident Name"
								/>
								<Input
									{...incidentForm.register(
										'Incident_date',
										{
											valueAsDate:
												true,
										},
									)}
									type="date"
									placeholder="Incident Date"
								/>
								<Input
									{...incidentForm.register(
										'Incident_location',
									)}
									placeholder="Incident Location"
								/>
								<Input
									{...incidentForm.register(
										'Incident_sl',
									)}
									placeholder="Severity Level"
								/>
								<Button
									type="submit"
									className="w-full"
								>
									Add Incident
								</Button>
							</form>
						</CardContent>
					</Card>

					<Card className="mt-6">
						<CardHeader>
							<CardTitle>
								Incidents List
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>
											ID
										</TableHead>
										<TableHead>
											Name
										</TableHead>
										<TableHead>
											Date
										</TableHead>
										<TableHead>
											Location
										</TableHead>
										<TableHead>
											Severity Level
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{incidents.map(
										(incident) => (
											<TableRow
												key={
													incident.IncidentID
												}
											>
												<TableCell>
													{
														incident.IncidentID
													}
												</TableCell>
												<TableCell>
													{
														incident.Incident_name
													}
												</TableCell>
												<TableCell>
													{incident.Incident_date.toLocaleDateString(
														'en-GB',
														{
															day: '2-digit',
															month: 'short',
															year: 'numeric',
														},
													).replace(
														/ /g,
														'-',
													)}
												</TableCell>
												<TableCell>
													{
														incident.Incident_location
													}
												</TableCell>
												<TableCell>
													{
														incident.Incident_sl
													}
												</TableCell>
											</TableRow>
										),
									)}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="actions">
					<Card>
						<CardHeader>
							<CardTitle>
								Add Disciplinary Action
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={actionForm.handleSubmit(
									onSubmitAction,
								)}
								className="space-y-4"
							>
								<Input
									{...actionForm.register(
										'Disciplinary_Incident_Type',
									)}
									placeholder="Incident Type"
								/>
								<Textarea
									{...actionForm.register(
										'Disciplinary_action_Taken',
									)}
									placeholder="Action Taken"
								/>
								<Input
									{...actionForm.register(
										'Disciplinary_Terms',
									)}
									placeholder="Terms"
								/>
								<Button
									type="submit"
									className="w-full"
								>
									Add Action
								</Button>
							</form>
						</CardContent>
					</Card>

					<Card className="mt-6">
						<CardHeader>
							<CardTitle>
								Disciplinary Actions List
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>
											ID
										</TableHead>
										<TableHead>
											Incident Type
										</TableHead>
										<TableHead>
											Action Taken
										</TableHead>
										<TableHead>
											Terms
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{actions.map(
										(action) => (
											<TableRow
												key={
													action.DisrActionID
												}
											>
												<TableCell>
													{
														action.DisrActionID
													}
												</TableCell>
												<TableCell>
													{
														action.Disciplinary_Incident_Type
													}
												</TableCell>
												<TableCell>
													{
														action.Disciplinary_action_Taken
													}
												</TableCell>
												<TableCell>
													{
														action.Disciplinary_Terms
													}
												</TableCell>
											</TableRow>
										),
									)}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="records">
					<Card>
						<CardHeader>
							<CardTitle>
								Add Disciplinary Records
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={recordForm.handleSubmit(
									onSubmitRecord,
								)}
								className="space-y-4"
							>
								<Input
									{...recordForm.register(
										'Disciplinary_Record_Description',
									)}
									placeholder="Record Description"
								/>
								<Textarea
									{...recordForm.register(
										'Disciplinary_Record_status',
									)}
									placeholder="Status"
								/>
								<Input
									{...recordForm.register(
										'StudentID',
									)}
									placeholder="Student ID"
								/>
								<Input
									{...recordForm.register(
										'IncidentID',
									)}
									placeholder="Incident ID"
								/>
								<Button
									type="submit"
									className="w-full"
								>
									Add Record
								</Button>
							</form>
						</CardContent>
					</Card>

					<Card className="mt-6">
						<CardHeader>
							<CardTitle>
								Disciplinary Records List
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>
											ID
										</TableHead>
										<TableHead>
											Description
										</TableHead>
										<TableHead>
											Status
										</TableHead>
										<TableHead>
											Student ID
										</TableHead>
										<TableHead>
											Incident ID
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{records.map(
										(record) => (
											<TableRow
												key={
													record.recordID
												}
											>
												<TableCell>
													{
														record.recordID
													}
												</TableCell>
												<TableCell>
													{
														record.Disciplinary_Record_Description
													}
												</TableCell>
												<TableCell>
													{
														record.Disciplinary_Record_status
													}
												</TableCell>
												<TableCell>
													{
														record.StudentID
													}
												</TableCell>
												<TableCell>
													{
														record.IncidentID
													}
												</TableCell>
											</TableRow>
										),
									)}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="admins">
					<Card>
						<CardHeader>
							<CardTitle>Add Admin</CardTitle>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={adminForm.handleSubmit(
									onSubmitAdmin,
								)}
								className="space-y-4"
							>
								<Input
									{...adminForm.register(
										'admin_name',
									)}
									placeholder="Name of Admin"
								/>
								<Input
									{...adminForm.register(
										'admin_date',
										{
											valueAsDate:
												true,
										},
									)}
									type="date"
									placeholder="Admin's Register Date"
								/>
								<Input
									{...adminForm.register(
										'admin_location',
									)}
									placeholder="Admin's Location"
								/>
								<Input
									{...adminForm.register(
										'admin_sl',
									)}
									placeholder="Admin's Severity Level"
								/>
								<Button
									type="submit"
									className="w-full"
								>
									Add Admin
								</Button>
							</form>
						</CardContent>
					</Card>

					<Card className="mt-6">
						<CardHeader>
							<CardTitle>
								Admins List
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>
											ID
										</TableHead>
										<TableHead>
											Name
										</TableHead>
										<TableHead>
											Register Date
										</TableHead>
										<TableHead>
											Location
										</TableHead>
										<TableHead>
											Severity Level
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{admins.map((admin) => (
										<TableRow
											key={
												admin.AdminID
											}
										>
											<TableCell>
												{
													admin.AdminID
												}
											</TableCell>
											<TableCell>
												{
													admin.Admin_name
												}
											</TableCell>
											<TableCell>
												{new Date(
													admin.Admin_date,
												)
													.toLocaleDateString(
														'en-GB',
														{
															day: '2-digit',
															month: 'short',
															year: 'numeric',
														},
													)
													.replace(
														/ /g,
														'-',
													)}
											</TableCell>
											<TableCell>
												{
													admin.Admin_location
												}
											</TableCell>
											<TableCell>
												{
													admin.Admin_sl
												}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="appeals">
					<Card>
						<CardHeader>
							<CardTitle>
								Add Appeal
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={appealForm.handleSubmit(
									onSubmitAppeal,
								)}
								className="space-y-4"
							>
								<Input
									{...appealForm.register(
										'appeal_name',
									)}
									placeholder="Name of Appeal"
								/>
								<Input
									{...appealForm.register(
										'appeal_reason',
									)}
									placeholder="Reason of Appeal"
								/>
								<Input
									{...appealForm.register(
										'appeal_status',
									)}
									placeholder="Appeal's Status"
								/>
								<Button
									type="submit"
									className="w-full"
								>
									Add Appeal
								</Button>
							</form>
						</CardContent>
					</Card>

					<Card className="mt-6">
						<CardHeader>
							<CardTitle>
								Appeals List
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>
											ID
										</TableHead>
										<TableHead>
											Name
										</TableHead>
										<TableHead>
											Reason
										</TableHead>
										<TableHead>
											Status
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{appeals.map(
										(appeal) => (
											<TableRow
												key={
													appeal.AppealID
												}
											>
												<TableCell>
													{
														appeal.AppealID
													}
												</TableCell>
												<TableCell>
													{
														appeal.Appeal_name
													}
												</TableCell>
												<TableCell>
													{
														appeal.Appeal_reason
													}
												</TableCell>
												<TableCell>
													{
														appeal.Appeal_Status
													}
												</TableCell>
											</TableRow>
										),
									)}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}

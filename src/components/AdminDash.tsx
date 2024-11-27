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

interface Student {
	StudentID: number;
	first_name: string;
	last_name: string;
	date_of_birth: Date;
	email: string;
	parent_no: string;
	disciplinary_history: DisciplinaryAction[]; // New field for disciplinary history
}

interface Incident {
	IncidentID: number;
	Incident_name: string;
	Incident_date: Date;
	Incident_location: string;
	Incident_sl: string;
	assigned_to: string; // New field for staff assignment
	status: 'pending' | 'under investigation' | 'resolved'; // New field for status tracking
}

interface DisciplinaryAction {
	DisrActionID: number;
	Disciplinary_Incident_Type: string;
	Disciplinary_action_Taken: string;
	Disciplinary_Terms: string;
	effectiveness: 'effective' | 'ineffective'; // New field for tracking effectiveness
}

export default function StaffDashboard() {
	const { toast } = useToast();
	const [students, setStudents] = useState<Student[]>([]);
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

	useEffect(() => {
		fetchStudents();
		fetchIncidents();
		fetchActions();
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

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">
				Staff Dashboard
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
			</Tabs>
		</div>
	);
}

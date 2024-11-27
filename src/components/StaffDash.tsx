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
	date_of_birth: z
		.string()
		.min(1, 'Date of birth is required'),
	email: z.string().email('Invalid email'),
	parent_no: z
		.string()
		.min(1, 'Parent number is required'),
});

const actionSchema = z.object({
	incident_id: z
		.string()
		.min(1, 'Incident ID is required'),
	dis_it: z.string().min(1, 'Action Type is required'),
	action_taken: z
		.string()
		.min(1, 'Action taken is required'),
	dis_terms: z.string().min(1, 'Terms are required'),
});

interface Student {
	first_name: string;
	last_name: string;
	date_of_birth: string;
	email: string;
	parent_no: string;
}

interface Incident {
	id: string;
	inc_name: string;
	inc_date: string;
	inc_loc: string;
	inc_sl: string;
}

interface DisciplinaryAction {
	id: string;
	incident_id: string;
	dis_it: string;
	action_taken: string;
	dis_terms: string;
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
	const [loadingStudents, setLoadingStudents] =
		useState(true);
	const [loadingIncidents, setLoadingIncidents] =
		useState(true);
	const [loadingActions, setLoadingActions] =
		useState(true);
	const [activeTab, setActiveTab] = useState('students');

	const studentForm = useForm({
		resolver: zodResolver(studentSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
			date_of_birth: '',
			email: '',
			parent_no: '',
		},
	});

	const actionForm = useForm({
		resolver: zodResolver(actionSchema),
		defaultValues: {
			incident_id: '',
			dis_it: '',
			action_taken: '',
			dis_terms: '',
		},
	});

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await axios.get(
					'http://localhost:5000/api/students',
				);
				setStudents(response.data);
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
			} finally {
				setLoadingStudents(false);
			}
		};

		fetchStudents();
	}, []);

	useEffect(() => {
		const fetchIncidents = async () => {
			try {
				const response = await axios.get(
					'http://localhost:5000/api/incidents',
				);
				setIncidents(response.data);
			} catch (error) {
				console.error(
					'Error fetching incidents:',
					error,
				);
				toast({
					title: 'Error',
					description:
						'Failed to fetch incidents',
					variant: 'destructive',
				});
			} finally {
				setLoadingIncidents(false);
			}
		};

		fetchIncidents();
	}, []);

	useEffect(() => {
		const fetchActions = async () => {
			try {
				const response = await axios.get(
					'http://localhost:5000/api/disciplinary-actions',
				);
				setActions(response.data);
			} catch (error) {
				console.error(
					'Error fetching actions:',
					error,
				);
				toast({
					title: 'Error',
					description:
						'Failed to fetch disciplinary actions',
					variant: 'destructive',
				});
			} finally {
				setLoadingActions(false);
			}
		};

		fetchActions();
	}, []);

	const onSubmitStudent = async (
		data: z.infer<typeof studentSchema>,
	) => {
		try {
			await axios.post(
				'http://localhost:5000/api/students',
				data,
			);
			toast({
				title: 'Success',
				description: 'Student added successfully',
			});
			studentForm.reset();
			const response = await axios.get(
				'http://localhost:5000/api/students',
			);
			setStudents(response.data);
		} catch (error) {
			console.error('Error adding student:', error);
			toast({
				title: 'Error',
				description: 'Failed to add student',
				variant: 'destructive',
			});
		}
	};

	const onSubmitAction = async (
		data: z.infer<typeof actionSchema>,
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
			const response = await axios.get(
				'http://localhost:5000/api/disciplinary-actions',
			);
			setActions(response.data);
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
													{
														student.date_of_birth
													}
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
										<TableHead>
											Actions
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{incidents.map(
										(incident) => (
											<TableRow
												key={
													incident.id
												}
											>
												<TableCell>
													{
														incident.id
													}
												</TableCell>
												<TableCell>
													{
														incident.inc_name
													}
												</TableCell>
												<TableCell>
													{
														incident.inc_date
													}
												</TableCell>
												<TableCell>
													{
														incident.inc_loc
													}
												</TableCell>
												<TableCell>
													{
														incident.inc_sl
													}
												</TableCell>
												<TableCell>
													<Button
														onClick={() =>
															actionForm.setValue(
																'incident_id',
																incident.id,
															)
														}
														className="mr-2"
													>
														Add
														Action
													</Button>
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
										'incident_id',
									)}
									placeholder="Incident ID"
								/>
								<Input
									{...actionForm.register(
										'dis_it',
									)}
									placeholder="Action Type"
								/>
								<Input
									{...actionForm.register(
										'action_taken',
									)}
									placeholder="Action Taken"
								/>
								<Textarea
									{...actionForm.register(
										'dis_terms',
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
											Incident ID
										</TableHead>
										<TableHead>
											Action Type
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
													action.id
												}
											>
												<TableCell>
													{
														action.incident_id
													}
												</TableCell>
												<TableCell>
													{
														action.dis_it
													}
												</TableCell>
												<TableCell>
													{
														action.action_taken
													}
												</TableCell>
												<TableCell>
													{
														action.dis_terms
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

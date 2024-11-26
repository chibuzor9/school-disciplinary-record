'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from './ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/forms';
import { Input } from './ui/input';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from './ui/tabs';
import { useToast } from './ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import React from 'react';

// Form validation schemas
const studentSchema = z.object({
	student_id: z.string().min(1, 'Student ID is required'),
	name: z
		.string()
		.min(2, 'Name must be at least 2 characters'),
	cgpa: z
		.string()
		.regex(/^\d*\.?\d*$/, 'Must be a valid CGPA'),
});

const incidentSchema = z.object({
	student_id: z.string().min(1, 'Student ID is required'),
	type: z.string().min(1, 'Incident type is required'),
	evidence: z.string().min(1, 'Evidence is required'),
	status: z.string().min(1, 'Status is required'),
});

const actionSchema = z.object({
	incident_id: z
		.string()
		.min(1, 'Incident ID is required'),
	action_type: z
		.string()
		.min(1, 'Action type is required'),
	action_description: z
		.string()
		.min(1, 'Description is required'),
});

export default function StaffDash() {
	const { toast } = useToast();
	const [activeTab, setActiveTab] = useState('students');

	// Mock data - replace with actual API calls
	const [students] = useState([
		{
			student_id: 'ST001',
			name: 'John Doe',
			cgpa: '3.5',
		},
		{
			student_id: 'ST002',
			name: 'Jane Smith',
			cgpa: '3.8',
		},
	]);

	const [incidents] = useState([
		{
			id: 'INC001',
			student_id: 'ST001',
			type: 'Academic',
			status: 'Pending',
			evidence: 'Exam paper',
		},
		{
			id: 'INC002',
			student_id: 'ST002',
			type: 'Behavioral',
			status: 'Under Review',
			evidence: 'Witness report',
		},
	]);

	// Form handlers
	const studentForm = useForm<
		z.infer<typeof studentSchema>
	>({
		resolver: zodResolver(studentSchema),
	});

	const incidentForm = useForm<
		z.infer<typeof incidentSchema>
	>({
		resolver: zodResolver(incidentSchema),
	});

	const actionForm = useForm<
		z.infer<typeof actionSchema>
	>({
		resolver: zodResolver(actionSchema),
	});

	const onStudentSubmit = async (
		data: z.infer<typeof studentSchema>,
	) => {
		try {
			// Replace with actual API call
			console.log('Submitting student:', data);
			toast({
				title: 'Success',
				description: 'Student added successfully',
			});
			studentForm.reset();
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to add student',
				variant: 'destructive',
			});
		}
	};

	const onIncidentSubmit = async (
		data: z.infer<typeof incidentSchema>,
	) => {
		try {
			// Replace with actual API call
			console.log('Submitting incident:', data);
			toast({
				title: 'Success',
				description:
					'Incident recorded successfully',
			});
			incidentForm.reset();
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to record incident',
				variant: 'destructive',
			});
		}
	};

	const onActionSubmit = async (
		data: z.infer<typeof actionSchema>,
	) => {
		try {
			// Replace with actual API call
			console.log('Submitting action:', data);
			toast({
				title: 'Success',
				description:
					'Disciplinary action added successfully',
			});
			actionForm.reset();
		} catch (error) {
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
			<h1 className="text-2xl font-bold mb-6">
				Staff Dashboard
			</h1>

			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
			>
				<TabsList className="grid w-full grid-cols-3">
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
								Add New Student
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Form {...studentForm}>
								<form
									onSubmit={studentForm.handleSubmit(
										onStudentSubmit,
									)}
									className="space-y-4"
								>
									<FormField
										control={
											studentForm.control
										}
										name="student_id"
										render={({
											field,
										}) => (
											<FormItem>
												<FormLabel>
													Student
													ID
												</FormLabel>
												<FormControl>
													<Input
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={
											studentForm.control
										}
										name="name"
										render={({
											field,
										}) => (
											<FormItem>
												<FormLabel>
													Name
												</FormLabel>
												<FormControl>
													<Input
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={
											studentForm.control
										}
										name="cgpa"
										render={({
											field,
										}) => (
											<FormItem>
												<FormLabel>
													CGPA
												</FormLabel>
												<FormControl>
													<Input
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button type="submit">
										Add Student
									</Button>
								</form>
							</Form>
						</CardContent>
					</Card>

					<Card className="mt-6">
						<CardHeader>
							<CardTitle>
								Student List
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
									</TableRow>
								</TableHeader>
								<TableBody>
									{students.map(
										(student) => (
											<TableRow
												key={
													student.student_id
												}
											>
												<TableCell>
													{
														student.student_id
													}
												</TableCell>
												<TableCell>
													{
														student.name
													}
												</TableCell>
												<TableCell>
													{
														student.cgpa
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
								Record New Incident
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Form {...incidentForm}>
								<form
									onSubmit={incidentForm.handleSubmit(
										onIncidentSubmit,
									)}
									className="space-y-4"
								>
									<FormField
										control={
											incidentForm.control
										}
										name="student_id"
										render={({
											field,
										}) => (
											<FormItem>
												<FormLabel>
													Student
													ID
												</FormLabel>
												<Select
													onValueChange={
														field.onChange
													}
													defaultValue={
														field.value
													}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select student" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{students.map(
															(
																student,
															) => (
																<SelectItem
																	key={
																		student.student_id
																	}
																	value={
																		student.student_id
																	}
																>
																	{
																		student.name
																	}{' '}
																	(
																	{
																		student.student_id
																	}

																	)
																</SelectItem>
															),
														)}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={
											incidentForm.control
										}
										name="type"
										render={({
											field,
										}) => (
											<FormItem>
												<FormLabel>
													Incident
													Type
												</FormLabel>
												<Select
													onValueChange={
														field.onChange
													}
													defaultValue={
														field.value
													}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select type" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="Academic">
															Academic
														</SelectItem>
														<SelectItem value="Behavioral">
															Behavioral
														</SelectItem>
														<SelectItem value="Attendance">
															Attendance
														</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={
											incidentForm.control
										}
										name="evidence"
										render={({
											field,
										}) => (
											<FormItem>
												<FormLabel>
													Evidence
												</FormLabel>
												<FormControl>
													<Textarea
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={
											incidentForm.control
										}
										name="status"
										render={({
											field,
										}) => (
											<FormItem>
												<FormLabel>
													Status
												</FormLabel>
												<Select
													onValueChange={
														field.onChange
													}
													defaultValue={
														field.value
													}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select status" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="Pending">
															Pending
														</SelectItem>
														<SelectItem value="Under Review">
															Under
															Review
														</SelectItem>
														<SelectItem value="Resolved">
															Resolved
														</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button type="submit">
										Record Incident
									</Button>
								</form>
							</Form>
						</CardContent>
					</Card>

					<Card className="mt-6">
						<CardHeader>
							<CardTitle>
								Incident List
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
											Student
										</TableHead>
										<TableHead>
											Type
										</TableHead>
										<TableHead>
											Status
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
														students.find(
															(
																s,
															) =>
																s.student_id ===
																incident.student_id,
														)
															?.name
													}
												</TableCell>
												<TableCell>
													{
														incident.type
													}
												</TableCell>
												<TableCell>
													<Badge
														variant={
															incident.status ===
															'Pending'
																? 'destructive'
																: incident.status ===
																	  'Under Review'
																	? 'secondary'
																	: 'default'
														}
													>
														{
															incident.status
														}
													</Badge>
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
							<Form {...actionForm}>
								<form
									onSubmit={actionForm.handleSubmit(
										onActionSubmit,
									)}
									className="space-y-4"
								>
									<FormField
										control={
											actionForm.control
										}
										name="incident_id"
										render={({
											field,
										}) => (
											<FormItem>
												<FormLabel>
													Incident
												</FormLabel>
												<Select
													onValueChange={
														field.onChange
													}
													defaultValue={
														field.value
													}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select incident" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{incidents.map(
															(
																incident,
															) => (
																<SelectItem
																	key={
																		incident.id
																	}
																	value={
																		incident.id
																	}
																>
																	{
																		incident.id
																	}{' '}
																	-{' '}
																	{
																		incident.type
																	}
																</SelectItem>
															),
														)}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={
											actionForm.control
										}
										name="action_type"
										render={({
											field,
										}) => (
											<FormItem>
												<FormLabel>
													Action
													Type
												</FormLabel>
												<Select
													onValueChange={
														field.onChange
													}
													defaultValue={
														field.value
													}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select action type" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="Warning">
															Warning
														</SelectItem>
														<SelectItem value="Suspension">
															Suspension
														</SelectItem>
														<SelectItem value="Expulsion">
															Expulsion
														</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={
											actionForm.control
										}
										name="action_description"
										render={({
											field,
										}) => (
											<FormItem>
												<FormLabel>
													Description
												</FormLabel>
												<FormControl>
													<Textarea
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button type="submit">
										Add Action
									</Button>
								</form>
							</Form>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}

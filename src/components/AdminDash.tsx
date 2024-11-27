import React from 'react';
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
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import axios from 'axios';

// Schema definitions
const studentSchema = z.object({
	id: z.string().optional(),
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

const incidentSchema = z.object({
	id: z.string().optional(),
	inc_name: z
		.string()
		.min(1, 'Incident name is required'),
	inc_date: z
		.string()
		.min(1, 'Incident date is required'),
	inc_loc: z
		.string()
		.min(1, 'Incident location is required'),
	inc_sl: z.string().min(1, 'Severity level is required'),
});

const actionSchema = z.object({
	id: z.string().optional(),
	incident_id: z
		.string()
		.min(1, 'Incident ID is required'),
	dis_it: z.string().min(1, 'Action Type is required'),
	action_taken: z
		.string()
		.min(1, 'Action taken is required'),
	dis_terms: z.string().min(1, 'Terms are required'),
});

const staffSchema = z.object({
	id: z.string().optional(),
	first_name: z.string().min(1, 'First name is required'),
	last_name: z.string().min(1, 'Last name is required'),
	email: z.string().email('Invalid email'),
	position: z.string().min(1, 'Position is required'),
});

// Interface definitions
interface Student {
	id: string;
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

interface Staff {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	position: string;
}

export default function AdminDashboard() {
	const { toast } = useToast();
	const [students, setStudents] = useState<Student[]>([]);
	const [incidents, setIncidents] = useState<Incident[]>(
		[],
	);
	const [actions, setActions] = useState<
		DisciplinaryAction[]
	>([]);
	const [staff, setStaff] = useState<Staff[]>([]);
	const [activeTab, setActiveTab] = useState('students');
	const [editingItem, setEditingItem] = useState<
		| Student
		| Incident
		| DisciplinaryAction
		| Staff
		| null
	>(null);
	const [isAddDialogOpen, setIsAddDialogOpen] =
		useState(false);

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

	const staffForm = useForm<z.infer<typeof staffSchema>>({
		resolver: zodResolver(staffSchema),
	});

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const [
				studentsRes,
				incidentsRes,
				actionsRes,
				staffRes,
			] = await Promise.all([
				axios.get(
					'http://localhost:5000/api/students',
				),
				axios.get(
					'http://localhost:5000/api/incidents',
				),
				axios.get(
					'http://localhost:5000/api/disciplinary-actions',
				),
				axios.get(
					'http://localhost:5000/api/staff',
				),
			]);

			setStudents(studentsRes.data);
			setIncidents(incidentsRes.data);
			setActions(actionsRes.data);
			setStaff(staffRes.data);
		} catch (error) {
			console.error('Error fetching data:', error);
			toast({
				title: 'Error',
				description: 'Failed to fetch data',
				variant: 'destructive',
			});
		}
	};

	const handleDelete = async (
		id: string,
		type: 'student' | 'incident' | 'action' | 'staff',
	) => {
		try {
			await axios.delete(
				`http://localhost:5000/api/${type}s/${id}`,
			);
			toast({
				title: 'Success',
				description: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`,
			});
			fetchData();
		} catch (error) {
			console.error(`Error deleting ${type}:`, error);
			toast({
				title: 'Error',
				description: `Failed to delete ${type}`,
				variant: 'destructive',
			});
		}
	};

	const handleEdit = (
		item:
			| Student
			| Incident
			| DisciplinaryAction
			| Staff,
		type: 'student' | 'incident' | 'action' | 'staff',
	) => {
		setEditingItem(item);
		if (type === 'student') studentForm.reset(item);
		if (type === 'incident') incidentForm.reset(item);
		if (type === 'action') actionForm.reset(item);
		if (type === 'staff') staffForm.reset(item);
	};

	const handleUpdate = async (
		data:
			| z.infer<typeof studentSchema>
			| z.infer<typeof incidentSchema>
			| z.infer<typeof actionSchema>
			| z.infer<typeof staffSchema>,
		type: 'student' | 'incident' | 'action' | 'staff',
	) => {
		try {
			await axios.put(
				`http://localhost:5000/api/${type}s/${data.id}`,
				data,
			);
			toast({
				title: 'Success',
				description: `${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully`,
			});
			setEditingItem(null);
			fetchData();
		} catch (error) {
			console.error(`Error updating ${type}:`, error);
			toast({
				title: 'Error',
				description: `Failed to update ${type}`,
				variant: 'destructive',
			});
		}
	};

	const handleAdd = async (
		data:
			| z.infer<typeof studentSchema>
			| z.infer<typeof incidentSchema>
			| z.infer<typeof actionSchema>
			| z.infer<typeof staffSchema>,
		type: 'student' | 'incident' | 'action' | 'staff',
	) => {
		try {
			await axios.post(
				`http://localhost:5000/api/${type}s`,
				data,
			);
			toast({
				title: 'Success',
				description: `${type.charAt(0).toUpperCase() + type.slice(1)} added successfully`,
			});
			setIsAddDialogOpen(false);
			fetchData();
		} catch (error) {
			console.error(`Error adding ${type}:`, error);
			toast({
				title: 'Error',
				description: `Failed to add ${type}`,
				variant: 'destructive',
			});
		}
	};

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">
				Admin Dashboard
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
					<TabsTrigger value="staff">
						Staff
					</TabsTrigger>
				</TabsList>

				{[
					'students',
					'incidents',
					'actions',
					'staff',
				].map((tab) => (
					<TabsContent key={tab} value={tab}>
						<Card>
							<CardHeader>
								<CardTitle className="flex justify-between items-center">
									<span>
										{tab
											.charAt(0)
											.toUpperCase() +
											tab.slice(
												1,
											)}{' '}
										List
									</span>
									<Button
										onClick={() =>
											setIsAddDialogOpen(
												true,
											)
										}
									>
										Add{' '}
										{tab.slice(0, -1)}
									</Button>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											{tab ===
												'students' && (
												<>
													<TableHead>
														ID
													</TableHead>
													<TableHead>
														Name
													</TableHead>
													<TableHead>
														Date
														of
														Birth
													</TableHead>
													<TableHead>
														Email
													</TableHead>
													<TableHead>
														Parent
														Number
													</TableHead>
												</>
											)}
											{tab ===
												'incidents' && (
												<>
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
														Severity
														Level
													</TableHead>
												</>
											)}
											{tab ===
												'actions' && (
												<>
													<TableHead>
														ID
													</TableHead>
													<TableHead>
														Incident
														ID
													</TableHead>
													<TableHead>
														Action
														Type
													</TableHead>
													<TableHead>
														Action
														Taken
													</TableHead>
													<TableHead>
														Terms
													</TableHead>
												</>
											)}
											{tab ===
												'staff' && (
												<>
													<TableHead>
														ID
													</TableHead>
													<TableHead>
														Name
													</TableHead>
													<TableHead>
														Email
													</TableHead>
													<TableHead>
														Position
													</TableHead>
												</>
											)}
											<TableHead>
												Actions
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{tab ===
											'students' &&
											students.map(
												(
													student,
												) => (
													<TableRow
														key={
															student.id
														}
													>
														<TableCell>
															{
																student.id
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
														<TableCell>
															<Button
																onClick={() =>
																	handleEdit(
																		student,
																		'student',
																	)
																}
																className="mr-2"
															>
																Edit
															</Button>
															<Button
																onClick={() =>
																	handleDelete(
																		student.id,
																		'student',
																	)
																}
																variant="destructive"
															>
																Delete
															</Button>
														</TableCell>
													</TableRow>
												),
											)}
										{tab ===
											'incidents' &&
											incidents.map(
												(
													incident,
												) => (
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
																	handleEdit(
																		incident,
																		'incident',
																	)
																}
																className="mr-2"
															>
																Edit
															</Button>
															<Button
																onClick={() =>
																	handleDelete(
																		incident.id,
																		'incident',
																	)
																}
																variant="destructive"
															>
																Delete
															</Button>
														</TableCell>
													</TableRow>
												),
											)}
										{tab ===
											'actions' &&
											actions.map(
												(
													action,
												) => (
													<TableRow
														key={
															action.id
														}
													>
														<TableCell>
															{
																action.id
															}
														</TableCell>
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
														<TableCell>
															<Button
																onClick={() =>
																	handleEdit(
																		action,
																		'action',
																	)
																}
																className="mr-2"
															>
																Edit
															</Button>
															<Button
																onClick={() =>
																	handleDelete(
																		action.id,
																		'action',
																	)
																}
																variant="destructive"
															>
																Delete
															</Button>
														</TableCell>
													</TableRow>
												),
											)}
										{tab === 'staff' &&
											staff.map(
												(
													staffMember,
												) => (
													<TableRow
														key={
															staffMember.id
														}
													>
														<TableCell>
															{
																staffMember.id
															}
														</TableCell>
														<TableCell>{`${staffMember.first_name} ${staffMember.last_name}`}</TableCell>
														<TableCell>
															{
																staffMember.email
															}
														</TableCell>
														<TableCell>
															{
																staffMember.position
															}
														</TableCell>
														<TableCell>
															<Button
																onClick={() =>
																	handleEdit(
																		staffMember,
																		'staff',
																	)
																}
																className="mr-2"
															>
																Edit
															</Button>
															<Button
																onClick={() =>
																	handleDelete(
																		staffMember.id,
																		'staff',
																	)
																}
																variant="destructive"
															>
																Delete
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
				))}
			</Tabs>

			{/* Edit Dialog */}
			<Dialog
				open={!!editingItem}
				onOpenChange={() => setEditingItem(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Edit {activeTab.slice(0, -1)}
						</DialogTitle>
					</DialogHeader>
					{activeTab === 'students' && (
						<form
							onSubmit={studentForm.handleSubmit(
								(data) =>
									handleUpdate(
										data,
										'student',
									),
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
							<Button type="submit">
								Update Student
							</Button>
						</form>
					)}
					{activeTab === 'incidents' && (
						<form
							onSubmit={incidentForm.handleSubmit(
								(data) =>
									handleUpdate(
										data,
										'incident',
									),
							)}
							className="space-y-4"
						>
							<Input
								{...incidentForm.register(
									'inc_name',
								)}
								placeholder="Incident Name"
							/>
							<Input
								{...incidentForm.register(
									'inc_date',
								)}
								type="date"
								placeholder="Incident Date"
							/>
							<Input
								{...incidentForm.register(
									'inc_loc',
								)}
								placeholder="Incident Location"
							/>
							<Input
								{...incidentForm.register(
									'inc_sl',
								)}
								placeholder="Severity Level"
							/>
							<Button type="submit">
								Update Incident
							</Button>
						</form>
					)}
					{activeTab === 'actions' && (
						<form
							onSubmit={actionForm.handleSubmit(
								(data) =>
									handleUpdate(
										data,
										'action',
									),
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
							<Button type="submit">
								Update Action
							</Button>
						</form>
					)}
					{activeTab === 'staff' && (
						<form
							onSubmit={staffForm.handleSubmit(
								(data) =>
									handleUpdate(
										data,
										'staff',
									),
							)}
							className="space-y-4"
						>
							<Input
								{...staffForm.register(
									'first_name',
								)}
								placeholder="First Name"
							/>
							<Input
								{...staffForm.register(
									'last_name',
								)}
								placeholder="Last Name"
							/>
							<Input
								{...staffForm.register(
									'email',
								)}
								type="email"
								placeholder="Email"
							/>
							<Input
								{...staffForm.register(
									'position',
								)}
								placeholder="Position"
							/>
							<Button type="submit">
								Update Staff
							</Button>
						</form>
					)}
				</DialogContent>
			</Dialog>

			{/* Add Dialog */}
			<Dialog
				open={isAddDialogOpen}
				onOpenChange={setIsAddDialogOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Add {activeTab.slice(0, -1)}
						</DialogTitle>
					</DialogHeader>
					{activeTab === 'students' && (
						<form
							onSubmit={studentForm.handleSubmit(
								(data) =>
									handleAdd(
										data,
										'student',
									),
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
							<Button type="submit">
								Add Student
							</Button>
						</form>
					)}
					{activeTab === 'incidents' && (
						<form
							onSubmit={incidentForm.handleSubmit(
								(data) =>
									handleAdd(
										data,
										'incident',
									),
							)}
							className="space-y-4"
						>
							<Input
								{...incidentForm.register(
									'inc_name',
								)}
								placeholder="Incident Name"
							/>
							<Input
								{...incidentForm.register(
									'inc_date',
								)}
								type="date"
								placeholder="Incident Date"
							/>
							<Input
								{...incidentForm.register(
									'inc_loc',
								)}
								placeholder="Incident Location"
							/>
							<Input
								{...incidentForm.register(
									'inc_sl',
								)}
								placeholder="Severity Level"
							/>
							<Button type="submit">
								Add Incident
							</Button>
						</form>
					)}
					{activeTab === 'actions' && (
						<form
							onSubmit={actionForm.handleSubmit(
								(data) =>
									handleAdd(
										data,
										'action',
									),
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
							<Button type="submit">
								Add Action
							</Button>
						</form>
					)}
					{activeTab === 'staff' && (
						<form
							onSubmit={staffForm.handleSubmit(
								(data) =>
									handleAdd(
										data,
										'staff',
									),
							)}
							className="space-y-4"
						>
							<Input
								{...staffForm.register(
									'first_name',
								)}
								placeholder="First Name"
							/>
							<Input
								{...staffForm.register(
									'last_name',
								)}
								placeholder="Last Name"
							/>
							<Input
								{...staffForm.register(
									'email',
								)}
								type="email"
								placeholder="Email"
							/>
							<Input
								{...staffForm.register(
									'position',
								)}
								placeholder="Position"
							/>
							<Button type="submit">
								Add Staff
							</Button>
						</form>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}

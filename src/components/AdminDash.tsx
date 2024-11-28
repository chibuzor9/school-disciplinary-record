import React from 'react';
('use client');

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from './ui/popover';
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
	Incident_name: z
		.string()
		.min(1, 'Incident name is required'),
	Incident_date: z
		.string()
		.min(1, 'Incident date is required'),
	Incident_location: z
		.string()
		.min(1, 'Incident location is required'),
	Incident_sl: z
		.string()
		.min(1, 'Severity level is required'),
});

const actionSchema = z.object({
	id: z.string().optional(),
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

const recordSchema = z.object({
	id: z.string().optional(),
	Disciplinary_Record_Description: z
		.string()
		.min(1, 'Description is required'),
	Disciplinary_Record_status: z
		.string()
		.min(1, 'Status is required'),
	StudentID: z.string().min(1, 'Student ID is required'),
	IncidentID: z
		.string()
		.min(1, 'Incident ID is required'),
});

const adminSchema = z.object({
	id: z.string().optional(),
	Admin_name: z.string().min(1, 'Admin name is required'),
	Admin_date: z.string().min(1, 'Date is required'),
	Admin_location: z
		.string()
		.min(1, 'Location is required'),
	Admin_sl: z
		.string()
		.min(1, 'Security level is required'),
});

const appealSchema = z.object({
	id: z.string().optional(),
	Appeal_name: z
		.string()
		.min(1, 'Appeal name is required'),
	Appeal_reason: z
		.string()
		.min(1, 'Appeal reason is required'),
	Appeal_Status: z
		.string()
		.min(1, 'Appeal status is required'),
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
	Incident_name: string;
	Incident_date: string;
	Incident_location: string;
	Incident_sl: string;
}

interface DisciplinaryAction {
	id: string;
	Disciplinary_Incident_Type: string;
	Disciplinary_action_Taken: string;
	Disciplinary_Terms: string;
}

interface DisciplinaryRecord {
	id: string;
	Disciplinary_Record_Description: string;
	Disciplinary_Record_status: string;
	StudentID: string;
	IncidentID: string;
}

interface Admin {
	id: string;
	Admin_name: string;
	Admin_date: string;
	Admin_location: string;
	Admin_sl: string;
}

interface Appeal {
	id: string;
	Appeal_name: string;
	Appeal_reason: string;
	Appeal_Status: string;
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
	const [records, setRecords] = useState<
		DisciplinaryRecord[]
	>([]);
	const [admins, setAdmins] = useState<Admin[]>([]);
	const [appeals, setAppeals] = useState<Appeal[]>([]);
	const [activeTab, setActiveTab] = useState('students');
	const [editingItem, setEditingItem] = useState<
		| Student
		| Incident
		| DisciplinaryAction
		| DisciplinaryRecord
		| Admin
		| Appeal
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

	const recordForm = useForm<
		z.infer<typeof recordSchema>
	>({
		resolver: zodResolver(recordSchema),
	});

	const adminForm = useForm<z.infer<typeof adminSchema>>({
		resolver: zodResolver(adminSchema),
	});

	const appealForm = useForm<
		z.infer<typeof appealSchema>
	>({
		resolver: zodResolver(appealSchema),
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
				recordsRes,
				adminsRes,
				appealsRes,
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
					'http://localhost:5000/api/disciplinary-records',
				),
				axios.get(
					'http://localhost:5000/api/admins',
				),
				axios.get(
					'http://localhost:5000/api/appeals',
				),
			]);

			setStudents(studentsRes.data);
			setIncidents(incidentsRes.data);
			setActions(actionsRes.data);
			setRecords(recordsRes.data);
			setAdmins(adminsRes.data);
			setAppeals(appealsRes.data);
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
		type: string,
	) => {
		try {
			await axios.delete(
				`http://localhost:5000/api/${type}/${id}`,
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
			| DisciplinaryRecord
			| Admin
			| Appeal,
		type: string,
	) => {
		setEditingItem(item);
		if (type === 'students') studentForm.reset(item);
		if (type === 'incidents') incidentForm.reset(item);
		if (type === 'actions') actionForm.reset(item);
		if (type === 'records') recordForm.reset(item);
		if (type === 'admins') adminForm.reset(item);
		if (type === 'appeals') appealForm.reset(item);
	};

	const handleUpdate = async (
		data: any,
		type: string,
	) => {
		try {
			await axios.put(
				`http://localhost:5000/api/${type}/${data.id}`,
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

	const handleAdd = async (data: any, type: string) => {
		try {
			await axios.post(
				`http://localhost:5000/api/${type}`,
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

				{[
					'students',
					'incidents',
					'actions',
					'records',
					'admins',
					'appeals',
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
												'records' && (
												<>
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
														Student
														ID
													</TableHead>
													<TableHead>
														Incident
														ID
													</TableHead>
												</>
											)}
											{tab ===
												'admins' && (
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
														Security
														Level
													</TableHead>
												</>
											)}
											{tab ===
												'appeals' && (
												<>
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
																		'students',
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
																		'students',
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
																incident.Incident_name
															}
														</TableCell>
														<TableCell>
															{
																incident.Incident_date
															}
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
														<TableCell>
															<Button
																onClick={() =>
																	handleEdit(
																		incident,
																		'incidents',
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
																		'incidents',
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
														<TableCell>
															<Button
																onClick={() =>
																	handleEdit(
																		action,
																		'actions',
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
																		'actions',
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
											'records' &&
											records.map(
												(
													record,
												) => (
													<TableRow
														key={
															record.id
														}
													>
														<TableCell>
															{
																record.id
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
															<Popover>
																<PopoverTrigger>
																	{
																		record.StudentID
																	}
																</PopoverTrigger>
																<PopoverContent>
																	{
																		students.find(
																			(
																				s,
																			) =>
																				s.id ===
																				record.StudentID,
																		)
																			?.first_name
																	}{' '}
																	{
																		students.find(
																			(
																				s,
																			) =>
																				s.id ===
																				record.StudentID,
																		)
																			?.last_name
																	}
																</PopoverContent>
															</Popover>
														</TableCell>
														<TableCell>
															<Popover>
																<PopoverTrigger>
																	{
																		record.IncidentID
																	}
																</PopoverTrigger>
																<PopoverContent>
																	{
																		incidents.find(
																			(
																				i,
																			) =>
																				i.id ===
																				record.IncidentID,
																		)
																			?.Incident_name
																	}
																</PopoverContent>
															</Popover>
														</TableCell>
														<TableCell>
															<Button
																onClick={() =>
																	handleEdit(
																		record,
																		'records',
																	)
																}
																className="mr-2"
															>
																Edit
															</Button>
															<Button
																onClick={() =>
																	handleDelete(
																		record.id,
																		'records',
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
										{tab === 'admins' &&
											admins.map(
												(admin) => (
													<TableRow
														key={
															admin.id
														}
													>
														<TableCell>
															{
																admin.id
															}
														</TableCell>
														<TableCell>
															{
																admin.Admin_name
															}
														</TableCell>
														<TableCell>
															{
																admin.Admin_date
															}
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
														<TableCell>
															<Button
																onClick={() =>
																	handleEdit(
																		admin,
																		'admins',
																	)
																}
																className="mr-2"
															>
																Edit
															</Button>
															<Button
																onClick={() =>
																	handleDelete(
																		admin.id,
																		'admins',
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
											'appeals' &&
											appeals.map(
												(
													appeal,
												) => (
													<TableRow
														key={
															appeal.id
														}
													>
														<TableCell>
															{
																appeal.id
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
														<TableCell>
															<Button
																onClick={() =>
																	handleEdit(
																		appeal,
																		'appeals',
																	)
																}
																className="mr-2"
															>
																Edit
															</Button>
															<Button
																onClick={() =>
																	handleDelete(
																		appeal.id,
																		'appeals',
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
										'students',
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
										'incidents',
									),
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
										'actions',
									),
							)}
							className="space-y-4"
						>
							<Input
								{...actionForm.register(
									'Disciplinary_Incident_Type',
								)}
								placeholder="Incident Type"
							/>
							<Input
								{...actionForm.register(
									'Disciplinary_action_Taken',
								)}
								placeholder="Action Taken"
							/>
							<Textarea
								{...actionForm.register(
									'Disciplinary_Terms',
								)}
								placeholder="Terms"
							/>
							<Button type="submit">
								Update Action
							</Button>
						</form>
					)}
					{activeTab === 'records' && (
						<form
							onSubmit={recordForm.handleSubmit(
								(data) =>
									handleUpdate(
										data,
										'records',
									),
							)}
							className="space-y-4"
						>
							<Textarea
								{...recordForm.register(
									'Disciplinary_Record_Description',
								)}
								placeholder="Description"
							/>
							<Input
								{...recordForm.register(
									'Disciplinary_Record_status',
								)}
								placeholder="Status"
							/>
							<Controller
								name="StudentID"
								control={recordForm.control}
								render={({ field }) => (
									<Select
										onValueChange={
											field.onChange
										}
										value={field.value}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select Student" />
										</SelectTrigger>
										<SelectContent>
											{students.map(
												(
													student,
												) => (
													<SelectItem
														key={
															student.id
														}
														value={
															student.id
														}
													>
														{
															student.first_name
														}{' '}
														{
															student.last_name
														}
													</SelectItem>
												),
											)}
										</SelectContent>
									</Select>
								)}
							/>
							<Controller
								name="IncidentID"
								control={recordForm.control}
								render={({ field }) => (
									<Select
										onValueChange={
											field.onChange
										}
										value={field.value}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select Incident" />
										</SelectTrigger>
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
															incident.Incident_name
														}
													</SelectItem>
												),
											)}
										</SelectContent>
									</Select>
								)}
							/>
							<Button type="submit">
								Update Record
							</Button>
						</form>
					)}
					{activeTab === 'admins' && (
						<form
							onSubmit={adminForm.handleSubmit(
								(data) =>
									handleUpdate(
										data,
										'admins',
									),
							)}
							className="space-y-4"
						>
							<Input
								{...adminForm.register(
									'Admin_name',
								)}
								placeholder="Admin Name"
							/>
							<Input
								{...adminForm.register(
									'Admin_date',
								)}
								type="date"
								placeholder="Date"
							/>
							<Input
								{...adminForm.register(
									'Admin_location',
								)}
								placeholder="Location"
							/>
							<Input
								{...adminForm.register(
									'Admin_sl',
								)}
								placeholder="Security Level"
							/>
							<Button type="submit">
								Update Admin
							</Button>
						</form>
					)}
					{activeTab === 'appeals' && (
						<form
							onSubmit={appealForm.handleSubmit(
								(data) =>
									handleUpdate(
										data,
										'appeals',
									),
							)}
							className="space-y-4"
						>
							<Input
								{...appealForm.register(
									'Appeal_name',
								)}
								placeholder="Appeal Name"
							/>
							<Textarea
								{...appealForm.register(
									'Appeal_reason',
								)}
								placeholder="Appeal Reason"
							/>
							<Input
								{...appealForm.register(
									'Appeal_Status',
								)}
								placeholder="Appeal Status"
							/>
							<Button type="submit">
								Update Appeal
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
										'students',
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
										'incidents',
									),
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
										'actions',
									),
							)}
							className="space-y-4"
						>
							<Input
								{...actionForm.register(
									'Disciplinary_Incident_Type',
								)}
								placeholder="Incident Type"
							/>
							<Input
								{...actionForm.register(
									'Disciplinary_action_Taken',
								)}
								placeholder="Action Taken"
							/>
							<Textarea
								{...actionForm.register(
									'Disciplinary_Terms',
								)}
								placeholder="Terms"
							/>
							<Button type="submit">
								Add Action
							</Button>
						</form>
					)}
					{activeTab === 'records' && (
						<form
							onSubmit={recordForm.handleSubmit(
								(data) =>
									handleAdd(
										data,
										'records',
									),
							)}
							className="space-y-4"
						>
							<Textarea
								{...recordForm.register(
									'Disciplinary_Record_Description',
								)}
								placeholder="Description"
							/>
							<Input
								{...recordForm.register(
									'Disciplinary_Record_status',
								)}
								placeholder="Status"
							/>
							<Controller
								name="StudentID"
								control={recordForm.control}
								render={({ field }) => (
									<Select
										onValueChange={
											field.onChange
										}
										value={field.value}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select Student" />
										</SelectTrigger>
										<SelectContent>
											{students.map(
												(
													student,
												) => (
													<SelectItem
														key={
															student.id
														}
														value={
															student.id
														}
													>
														{
															student.first_name
														}{' '}
														{
															student.last_name
														}
													</SelectItem>
												),
											)}
										</SelectContent>
									</Select>
								)}
							/>
							<Controller
								name="IncidentID"
								control={recordForm.control}
								render={({ field }) => (
									<Select
										onValueChange={
											field.onChange
										}
										value={field.value}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select Incident" />
										</SelectTrigger>
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
															incident.Incident_name
														}
													</SelectItem>
												),
											)}
										</SelectContent>
									</Select>
								)}
							/>
							<Button type="submit">
								Add Record
							</Button>
						</form>
					)}
					{activeTab === 'admins' && (
						<form
							onSubmit={adminForm.handleSubmit(
								(data) =>
									handleAdd(
										data,
										'admins',
									),
							)}
							className="space-y-4"
						>
							<Input
								{...adminForm.register(
									'Admin_name',
								)}
								placeholder="Admin Name"
							/>
							<Input
								{...adminForm.register(
									'Admin_date',
								)}
								type="date"
								placeholder="Date"
							/>
							<Input
								{...adminForm.register(
									'Admin_location',
								)}
								placeholder="Location"
							/>
							<Input
								{...adminForm.register(
									'Admin_sl',
								)}
								placeholder="Security Level"
							/>
							<Button type="submit">
								Add Admin
							</Button>
						</form>
					)}
					{activeTab === 'appeals' && (
						<form
							onSubmit={appealForm.handleSubmit(
								(data) =>
									handleAdd(
										data,
										'appeals',
									),
							)}
							className="space-y-4"
						>
							<Input
								{...appealForm.register(
									'Appeal_name',
								)}
								placeholder="Appeal Name"
							/>
							<Textarea
								{...appealForm.register(
									'Appeal_reason',
								)}
								placeholder="Appeal Reason"
							/>
							<Input
								{...appealForm.register(
									'Appeal_Status',
								)}
								placeholder="Appeal Status"
							/>
							<Button type="submit">
								Add Appeal
							</Button>
						</form>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}

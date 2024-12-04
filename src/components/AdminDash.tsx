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
import { Label } from './ui/label';
import axios from 'axios';

// Schema definitions
const studentSchema = z.object({
	id: z.number().optional(),
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
	id: z.number().optional(),
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
	id: z.number().optional(),
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
	id: z.number().optional(),
	Disciplinary_Record_Description: z
		.string()
		.min(1, 'Description is required'),
	Disciplinary_Record_status: z
		.string()
		.min(1, 'Status is required'),
	StudentID: z.number().min(1, 'Student ID is required'),
	IncidentID: z
		.number()
		.min(1, 'Incident ID is required'),
});

const adminSchema = z.object({
	id: z.number().optional(),
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
	id: z.number().optional(),
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
	id: number;
	first_name: string;
	last_name: string;
	date_of_birth: string;
	email: string;
	parent_no: string;
}

interface Incident {
	id: number;
	Incident_name: string;
	Incident_date: string;
	Incident_location: string;
	Incident_sl: string;
}

interface DisciplinaryAction {
	id: number;
	Disciplinary_Incident_Type: string;
	Disciplinary_action_Taken: string;
	Disciplinary_Terms: string;
}

interface DisciplinaryRecord {
	id: number;
	Disciplinary_Record_Description: string;
	Disciplinary_Record_status: string;
	StudentID: number;
	IncidentID: number;
}

interface Admin {
	id: number;
	Admin_name: string;
	Admin_date: string;
	Admin_location: string;
	Admin_sl: string;
}

interface Appeal {
	id: number;
	Appeal_name: string;
	Appeal_reason: string;
	Appeal_Status: string;
	StudentID: number;
}

export default function AdminDashboard() {
	const [activeTab, setActiveTab] = useState('students');
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [dialogMode, setDialogMode] = useState<
		'add' | 'edit'
	>('add');
	const [editingItemId, setEditingItemId] = useState<
		number | null
	>(null);
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

	const { toast } = useToast();

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

	const fetchData = async () => {
		try {
			const [
				studentsData,
				incidentsData,
				actionsData,
				recordsData,
				adminsData,
				appealsData,
			] = await Promise.all([
				axios.get<Student[]>(
					'http://localhost:5000/api/student',
				),
				axios.get<Incident[]>(
					'http://localhost:5000/api/incident',
				),
				axios.get<DisciplinaryAction[]>(
					'http://localhost:5000/api/action',
				),
				axios.get<DisciplinaryRecord[]>(
					'http://localhost:5000/api/record',
				),
				axios.get<Admin[]>(
					'http://localhost:5000/api/admin',
				),
				axios.get<Appeal[]>(
					'http://localhost:5000/api/appeal',
				),
			]);

			setStudents(studentsData.data);
			setIncidents(incidentsData.data);
			setActions(actionsData.data);
			setRecords(recordsData.data);
			setAdmins(adminsData.data);
			setAppeals(appealsData.data);
		} catch (error) {
			console.error('Error fetching data:', error);
			toast({
				title: 'Error',
				description: 'Failed to fetch data',
				variant: 'destructive',
			});
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleAdd = () => {
		setDialogMode('add');
		setEditingItemId(null);
		setIsDialogOpen(true);
		resetForm();
	};

	const handleEdit = (item: any, type: string) => {
		setDialogMode('edit');
		setEditingItemId(item.id);
		setIsDialogOpen(true);
		setActiveTab(type + 's');
		resetForm(item, type);
	};

	const resetForm = (item?: any, type?: string) => {
		switch (type) {
			case 'student':
				studentForm.reset(item);
				break;
			case 'incident':
				incidentForm.reset(item);
				break;
			case 'action':
				actionForm.reset(item);
				break;
			case 'record':
				recordForm.reset(item);
				break;
			case 'admin':
				adminForm.reset(item);
				break;
			case 'appeal':
				appealForm.reset(item);
				break;
			default:
				studentForm.reset();
				incidentForm.reset();
				actionForm.reset();
				recordForm.reset();
				adminForm.reset();
				appealForm.reset();
		}
	};

	const onSubmit = async (data: any) => {
		try {
			const singularTab = activeTab.endsWith('s')
				? activeTab.slice(0, -1)
				: activeTab;

			if (dialogMode === 'edit') {
				await axios.put(
					`http://localhost:5000/api/${singularTab}/${editingItemId}`,
					data,
				);
				toast({
					title: 'Success',
					description: `${singularTab.charAt(0).toUpperCase() + singularTab.slice(1)} updated successfully`,
				});
			} else {
				await axios.post(
					`http://localhost:5000/api/${singularTab}`,
					data,
				);
				toast({
					title: 'Success',
					description: `${singularTab.charAt(0).toUpperCase() + singularTab.slice(1)} added successfully`,
				});
			}
			setIsDialogOpen(false);
			fetchData();
		} catch (error) {
			console.error(
				`Error ${dialogMode === 'edit' ? 'updating' : 'adding'} ${activeTab}:`,
				error,
			);
			toast({
				title: 'Error',
				description: `Failed to ${dialogMode === 'edit' ? 'update' : 'add'} ${activeTab}`,
				variant: 'destructive',
			});
		}
	};

	const handleDelete = async (
		id: number,
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

	const renderForm = () => {
		switch (activeTab) {
			case 'students':
				return (
					<form
						onSubmit={studentForm.handleSubmit(
							onSubmit,
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
							{dialogMode === 'edit'
								? 'Update'
								: 'Add'}{' '}
							Student
						</Button>
					</form>
				);
			case 'incidents':
				return (
					<form
						onSubmit={incidentForm.handleSubmit(
							onSubmit,
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
							{dialogMode === 'edit'
								? 'Update'
								: 'Add'}{' '}
							Incident
						</Button>
					</form>
				);
			case 'actions':
				return (
					<form
						onSubmit={actionForm.handleSubmit(
							onSubmit,
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
							{dialogMode === 'edit'
								? 'Update'
								: 'Add'}{' '}
							Action
						</Button>
					</form>
				);
			case 'records':
				return (
					<form
						onSubmit={recordForm.handleSubmit(
							onSubmit,
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
									value={field.value?.toString()}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select Student" />
									</SelectTrigger>
									<SelectContent>
										{students.map(
											(student) => (
												<SelectItem
													key={
														student.id
													}
													value={student.id.toString()}
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
									value={field.value?.toString()}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select Incident" />
									</SelectTrigger>
									<SelectContent>
										{incidents.map(
											(incident) => (
												<SelectItem
													key={
														incident.id
													}
													value={incident.id.toString()}
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
							{dialogMode === 'edit'
								? 'Update'
								: 'Add'}{' '}
							Record
						</Button>
					</form>
				);
			case 'admins':
				return (
					<form
						onSubmit={adminForm.handleSubmit(
							onSubmit,
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
							{dialogMode === 'edit'
								? 'Update'
								: 'Add'}{' '}
							Admin
						</Button>
					</form>
				);
			case 'appeals':
				return (
					<form
						onSubmit={appealForm.handleSubmit(
							onSubmit,
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
						<Select
							onValueChange={(value) =>
								appealForm.setValue(
									'Appeal_Status',
									value,
								)
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Pending">
									Pending
								</SelectItem>
								<SelectItem value="Under Review">
									Under Review
								</SelectItem>
								<SelectItem value="Approved">
									Approved
								</SelectItem>
								<SelectItem value="Rejected">
									Rejected
								</SelectItem>
							</SelectContent>
						</Select>
						<Button type="submit">
							{dialogMode === 'edit'
								? 'Update'
								: 'Add'}{' '}
							Appeal
						</Button>
					</form>
				);
			default:
				return null;
		}
	};

	return (
		<div className="container mx-auto p-6 bg-white text-gray-900">
			<h1 className="text-3xl font-bold mb-6">
				Admin Dashboard
			</h1>
			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
			>
				<TabsList className="bg-gray-100 p-1 rounded-lg">
					{[
						'students',
						'incidents',
						'actions',
						'records',
						'admins',
						'appeals',
					].map((tab) => (
						<TabsTrigger
							key={tab}
							value={tab}
							className={`px-4 py-2 rounded-md transition-colors duration-200 ${
								activeTab === tab
									? 'bg-customBlue text-white'
									: 'text-gray-600 hover:bg-gray-200'
							}`}
						>
							{tab.charAt(0).toUpperCase() +
								tab.slice(1)}
						</TabsTrigger>
					))}
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
						<Card className="bg-white">
							<CardHeader>
								<CardTitle className="flex justify-between items-center text-gray-900">
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
										onClick={handleAdd}
										className="bg-customBlue text-white hover:bg-customPurple"
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
											<TableHead>
												ID
											</TableHead>
											{tab ===
												'students' && (
												<>
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
														Description
													</TableHead>
													<TableHead>
														Status
													</TableHead>
													<TableHead>
														Student
													</TableHead>
													<TableHead>
														Incident
													</TableHead>
												</>
											)}
											{tab ===
												'admins' && (
												<>
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
												'appeals' && (
												<>
													<TableHead>
														Appeal
														Subject
													</TableHead>
													<TableHead>
														Reason
													</TableHead>
													<TableHead>
														Status
													</TableHead>
													<TableHead>
														StudentID
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
															{new Date(
																student.date_of_birth,
															).toLocaleDateString()}
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
																incident.Incident_name
															}
														</TableCell>
														<TableCell>
															{new Date(
																incident.Incident_date,
															).toLocaleDateString()}
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
																		'record',
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
																		'record',
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
															{new Date(
																admin.Admin_date,
															).toLocaleDateString()}
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
																		'admin',
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
																		'admin',
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
															<Popover>
																<PopoverTrigger>
																	{
																		appeal.StudentID
																	}
																</PopoverTrigger>
																<PopoverContent>
																	{
																		students.find(
																			(
																				s,
																			) =>
																				s.id ===
																				appeal.StudentID,
																		)
																			?.first_name
																	}{' '}
																	{
																		students.find(
																			(
																				s,
																			) =>
																				s.id ===
																				appeal.StudentID,
																		)
																			?.last_name
																	}
																</PopoverContent>
															</Popover>
														</TableCell>
														<TableCell>
															<Button
																onClick={() =>
																	handleEdit(
																		appeal,
																		'appeal',
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
																		'appeal',
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

			<Dialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
			>
				<DialogContent className="bg-white">
					<DialogHeader>
						<DialogTitle className="text-gray-900">
							{dialogMode === 'edit'
								? 'Edit'
								: 'Add'}{' '}
							{activeTab.slice(0, -1)}
						</DialogTitle>
					</DialogHeader>
					{renderForm()}
				</DialogContent>
			</Dialog>
		</div>
	);
}

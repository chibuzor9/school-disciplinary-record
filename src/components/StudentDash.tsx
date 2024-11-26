'use client';

import { useState, useEffect } from 'react';
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
import { useToast } from './ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import React from 'react';
import IncidentDetails from './IncidentDetails';
import { dummyIncidents } from './utils/dummyData';

const appealSchema = z.object({
	student_id: z.string().min(1, 'Student ID is required'),
	incident_id: z
		.string()
		.min(1, 'Incident ID is required'),
	appeal_text: z
		.string()
		.min(
			10,
			'Appeal text must be at least 10 characters',
		),
	document: z.any().optional(),
	guardian_name: z
		.string()
		.min(2, 'Guardian name is required'),
	guardian_contact: z
		.string()
		.min(10, 'Valid contact information is required'),
});

interface Incident {
	id: string;
	student_id: string;
	description: string;
	date: string;
	status: string;
}

export default function StudentDashboard() {
	const { toast } = useToast();
	const [selectedFile, setSelectedFile] =
		useState<File | null>(null);
	const [incidents, setIncidents] = useState<Incident[]>(
		[],
	);
	const [selectedIncident, setSelectedIncident] =
		useState<Incident | null>(null);
	const [studentId, setStudentId] = useState<string>('');

	const form = useForm<z.infer<typeof appealSchema>>({
		resolver: zodResolver(appealSchema),
		defaultValues: {
			student_id: '',
			incident_id: '',
			appeal_text: '',
			guardian_name: '',
			guardian_contact: '',
		},
	});

	useEffect(() => {
		// Fetch student ID from authentication or local storage
		const storedStudentId =
			localStorage.getItem('studentId') || 'STU001';
		setStudentId(storedStudentId);
		form.setValue('student_id', storedStudentId);

		// Fetch incidents for the student
		fetchIncidents(storedStudentId);
	}, [form]);

	const fetchIncidents = (id: string) => {
		// Filter dummy incidents for the specific student
		const studentIncidents = dummyIncidents.filter(
			(incident) => incident.student_id === id,
		);
		setIncidents(studentIncidents);
	};

	const onSubmit = async (
		data: z.infer<typeof appealSchema>,
	) => {
		try {
			// Create FormData to handle file upload
			const formData = new FormData();
			Object.entries(data).forEach(([key, value]) => {
				formData.append(key, value);
			});
			if (selectedFile) {
				formData.append('document', selectedFile);
			}

			// Simulating API call
			await new Promise((resolve) =>
				setTimeout(resolve, 1000),
			);

			toast({
				title: 'Success',
				description:
					'Appeal submitted successfully',
			});
			form.reset();
			setSelectedFile(null);
		} catch (error) {
			console.error(
				'Error submitting appeal:',
				error,
			);
			toast({
				title: 'Error',
				description: 'Failed to submit appeal',
				variant: 'destructive',
			});
		}
	};

	const handleFileChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (e.target.files && e.target.files[0]) {
			setSelectedFile(e.target.files[0]);
		}
	};

	return (
		<div className="container mx-auto p-6 min-h-screen bg-gray-50">
			<h1 className="text-3xl font-bold mb-6 text-customBlue">
				Student Dashboard
			</h1>

			<Card className="mb-6">
				<CardHeader>
					<CardTitle className="text-xl text-customBlue">
						Your Incidents
					</CardTitle>
				</CardHeader>
				<CardContent>
					{incidents.length > 0 ? (
						<ul className="space-y-2">
							{incidents.map((incident) => (
								<li key={incident.id}>
									<Button
										variant="outline"
										className="w-full text-left justify-start hover:bg-customBlue hover:text-white"
										onClick={() =>
											setSelectedIncident(
												incident,
											)
										}
									>
										<span className="font-medium">
											Incident{' '}
											{incident.id}
										</span>{' '}
										- {incident.date}
									</Button>
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-600">
							No incidents found.
						</p>
					)}
				</CardContent>
			</Card>

			{selectedIncident && (
				<IncidentDetails
					incident={selectedIncident}
				/>
			)}

			<Card>
				<CardHeader>
					<CardTitle className="text-xl text-customBlue">
						Submit Appeal
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(
								onSubmit,
							)}
							className="space-y-4"
						>
							<FormField
								control={form.control}
								name="student_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Student ID
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												value={
													studentId
												}
												readOnly
												className="bg-gray-100"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="incident_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Incident ID
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
								control={form.control}
								name="appeal_text"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Appeal Text
										</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												placeholder="Please provide details of your appeal..."
												className="min-h-[100px]"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="space-y-2">
								<Label htmlFor="document">
									Supporting Document
								</Label>
								<Input
									id="document"
									type="file"
									onChange={
										handleFileChange
									}
									accept=".pdf,.doc,.docx"
									className="cursor-pointer"
								/>
								{selectedFile && (
									<p className="text-sm text-gray-600">
										Selected file:{' '}
										{selectedFile.name}
									</p>
								)}
							</div>

							<div className="space-y-4">
								<h3 className="font-medium text-customBlue">
									Guardian Information
								</h3>
								<FormField
									control={form.control}
									name="guardian_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Guardian
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
									control={form.control}
									name="guardian_contact"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Guardian
												Contact
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Phone or Email"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button
								type="submit"
								className="w-full bg-customBlue hover:bg-blue-700 text-white"
							>
								Submit Appeal
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}

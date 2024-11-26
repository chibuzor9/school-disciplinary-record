// src/components/StudentDash.tsx
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
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';
import { useToast } from './ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import axios from 'axios';
import React from 'react';

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
	guardian_name: z
		.string()
		.min(2, 'Guardian name is required'),
	guardian_contact: z
		.string()
		.min(10, 'Valid contact information is required'),
});

export default function StudentDash() {
	const { toast } = useToast();
	const [incidents, setIncidents] = useState<{ id: string; description: string; date: string; status: string; }[]>([]);
	const [loading, setLoading] = useState(true);
	const [studentId, setStudentId] = useState('');

	const form = useForm({
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
		const fetchData = async () => {
			try {
				const storedStudentId =
					localStorage.getItem('studentId') ||
					'STU001';
				setStudentId(storedStudentId);
				form.setValue(
					'student_id',
					storedStudentId,
				);

				const response = await axios.get(
					`http://localhost:5000/api/incidents/${storedStudentId}`,
				);
				setIncidents(response.data);
			} catch (error) {
				console.error(
					'Error fetching data:',
					error,
				);
				toast({
					title: 'Error',
					description:
						'Failed to fetch incidents',
					variant: 'destructive',
				});
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [form, toast]);

	const onSubmit = async (data) => {
		try {
			await axios.post(
				'http://localhost:5000/api/appeals',
				data,
			);
			toast({
				title: 'Success',
				description:
					'Appeal submitted successfully',
			});
			form.reset();
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

	if (loading) return <p>Loading...</p>;

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6">
				Student Dashboard
			</h1>

			<Card className="mb-6">
				<CardHeader>
					<CardTitle>Your Incidents</CardTitle>
				</CardHeader>
				<CardContent>
					{incidents.length > 0 ? (
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
										Date
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
													incident.description
												}
											</TableCell>
											<TableCell>
												{
													incident.date
												}
											</TableCell>
											<TableCell>
												{
													incident.status
												}
											</TableCell>
										</TableRow>
									),
								)}
							</TableBody>
						</Table>
					) : (
						<p>No incidents found.</p>
					)}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Submit Appeal</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={form.handleSubmit(
							onSubmit,
						)}
						className="space-y-4"
					>
						<Input
							{...form.register('student_id')}
							value={studentId}
							readOnly
							className="bg-gray-100"
						/>
						<Input
							{...form.register(
								'incident_id',
							)}
							placeholder="Incident ID"
						/>
						<Textarea
							{...form.register(
								'appeal_text',
							)}
							placeholder="Please provide details of your appeal..."
							className="min-h-[100px]"
						/>
						<Input
							{...form.register(
								'guardian_name',
							)}
							placeholder="Guardian Name"
						/>
						<Input
							{...form.register(
								'guardian_contact',
							)}
							placeholder="Guardian Contact (Phone or Email)"
						/>
						<Button
							type="submit"
							className="w-full bg-customBlue hover:bg-blue-700 text-white"
						>
							Submit Appeal
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

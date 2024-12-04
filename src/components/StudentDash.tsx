'use client';

import React from 'react';
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
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import axios from 'axios';

const appealSchema = z.object({
	Appeal_name: z
		.string()
		.min(1, 'Appeal name is required'),
	Appeal_reason: z
		.string()
		.min(
			10,
			'Appeal reason must be at least 10 characters',
		),
	Appeal_Status: z
		.string()
		.min(1, 'Appeal status is required'),
	IncidentID: z.string().min(1, 'Incident is required'),
});

interface Incident {
	id: number;
	Incident_name: string;
	Incident_date: string;
	Incident_location: string;
	Incident_sl: string;
}

export default function StudentDashboard() {
	const { toast } = useToast();
	const [incidents, setIncidents] = useState<Incident[]>(
		[],
	);
	const [loading, setLoading] = useState(true);
	const [studentId, setStudentId] = useState('');

	const form = useForm({
		resolver: zodResolver(appealSchema),
		defaultValues: {
			Appeal_name: '',
			Appeal_reason: '',
			Appeal_Status: 'Pending',
			IncidentID: '',
		},
	});

	useEffect(() => {
		const fetchIncidents = async () => {
			try {
				const storedStudentId =
					localStorage.getItem('studentId');
				if (!storedStudentId) {
					toast({
						title: 'Error',
						description:
							'No student ID found. Please login again.',
						variant: 'destructive',
					});
					return;
				}
				setStudentId(storedStudentId);

				const response = await axios.get(
					`http://localhost:5000/api/student-incidents/${storedStudentId}`,
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
				setLoading(false);
			}
		};

		fetchIncidents();
	}, [toast]);

	const onSubmit = async (
		data: z.infer<typeof appealSchema>,
	) => {
		try {
			await axios.post(
				'http://localhost:5000/api/appeals',
				{
					...data,
					StudentID: studentId,
				},
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

	if (loading) {
		return (
			<div className="flex items-center justify-center p-6">
				Loading...
			</div>
		);
	}

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">
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
										Incident Name
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
												incident.id
											}
										>
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
										</TableRow>
									),
								)}
							</TableBody>
						</Table>
					) : (
						<p className="text-center py-4">
							No incidents found.
						</p>
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
							{...form.register(
								'Appeal_name',
							)}
							placeholder="Appeal Name"
						/>
						<Select
							onValueChange={(value) =>
								form.setValue(
									'IncidentID',
									value,
								)
							}
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
						<Textarea
							{...form.register(
								'Appeal_reason',
							)}
							placeholder="Please provide details of your appeal..."
							className="min-h-[100px]"
						/>
						<Input
							{...form.register(
								'Appeal_Status',
							)}
							value="Pending"
							readOnly
							className="bg-gray-100"
						/>
						<Button
							type="submit"
							className="w-full bg-customBlue hover:border-customPurple text-white"
						>
							Submit Appeal
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

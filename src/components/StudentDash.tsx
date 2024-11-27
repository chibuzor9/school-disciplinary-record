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
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import axios from 'axios';
import React from 'react';

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
});

interface Incident {
	IncidentID: number;
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
		},
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const storedStudentId =
					localStorage.getItem('studentId') ||
					'STU001';
				setStudentId(storedStudentId);

				const response = await axios.get(
					`http://localhost:5000/api/incidents`,
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
	}, [toast]);

	const onSubmit = async (
		data: z.infer<typeof appealSchema>,
	) => {
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
							{...form.register(
								'Appeal_name',
							)}
							placeholder="Appeal Name"
						/>
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
							className="w-1/2 bg-customBlue hover:border-customPurple text-white"
						>
							Submit Appeal
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

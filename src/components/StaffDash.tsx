// src/components/StaffDash.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useToast } from './ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import axios from 'axios';
import React from 'react';

export default function StaffDash() {
    const { toast } = useToast();
    const [students, setStudents] = useState<Student[]>([]);
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [actions, setActions] = useState<Action[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('students');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentsRes, incidentsRes, actionsRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/students'),
                    axios.get('http://localhost:5000/api/incidents'),
                    axios.get('http://localhost:5000/api/actions'),
                ]);
                setStudents(studentsRes.data);
                setIncidents(incidentsRes.data);
                setActions(actionsRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch data',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Staff Dashboard</h1>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="incidents">Incidents</TabsTrigger>
                    <TabsTrigger value="actions">Disciplinary Actions</TabsTrigger>
                </TabsList>

                {/* Students Tab */}
                <TabsContent value="students">
                    <Card>
                        <CardHeader>
                            <CardTitle>Student List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Student ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>CGPA</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {students.map(student => (
                                        <TableRow key={student.student_id}>
                                            <TableCell>{student.student_id}</TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>{student.cgpa}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Incidents Tab */}
                <TabsContent value="incidents">
                    <Card>
                        <CardHeader>
                            <CardTitle>Incident List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {incidents.map(incident => (
                                        <TableRow key={incident.id}>
                                            <TableCell>{incident.id}</TableCell>
                                            <TableCell>{students.find(s => s.student_id === incident.student_id)?.name}</TableCell>
                                            <TableCell>{incident.type}</TableCell>
                                            <TableCell>{incident.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Actions Tab */}
                <TabsContent value="actions">
                    <Card>
                        <CardHeader>
                            <CardTitle>Disciplinary Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Incident ID</TableHead>
                                        <TableHead>Action Type</TableHead>
										<TableHead>Action Type</TableHead>
                                        <TableHead>Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {actions.map(action => (
                                        <TableRow key={action.id}>
                                            <TableCell>{action.id}</TableCell>
                                            <TableCell>{action.incident_id}</TableCell>
                                            <TableCell>{action.action_type}</TableCell>
                                            <TableCell>{action.description}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}	
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, Menu } from 'lucide-react';
import { Button } from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

import {
	Sheet,
	SheetContent,
	SheetTrigger,
} from './ui/Sheet';

import { Sidebar } from './Sidebar';

export function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const navigate = useNavigate();

	const [isMobileMenuOpen, setIsMobileMenuOpen] =
		useState(false);

	const logoutHandler = () => {
		navigate('/');
	};

	return (
		<div className="flex min-h-screen">
			<div className="hidden lg:flex">
				<Sidebar />
			</div>

			<Sheet
				open={isMobileMenuOpen}
				onOpenChange={setIsMobileMenuOpen}
			>
				<SheetTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="lg:hidden"
					>
						<Menu className="h-6 w-6" />
					</Button>
				</SheetTrigger>
				<SheetContent
					side="left"
					className="w-72 p-0"
				>
					<Sidebar />
				</SheetContent>
			</Sheet>

			<div className="flex-1">
				<header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6">
					<div className="flex flex-1 items-center gap-4">
						<h1 className="font-semibold text-lg">
							Staff Dashboard
						</h1>
					</div>
					<div className="flex items-center gap-4">
						<Button variant="ghost" size="icon">
							<Bell className="h-5 w-5" />
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="flex items-center gap-2"
								>
									<span>John Doe</span>
									<ChevronDown className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>
									My Account
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Link to="/profile">
										Profile
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link to="/settings">
										Settings
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link to="/">
										Sign Out
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>

				<main className="flex-1 p-6">
					{children}
				</main>
			</div>
		</div>
	);
}

"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

type Registration = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string
  institution: string;
  registrationDate: string;
  status: string;
  yearOfStudy: string; // Added yearOfStudy
};

interface RegistrationsTableProps {
  registrations: Registration[];
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function RegistrationsTable({ registrations }: RegistrationsTableProps) {
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredRegistrations = registrations.filter((registration) => {
    const fullName = `${registration.firstName} ${registration.lastName}`.toLowerCase();
    const searchMatch =
      fullName.includes(search.toLowerCase()) ||
      registration.email.toLowerCase().includes(search.toLowerCase()) ||
      registration.institution.toLowerCase().includes(search.toLowerCase());

    const statusMatch = statusFilter === "all" || registration.status === statusFilter;

    return searchMatch && statusMatch;
  });

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <Input
          placeholder="Search registrations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-sm mb-2 sm:mb-0"
        />
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone No.</TableHead>
              <TableHead>Institution</TableHead>
              <TableHead>Year of Study</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map((registration) => (
                <TableRow key={registration.id}>
                  <TableCell>{registration.firstName} {registration.lastName}</TableCell>
                  <TableCell>{registration.email}</TableCell>
                  {/* Assuming you have phoneNo in your Registration type */}
                  <TableCell>{registration.phone}</TableCell> 
                  <TableCell>{registration.institution}</TableCell>
                  <TableCell>{registration.yearOfStudy}</TableCell>
                  <TableCell>{new Date(registration.registrationDate).toLocaleDateString()}</TableCell>
                  <TableCell className="capitalize">{registration.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No registrations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

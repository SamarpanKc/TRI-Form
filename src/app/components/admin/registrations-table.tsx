"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  EyeIcon,
  TrashIcon,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/app/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Badge } from "@/app/components/ui/badge"
import { Card, CardContent } from "@/app/components/ui/card"
import type { Registration } from "@/app/lib/types"

interface RegistrationsTableProps {
  registrations: Registration[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onDelete: (id: string) => void
}

export default function RegistrationsTable({ onApprove, onReject, onDelete }: Omit<RegistrationsTableProps, "registrations">) {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [registrationToDelete, setRegistrationToDelete] = useState<string | null>(null)

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get("/api/registrations");
        setRegistrations(response.data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  // Filter registrations based on search term and status filter
  const filteredRegistrations = registrations.filter((registration) => {
    const matchesSearch =
      registration.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.institution.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || registration.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleExportCSV = () => {
    // Create CSV content
    const headers = [
      "ID",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Institution",
      "Major",
      "Year",
      "Status",
      "Registration Date",
    ].join(",")

    const rows = filteredRegistrations.map((reg) =>
      [
        reg.id,
        `"${reg.firstName}"`,
        `"${reg.lastName}"`,
        reg.email,
        reg.phone,
        `"${reg.institution}"`,
        `"${reg.major}"`,
        reg.yearOfStudy,
        reg.status,
        new Date(reg.registrationDate).toISOString(),
      ].join(","),
    )

    const csv = [headers, ...rows].join("\n")

    // Create and download the file
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `workshop-registrations-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const confirmDelete = (id: string) => {
    setRegistrationToDelete(id)
    setShowDeleteDialog(true)
  }

  const handleDelete = () => {
    if (registrationToDelete) {
      onDelete(registrationToDelete)
      setShowDeleteDialog(false)
      setRegistrationToDelete(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <ClockIcon className="h-3 w-3 mr-1" /> Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircleIcon className="h-3 w-3 mr-1" /> Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircleIcon className="h-3 w-3 mr-1" /> Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative w-full sm:w-auto">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search registrations..."
                className="pl-8 w-full sm:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <FilterIcon className="h-4 w-4 text-gray-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" onClick={handleExportCSV}>
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.length === 0 ? (
                  <TableRow>
                    <TableCell  aria-colspan={6} className="text-center py-8 text-gray-500">
                      No registrations found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRegistrations.map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell className="font-medium">
                        {registration.firstName} {registration.lastName}
                      </TableCell>
                      <TableCell>{registration.email}</TableCell>
                      <TableCell>{registration.institution}</TableCell>
                      <TableCell>{new Date(registration.registrationDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(registration.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setSelectedRegistration(registration)}>
                            <EyeIcon className="h-4 w-4" />
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Actions
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => onApprove(registration.id)}
                                disabled={registration.status === "approved"}
                              >
                                <CheckCircleIcon className="h-4 w-4 mr-2 text-green-600" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onReject(registration.id)}
                                disabled={registration.status === "rejected"}
                              >
                                <XCircleIcon className="h-4 w-4 mr-2 text-red-600" />
                                Reject
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => confirmDelete(registration.id)}>
                                <TrashIcon className="h-4 w-4 mr-2 text-gray-600" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredRegistrations.length} of {registrations.length} registrations
          </div>
        </CardContent>
      </Card>

      {/* Registration Details Dialog */}
      {selectedRegistration && (
        <Dialog open={!!selectedRegistration} onOpenChange={(open) => !open && setSelectedRegistration(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Registration Details</DialogTitle>
              <DialogDescription>
                Complete information for {selectedRegistration.firstName} {selectedRegistration.lastName}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-gray-500">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">First Name</p>
                    <p>{selectedRegistration.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Last Name</p>
                    <p>{selectedRegistration.lastName}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{selectedRegistration.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p>{selectedRegistration.phone}</p>
                </div>

                <h3 className="font-medium text-sm text-gray-500 pt-2">Academic Information</h3>
                <div>
                  <p className="text-sm font-medium text-gray-500">Institution</p>
                  <p>{selectedRegistration.institution}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Major</p>
                  <p>{selectedRegistration.major}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Year of Study</p>
                  <p className="capitalize">{selectedRegistration.yearOfStudy}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-sm text-gray-500">Additional Information</h3>
                {selectedRegistration.tshirtSize && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">T-shirt Size</p>
                    <p className="uppercase">{selectedRegistration.tshirtSize}</p>
                  </div>
                )}

                {(selectedRegistration.accessibilityRequirements ?? []).length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Accessibility Requirements</p>
                    <ul className="list-disc list-inside">
                      {(selectedRegistration.accessibilityRequirements ?? []).map((req) => (
                        <li key={req}>{req}</li>
                      ))}
                    </ul>
                    {selectedRegistration.otherAccessibilityRequirements && (
                      <p className="mt-1 text-sm">Other: {selectedRegistration.otherAccessibilityRequirements}</p>
                    )}
                  </div>
                )}

                {selectedRegistration.questions && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Questions/Comments</p>
                    <p className="whitespace-pre-wrap text-sm">{selectedRegistration.questions}</p>
                  </div>
                )}

                <div className="pt-4">
                  <p className="text-sm font-medium text-gray-500">Registration Status</p>
                  <div className="mt-1">{getStatusBadge(selectedRegistration.status)}</div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Registration Date</p>
                  <p>{new Date(selectedRegistration.registrationDate).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => onApprove(selectedRegistration.id)}
                  disabled={selectedRegistration.status === "approved"}
                >
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onReject(selectedRegistration.id)}
                  disabled={selectedRegistration.status === "rejected"}
                >
                  <XCircleIcon className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this registration? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

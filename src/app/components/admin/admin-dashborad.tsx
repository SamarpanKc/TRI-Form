"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import RegistrationsTable from "@/app/components/admin/registrations-table"
import RegistrationStats from "@/app/components/admin/registration-stats"
import { mockRegistrations } from "@/app/lib/mock-data"

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState(mockRegistrations)

  const approveRegistration = (id: string) => {
    setRegistrations(registrations.map((reg) => (reg.id === id ? { ...reg, status: "approved" } : reg)))
  }

  const rejectRegistration = (id: string) => {
    setRegistrations(registrations.map((reg) => (reg.id === id ? { ...reg, status: "rejected" } : reg)))
  }

  const deleteRegistration = (id: string) => {
    setRegistrations(registrations.filter((reg) => reg.id !== id))
  }

  return (
    <Tabs defaultValue="registrations" className="space-y-4">
      <TabsList>
        <TabsTrigger value="registrations">Registrations</TabsTrigger>
        <TabsTrigger value="statistics">Statistics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="registrations" className="space-y-4">
        <RegistrationsTable
          registrations={registrations}
          onApprove={approveRegistration}
          onReject={rejectRegistration}
          onDelete={deleteRegistration}
        />
      </TabsContent>

      <TabsContent value="statistics">
        <RegistrationStats registrations={registrations} />
      </TabsContent>

      <TabsContent value="settings">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Dashboard Settings</h2>
          <p className="text-gray-500">Settings panel would go here. This could include options to:</p>
          <ul className="list-disc list-inside mt-2 text-gray-500">
            <li>Configure email notifications</li>
            <li>Set registration limits</li>
            <li>Customize form fields</li>
            <li>Manage admin users</li>
          </ul>
        </div>
      </TabsContent>
    </Tabs>
  )
}

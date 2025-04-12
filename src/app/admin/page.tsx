import { Metadata } from "next"
import AdminDashboard from "@/app/components/admin/admin-dashborad"
import AdminAuthWrapper from "@/app/components/admin/admin-auth-wrapper"
import Image from "next/image"

import Logo from "@/app/assets/trilogo.png";

export const metadata: Metadata = {
  title: "Workshop Admin Dashboard",
  description: "Manage workshop registrations",
}

export default function AdminPage() {
  return (
    <AdminAuthWrapper>
      <main className="container mx-auto py-6 px-4">
        <div className="header flex items-center mb-8 gap-4">
          <Image src={Logo} alt="" width={70} />
        <h1 className="text-3xl font-bold ">Admin Dashboard</h1>
        </div>
      
        <AdminDashboard />
      </main>
    </AdminAuthWrapper>
  )
}

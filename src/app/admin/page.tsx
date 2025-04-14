"use client"; // If using App Router

import AdminAuthWrapper from "@/app/components/admin/admin-auth-wrapper"; // Adjust path as needed
import AdminDashboard from "@/app/components/admin/admin-dashboard"; // Adjust path as needed

export default function AdminPage() {
  return (
    <AdminAuthWrapper>
      <AdminDashboard />
    </AdminAuthWrapper>
  );
}
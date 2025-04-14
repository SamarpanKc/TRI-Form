"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import RegistrationsTable from "./registrations-table";
import RegistrationStats from "./registration-stats";
import supabase from "@/app/lib/supabase";
import { Registration } from "@/app/lib/types";

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user session and check authentication
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("test_workshop")
          .select("*")
          .order("registration_date", { ascending: false });

        if (error) {
          throw error;
        }

        // Transform the data to match the Registration type
        const transformedData = data?.map(item => ({
          id: item.id,
          first_name: item.first_name || '',
          last_name: item.last_name || '',
          email: item.email || '',
          phone: item.phone || '',
          institution: item.institution || '',
          major: item.major || '',
          year_of_study: item.year_of_study || '',
          status: item.status || 'approved',
          registration_date: item.registration_date,
          // Add these properties for the RegistrationsTable component
          firstName: item.first_name || '',
          lastName: item.last_name || '',
          yearOfStudy: item.year_of_study || '',
          registrationDate: item.registration_date
        })) || [];

        setRegistrations(transformedData as Registration[]);
      } catch (err) {
        console.error("Error fetching registrations:", err);
        setError("Failed to load registrations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const approveRegistration = async (id: string) => {
    try {
      const { error } = await supabase
        .from("test_workshop")
        .update({ status: "approved" })
        .eq("id", id);

      if (error) {
        throw error;
      }

      setRegistrations((prev) =>
        prev.map((reg) => (reg.id.toString() === id ? { ...reg, status: "approved" } : reg))
      );
    } catch (err) {
      console.error("Error approving registration:", err);
    }
  };

  const rejectRegistration = async (id: string) => {
    try {
      const { error } = await supabase
        .from("test_workshop")
        .update({ status: "rejected" })
        .eq("id", id); // No need to convert id to a number

      if (error) {
        throw error;
      }

      setRegistrations((prev) =>
        prev.map((reg) => (reg.id === id ? { ...reg, status: "rejected" } : reg)) // Compare id as a string
      );
    } catch (err) {
      console.error("Error rejecting registration:", err);
    }
  };

  const deleteRegistration = async (id: string) => {
    try {
      const { error } = await supabase
        .from("test_workshop")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      setRegistrations((prev) => prev.filter((reg) => reg.id !== id));
    } catch (err) {
      console.error("Error deleting registration:", err);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  return (
    <Tabs defaultValue="registrations" className="space-y-4">
      <h2 className="font-bold p-6 text-3xl"> Admin Pannel</h2>
      <TabsList className="border-none px-6">
        <TabsTrigger value="registrations" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white ">
          Registrations
        </TabsTrigger>
        <TabsTrigger value="statistics" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white ">
          Statistics
        </TabsTrigger>
        <TabsTrigger value="settings" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
          Settings
        </TabsTrigger>
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
  );
}

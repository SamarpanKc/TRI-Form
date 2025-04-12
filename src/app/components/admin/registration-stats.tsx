"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import type { Registration } from "@/app/lib/types"
import {
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  BarChart3Icon,
  TrendingUpIcon,
  BuildingIcon,
  GraduationCapIcon,
} from "lucide-react"

interface RegistrationStatsProps {
  registrations: Registration[]
}

export default function RegistrationStats({ registrations }: RegistrationStatsProps) {
  const stats = useMemo(() => {
    // Status counts
    const approved = registrations.filter((r) => r.status === "approved").length
    const pending = registrations.filter((r) => r.status === "pending").length
    const rejected = registrations.filter((r) => r.status === "rejected").length

    // Institution stats
    const institutions = registrations.reduce(
      (acc, reg) => {
        acc[reg.institution] = (acc[reg.institution] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const topInstitutions = Object.entries(institutions)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    // Major stats
    const majors = registrations.reduce(
      (acc, reg) => {
        acc[reg.major] = (acc[reg.major] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const topMajors = Object.entries(majors)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    // Year of study stats
    const yearOfStudy = registrations.reduce(
      (acc, reg) => {
        acc[reg.yearOfStudy] = (acc[reg.yearOfStudy] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Registration trend (last 7 days)
    const now = new Date()
    const dailyRegistrations = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dateString = date.toISOString().split("T")[0]

      return {
        date: dateString,
        count: registrations.filter((r) => {
          const regDate = new Date(r.registrationDate).toISOString().split("T")[0]
          return regDate === dateString
        }).length,
      }
    }).reverse()

    return {
      total: registrations.length,
      approved,
      pending,
      rejected,
      topInstitutions,
      topMajors,
      yearOfStudy,
      dailyRegistrations,
    }
  }, [registrations])

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Registrations</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <UsersIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="text-3xl font-bold">{stats.approved}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-3xl font-bold">{stats.pending}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="text-3xl font-bold">{stats.rejected}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <XCircleIcon className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Trend */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <TrendingUpIcon className="h-5 w-5 mr-2 text-gray-500" />
              <CardTitle>Registration Trend</CardTitle>
            </div>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-between gap-2">
              {stats.dailyRegistrations.map((day) => {
                const height = day.count
                  ? (day.count / Math.max(...stats.dailyRegistrations.map((d) => d.count))) * 100
                  : 0

                return (
                  <div key={day.date} className="flex flex-col items-center flex-1">
                    <div className="w-full bg-primary/80 rounded-t-sm" style={{ height: `${height}%` }}></div>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(day.date).toLocaleDateString(undefined, { weekday: "short" })}
                    </p>
                    <p className="text-xs font-medium">{day.count}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Year of Study Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <GraduationCapIcon className="h-5 w-5 mr-2 text-gray-500" />
              <CardTitle>Year of Study</CardTitle>
            </div>
            <CardDescription>Distribution of participants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.yearOfStudy).map(([year, count]) => {
                const percentage = (count / stats.total) * 100

                return (
                  <div key={year} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <p className="font-medium capitalize">{year}</p>
                      <p className="text-gray-500">
                        {count} ({percentage.toFixed(1)}%)
                      </p>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-primary rounded-full h-2" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Institutions */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <BuildingIcon className="h-5 w-5 mr-2 text-gray-500" />
              <CardTitle>Top Institutions</CardTitle>
            </div>
            <CardDescription>Most common institutions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topInstitutions.map(([institution, count]) => {
                const percentage = (count / stats.total) * 100

                return (
                  <div key={institution} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <p className="font-medium truncate flex-1">{institution}</p>
                      <p className="text-gray-500">
                        {count} ({percentage.toFixed(1)}%)
                      </p>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-primary rounded-full h-2" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Majors */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <BarChart3Icon className="h-5 w-5 mr-2 text-gray-500" />
              <CardTitle>Top Majors</CardTitle>
            </div>
            <CardDescription>Most common fields of study</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topMajors.map(([major, count]) => {
                const percentage = (count / stats.total) * 100

                return (
                  <div key={major} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <p className="font-medium truncate flex-1">{major}</p>
                      <p className="text-gray-500">
                        {count} ({percentage.toFixed(1)}%)
                      </p>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-primary rounded-full h-2" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

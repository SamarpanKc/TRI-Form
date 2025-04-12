import type { Registration } from "./types"

// Generate random date within the last 30 days
const getRandomDate = () => {
  const now = new Date()
  const daysAgo = Math.floor(Math.random() * 30)
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
  return date.toISOString()
}

// Sample institutions
const institutions = [
  "University of California, Berkeley",
  "Stanford University",
  "Massachusetts Institute of Technology",
  "Harvard University",
  "University of Michigan",
  "University of Washington",
  "Georgia Institute of Technology",
  "University of Texas at Austin",
  "Carnegie Mellon University",
  "University of Illinois at Urbana-Champaign",
]

// Sample majors
const majors = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Data Science",
  "Business Administration",
  "Physics",
  "Mathematics",
  "Biology",
  "Chemistry",
  "Psychology",
]

// Sample years of study
const yearsOfStudy = ["freshman", "sophomore", "junior", "senior", "graduate"]

// Sample accessibility requirements
const accessibilityOptions = ["wheelchair", "sign-language", "large-print", "dietary", "other"]

// Sample t-shirt sizes
const tshirtSizes = ["xs", "s", "m", "l", "xl", "xxl"]

// Sample statuses
const statuses: Array<"pending" | "approved" | "rejected"> = ["pending", "approved", "rejected"]

// Generate a mock registration
const generateMockRegistration = (id: number): Registration => {
  const firstName = ["John", "Jane", "Michael", "Emily", "David", "Sarah", "James", "Emma", "Robert", "Olivia"][
    Math.floor(Math.random() * 10)
  ]
  const lastName = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
  ][Math.floor(Math.random() * 10)]

  const hasAccessibilityRequirements = Math.random() > 0.7
  const accessibilityRequirements = hasAccessibilityRequirements
    ? Array.from(
        { length: Math.floor(Math.random() * 3) + 1 },
        () => accessibilityOptions[Math.floor(Math.random() * accessibilityOptions.length)],
      ).filter((value, index, self) => self.indexOf(value) === index)
    : []

  const otherAccessibilityRequirements = accessibilityRequirements.includes("other")
    ? "I need a special accommodation for my condition."
    : undefined

  const hasTshirt = Math.random() > 0.3
  const tshirtSize = hasTshirt ? tshirtSizes[Math.floor(Math.random() * tshirtSizes.length)] : undefined

  const hasQuestions = Math.random() > 0.7
  const questions = hasQuestions
    ? "I have a question about the workshop schedule and materials we need to bring."
    : undefined

  const institution = institutions[Math.floor(Math.random() * institutions.length)]
  const major = majors[Math.floor(Math.random() * majors.length)]
  const yearOfStudy = yearsOfStudy[Math.floor(Math.random() * yearsOfStudy.length)]
  const status = statuses[Math.floor(Math.random() * statuses.length)]

  return {
    id: `reg-${id.toString().padStart(4, "0")}`,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    institution,
    major,
    yearOfStudy,
    tshirtSize,
    accessibilityRequirements,
    otherAccessibilityRequirements,
    questions,
    dataConsent: true,
    status,
    registrationDate: getRandomDate(),
  }
}

// Generate 50 mock registrations
export const mockRegistrations: Registration[] = Array.from({ length: 50 }, (_, i) => generateMockRegistration(i + 1))

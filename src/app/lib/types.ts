export interface Registration {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    institution: string
    major: string
    yearOfStudy: string
    tshirtSize?: string
    accessibilityRequirements?: string[]
    otherAccessibilityRequirements?: string
    questions?: string
    dataConsent: boolean
    status: "pending" | "approved" | "rejected"
    registrationDate: string
  }
  
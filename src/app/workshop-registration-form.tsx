"use client";

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CheckIcon, ChevronRightIcon, ChevronLeftIcon, Loader2Icon } from "lucide-react"
import Link from "next/link";
// import PrivacyPolicy from "@/components/privacy-policy"

import { Button } from "@/app/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Card, CardContent } from "@/app/components/ui/card"

// Form schema with validation
const formSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),

  // Academic Information
  institution: z.string().min(2, { message: "Institution name is required." }),
  major: z.string().min(2, { message: "Field of study is required." }),
  yearOfStudy: z.string().min(1, { message: "Please select your year of study." }),

  // Consent
  dataConsent: z.boolean().refine((value) => value === true, {
    message: "You must agree to the data collection policy.",
  }),
})

type FormValues = z.infer<typeof formSchema>

const steps = [
  { id: "step-1", name: "Personal Information" },
  { id: "step-2", name: "Academic Information" },
  { id: "step-3", name: "Review & Submit" },
]

export default function WorkshopRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      institution: "",
      major: "",
      yearOfStudy: "",
      dataConsent: false,
    },
  })

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const result = await response.json();
        if (response.ok) {
          console.log("Success:", result);
          setIsSubmitted(true);
        } else {
          console.error("Error:", result.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  const next = async () => {
    const fields = [
      ["firstName", "lastName", "email", "phone"],
      ["institution", "major", "yearOfStudy"],
      ["dataConsent"],
    ][currentStep]

    const isValid = await form.trigger(fields as (keyof FormValues)[], { shouldFocus: true })

    if (isValid) {
      setCurrentStep((step) => step + 1)
    }
  }

  const prev = () => {
    setCurrentStep((step) => step - 1)
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Registration Complete!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for registering for our workshop. We will sent a email to your inbox soon.
            </p>
            <p className="text-gray-600">
              You will receive additional details about the workshop closer to the event date.
            </p>
            <Button
              className="mt-6"
              onClick={() => {
                form.reset()
                setCurrentStep(0)
                setIsSubmitted(false)
              }}
            >
              Register Another Participant
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="pt-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= index ? "bg-primary text-primary-foreground" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-xs mt-1 hidden sm:block">{step.name}</span>
              </div>
            ))}
          </div>
          <div className="relative w-full h-1 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-1 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Samarpan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="KC" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="samarpan.kc@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+977-9812345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 2: Academic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Academic Information</h2>
                <FormField
                  control={form.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>College/Institution Name</FormLabel>
                        <FormControl>
                        <Input
                          placeholder="PNC, TU"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                        />
                        </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="major"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Major/Field of Study</FormLabel>
                      <FormControl>
                        <Input placeholder="BCA" {...field} 
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="yearOfStudy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year of Study</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your year of study" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="1st Year (1st and 2nd Semester)">1st Year (1st and 2nd Semester)</SelectItem>
                            <SelectItem value="2nd Year (3rd and 4th Semester)">2nd Year (3rd and 4th Semester)</SelectItem>
                            <SelectItem value="3rd Year (5th and 6th Semester)">3rd Year (5th and 6th Semester)</SelectItem>
                            <SelectItem value="4th Year (7th and 8th Semester)">4th Year (7th and 8th Semester)</SelectItem>
                            <SelectItem value="+2/A Level">+2/A Level</SelectItem>
                            <SelectItem value="Secondary Level">Secondary Level</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Review & Submit</h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Personal Information</h3>
                      <p>
                        <span className="font-medium">Name:</span> {form.getValues("firstName")}{" "}
                        {form.getValues("lastName")}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {form.getValues("email")}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {form.getValues("phone")}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Academic Information</h3>
                      <p>
                        <span className="font-medium">Collage/Instution:</span> {form.getValues("institution")}
                      </p>
                      <p>
                        <span className="font-medium">Major:</span> {form.getValues("major")}
                      </p>
                      <p>
                        <span className="font-medium">Year/Sem:</span> {form.getValues("yearOfStudy")}
                      </p>
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="dataConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} className="cursor-pointer" onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I agree to the collection and processing of my personal data</FormLabel>
                        <FormDescription>
                          By checking this box, you agree to our{" "}
                            <Link href="/privacy" className="text-primary underline" target="_blank">
                            Privacy Policy
                            </Link>
                          .
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button type="button" className="cursor-pointer" variant="outline" onClick={prev} disabled={currentStep === 0}>
                <ChevronLeftIcon className="mr-2 h-4 w-4" /> Previous
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={next}>
                  Next <ChevronRightIcon className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Join the Workshop!"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

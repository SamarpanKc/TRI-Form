"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Lock,
  FileText,
  Globe,
  UserCheck,
  AlertTriangle,
  Bookmark,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";

const PrivacyPolicy = () => {
  // Function to scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <head>
        <title>Privacy Policy | Workshop Registration</title>
        <meta
          name="description"
          content="Our commitment to protecting your privacy and personal data"
        />
      </head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Back button */}
          <Link href="/" className="inline-flex mb-8">
            <Button
              variant="ghost"
              className="gap-2 text-slate-600 hover:text-slate-100 cursor-pointer"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-extrabold mb-4 text-slate-900">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We value your trust and are committed to protecting your personal
              information. This policy explains how we collect, use, and
              safeguard your data.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 text-gray-800 p-6 mb-10">
            <h2 className="font-semibold text-lg mb-4">Contents</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                {
                  id: "collection",
                  title: "Information Collection",
                  icon: <FileText size={16} />,
                },
                {
                  id: "use",
                  title: "Data Usage",
                  icon: <UserCheck size={16} />,
                },
                {
                  id: "sharing",
                  title: "Information Sharing",
                  icon: <Globe size={16} />,
                },
                {
                  id: "security",
                  title: "Data Security",
                  icon: <Lock size={16} />,
                },
                {
                  id: "cookies",
                  title: "Cookies & Tracking",
                  icon: <Bookmark size={16} />,
                },
                {
                  id: "rights",
                  title: "Your Rights",
                  icon: <UserCheck size={16} />,
                },
                {
                  id: "children",
                  title: "Children's Privacy",
                  icon: <AlertTriangle size={16} />,
                },
                {
                  id: "changes",
                  title: "Policy Changes",
                  icon: <FileText size={16} />,
                },
                {
                  id: "contact",
                  title: "Contact Information",
                  icon: <FileText size={16} />,
                },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-blue-600">{item.icon}</span>
                    <span>{item.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Last Updated */}
          <div className="text-sm text-slate-500 mb-8">
            Last Updated: April 14, 2025
          </div>

          {/* Main Content */}
          <div className="prose max-w-none">
            <section id="collection" className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  1. Information We Collect
                </h2>
              </div>
              <div className="pl-10">
                <p className="mb-4 text-slate-700">
                  We collect various types of information to provide and improve
                  our services to you. This information falls into several
                  categories:
                </p>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  1.1 Personal Information
                </h3>
                <p className="mb-3 text-slate-700">
                  When you register for our workshop, we collect:
                </p>
                <ul className="list-disc list-inside mb-6 text-slate-700 space-y-1">
                  <li>Full name (first name and last name)</li>
                  <li>Email address</li>
                  <li>Contact phone number</li>
                  <li>Educational institution or company affiliation</li>
                  <li>Year of study (for students)</li>
                  <li>Major or field of study (if applicable)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  1.2 Payment Information
                </h3>
                <p className="mb-3 text-slate-700">
                  For workshops that require payment, we may collect payment
                  information, which is processed through secure third-party
                  payment processors. We do not store complete credit card
                  information on our servers.
                </p>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  1.3 Workshop Participation Data
                </h3>
                <p className="mb-3 text-slate-700">
                  Throughout the workshop experience, we may collect:
                </p>
                <ul className="list-disc list-inside mb-6 text-slate-700 space-y-1">
                  <li>Attendance records</li>
                  <li>Participation in discussions and activities</li>
                  <li>Submissions and completed exercises</li>
                  <li>Feedback and survey responses</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  1.4 Technical Information
                </h3>
                <p className="mb-3 text-slate-700">
                  When you access our platform, we automatically collect:
                </p>
                <ul className="list-disc list-inside mb-6 text-slate-700 space-y-1">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>Operating system</li>
                  <li>Date and time of access</li>
                  <li>Pages visited and features used</li>
                </ul>
              </div>
            </section>

            <section id="use" className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <UserCheck className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  2. How We Use Your Information
                </h2>
              </div>
              <div className="pl-10">
                <p className="mb-4 text-slate-700">
                  We use the collected information for various purposes to
                  provide, maintain, and improve our services:
                </p>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  2.1 Workshop Administration
                </h3>
                <ul className="list-disc list-inside mb-6 text-slate-700 space-y-1">
                  <li>Process registrations and payments</li>
                  <li>Authenticate your access to workshop materials</li>
                  <li>Track attendance and participation</li>
                  <li>Provide technical and educational support</li>
                  <li>Issue certificates of completion (where applicable)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  2.2 Communication
                </h3>
                <ul className="list-disc list-inside mb-6 text-slate-700 space-y-1">
                  <li>Send important workshop updates and announcements</li>
                  <li>Provide pre-workshop materials and instructions</li>
                  <li>Send reminders about upcoming sessions</li>
                  <li>Follow up with post-workshop resources</li>
                  <li>Request feedback and evaluations</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  2.3 Service Improvement
                </h3>
                <ul className="list-disc list-inside mb-6 text-slate-700 space-y-1">
                  <li>Analyze usage patterns to enhance workshop content</li>
                  <li>
                    Identify technical issues and improve platform performance
                  </li>
                  <li>
                    Develop new features and offerings based on user feedback
                  </li>
                  <li>Conduct research to improve educational efficacy</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  2.4 Legal and Compliance
                </h3>
                <ul className="list-disc list-inside mb-6 text-slate-700 space-y-1">
                  <li>Comply with applicable laws and regulations</li>
                  <li>Enforce our terms of service</li>
                  <li>Protect against fraudulent or unauthorized activity</li>
                  <li>Address disputes and troubleshoot problems</li>
                </ul>
              </div>
            </section>

            <section id="sharing" className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Globe className="h-5 w-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  3. Information Sharing and Disclosure
                </h2>
              </div>
              <div className="pl-10">
                <p className="mb-4 text-slate-700">
                  We respect your privacy and are committed to protecting your
                  personal information. We do not sell, rent, or trade your
                  personal data to third parties for marketing purposes. We may
                  share your information in the following circumstances:
                </p>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  3.1 Service Providers
                </h3>
                <p className="mb-3 text-slate-700">
                  We work with trusted third-party service providers who perform
                  services on our behalf, including:
                </p>
                <ul className="list-disc list-inside mb-6 text-slate-700 space-y-1">
                  <li>Payment processors for handling transactions</li>
                  <li>Cloud hosting and storage providers</li>
                  <li>Email and communication platforms</li>
                  <li>Analytics services to improve our offerings</li>
                  <li>Customer support systems</li>
                </ul>
                <p className="mb-4 text-slate-700">
                  These providers are contractually obligated to use your
                  information only for the specific services they provide to us
                  and are prohibited from using your data for their own
                  purposes.
                </p>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  3.2 Legal Requirements
                </h3>
                <p className="mb-3 text-slate-700">
                  We may disclose your information if required by law,
                  regulation, legal process, or governmental request, including:
                </p>
                <ul className="list-disc list-inside mb-6 text-slate-700 space-y-1">
                  <li>
                    In response to a court order, subpoena, or similar legal
                    process
                  </li>
                  <li>To comply with laws or regulations</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>To protect the rights, property, or safety of others</li>
                  <li>To investigate potential violations of our terms</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  3.3 Business Transfers
                </h3>
                <p className="mb-4 text-slate-700">
                  If we are involved in a merger, acquisition, or sale of all or
                  a portion of our assets, your information may be transferred
                  as part of that transaction. We will notify you via email
                  and/or a prominent notice on our website of any change in
                  ownership or uses of your personal information.
                </p>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  3.4 With Your Consent
                </h3>
                <p className="mb-4 text-slate-700">
                  We may share your information with third parties when you have
                  given us your consent to do so. You can withdraw this consent
                  at any time.
                </p>
              </div>
            </section>

            <section id="security" className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Lock className="h-5 w-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  4. Data Security
                </h2>
              </div>
              <div className="pl-10">
                <p className="mb-4 text-slate-700">
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction:
                </p>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  4.1 Security Measures
                </h3>
                <ul className="list-disc list-inside mb-6 text-slate-700 space-y-1">
                  <li>
                    Encryption of sensitive data both in transit and at rest
                  </li>
                  <li>Regular security assessments and testing</li>
                  <li>Access controls limiting who can access your data</li>
                  <li>Secure authentication mechanisms</li>
                  <li>Regular monitoring for suspicious activities</li>
                  <li>Data backups to prevent loss</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  4.2 Data Retention
                </h3>
                <p className="mb-4 text-slate-700">
                  We retain your personal information only for as long as
                  necessary to fulfill the purposes outlined in this Privacy
                  Policy, unless a longer retention period is required or
                  permitted by law. When determining our retention periods, we
                  consider:
                </p>
                <ul className="list-disc list-inside mb-6 text-slate-700 space-y-1">
                  <li>
                    The amount, nature, and sensitivity of the information
                  </li>
                  <li>
                    The potential risk of harm from unauthorized use or
                    disclosure
                  </li>
                  <li>The purposes for which we process the data</li>
                  <li>
                    Whether we can achieve those purposes through other means
                  </li>
                  <li>Legal and regulatory requirements</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  4.3 Security Limitations
                </h3>
                <p className="mb-4 text-slate-700">
                  While we strive to use commercially acceptable means to
                  protect your personal information, no method of transmission
                  over the internet or method of electronic storage is 100%
                  secure. We cannot guarantee its absolute security. You are
                  responsible for maintaining the confidentiality of any
                  passwords associated with your account.
                </p>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  4.4 Data Breach Procedures
                </h3>
                <p className="mb-4 text-slate-700">
                  In the event of a data breach that compromises your personal
                  information, we will notify you and the appropriate regulatory
                  authorities as required by applicable laws. We will provide
                  information about the breach, its potential impact, and the
                  measures we are taking to address it.
                </p>
              </div>
            </section>

            <section id="cookies" className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <Bookmark className="h-5 w-5 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  5. Cookies and Tracking Technologies
                </h2>
              </div>
              <div className="pl-10">
                <p className="mb-4 text-slate-700">
                  We use cookies and similar tracking technologies to collect
                  and use information about you and your interaction with our
                  website:
                </p>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  5.1 Types of Cookies We Use
                </h3>
                <ul className="list-disc list-inside mb-6 text-slate-700 space-y-1">
                  <li>
                    <strong>Essential Cookies:</strong> Required for the website
                    to function properly
                  </li>
                  <li>
                    <strong>Functionality Cookies:</strong> Enable features and
                    remember your preferences
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> Help us understand how
                    visitors interact with our site
                  </li>
                  <li>
                    <strong>Performance Cookies:</strong> Collect information
                    about how you use our website
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  5.2 Cookie Management
                </h3>
                <p className="mb-4 text-slate-700">
                  Most web browsers allow you to control cookies through their
                  settings. You can typically delete existing cookies, block
                  certain cookies, or be notified when you receive new cookies.
                  However, disabling cookies may limit your ability to use some
                  features of our website.
                </p>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  5.3 Third-Party Cookies
                </h3>
                <p className="mb-4 text-slate-700">
                  Some third-party services we use, such as analytics providers
                  and payment processors, may place their own cookies on your
                  device. These third parties have their own privacy policies
                  which govern how they use this information.
                </p>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  5.4 Do Not Track
                </h3>
                <p className="mb-4 text-slate-700">
                  Some browsers have a &quot;Do Not Track&quot; feature that
                  signals websites that you do not want to have your online
                  activities tracked. Because there is not yet a common
                  understanding of how to interpret Do Not Track signals, we
                  currently do not respond to Do Not Track browser signals.
                </p>
              </div>
            </section>

            <section id="rights" className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-teal-100 p-2 rounded-full">
                  <UserCheck className="h-5 w-5 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  6. Your Rights and Choices
                </h2>
              </div>
              <div className="pl-10">
                <p className="mb-4 text-slate-700">
                  Depending on your location, you may have various rights
                  regarding your personal information:
                </p>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  6.1 Access and Correction
                </h3>
                <p className="mb-4 text-slate-700">
                  You have the right to access, correct, or update the personal
                  information we hold about you. You can access and modify most
                  of your personal information through your account settings or
                  by contacting us directly.
                </p>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  6.2 Data Portability
                </h3>
                <p className="mb-4 text-slate-700">
                  Where applicable, you may have the right to request a copy of
                  your personal information in a structured, commonly used, and
                  machine-readable format, and to have this information
                  transmitted to another service provider.
                </p>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  6.3 Deletion
                </h3>
                <p className="mb-4 text-slate-700">
                  You may have the right to request deletion of your personal
                  information in certain circumstances, subject to legal
                  obligations that may require us to retain your data.
                </p>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  6.4 Restriction and Objection
                </h3>
                <p className="mb-4 text-slate-700">
                  You may have the right to request that we restrict processing
                  of your personal information or to object to our processing of
                  your information in certain circumstances.
                </p>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  6.5 Withdrawal of Consent
                </h3>
                <p className="mb-4 text-slate-700">
                  Where we process your data based on your consent, you have the
                  right to withdraw that consent at any time. This will not
                  affect the lawfulness of processing based on consent before
                  its withdrawal.
                </p>

                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  6.6 Exercising Your Rights
                </h3>
                <p className="mb-4 text-slate-700">
                  To exercise any of these rights, please contact us using the
                  information provided in the &quot; Contact Us&quot;section. We
                  will respond to your request within the timeframe specified by
                  applicable law.
                </p>
              </div>
            </section>

            <section id="children" className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  7. Children&apos;s Privacy
                </h2>
              </div>
              <div className="pl-10">
                <p className="mb-4 text-slate-700">
                  Our workshops and services are not directed to individuals
                  under 16 years of age, and we do not knowingly collect
                  personal information from children under 16. If we learn that
                  we have collected personal information from a child under 16,
                  we will take steps to delete such information as soon as
                  possible.
                </p>
                <p className="mb-4 text-slate-700">
                  If you believe we have inadvertently collected information
                  from a person under 16, please contact us immediately, and we
                  will take steps to remove this information.
                </p>
              </div>
            </section>

            <section id="changes" className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-slate-100 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-slate-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  8. Changes to This Privacy Policy
                </h2>
              </div>
              <div className="pl-10">
                <p className="mb-4 text-slate-700">
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices, technologies, legal requirements,
                  and other factors. When we make changes, we will update the
                  &quot; Last Updated&quot; date at the top of this policy and
                  take other appropriate measures to notify you.
                </p>
                <p className="mb-4 text-slate-700">
                  We encourage you to periodically review this page for the
                  latest information on our privacy practices. Your continued
                  use of our services after the posting of changes constitutes
                  your acceptance of such changes.
                </p>
                <p className="mb-4 text-slate-700">
                  For significant changes that materially alter your rights or
                  our usage of your personal information, we will provide more
                  prominent notice, such as sending you an email notification or
                  displaying a banner on our website.
                </p>
              </div>
            </section>

            <section id="contact" className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  9. Contact Information
                </h2>
              </div>
              <div className="pl-10">
                <p className="mb-4 text-slate-700">
                  If you have any questions, concerns, or requests regarding
                  this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 mb-4">
                  <p className="mb-2 text-slate-700">
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:privacy@workshop.com"
                      className="text-blue-600 hover:underline"
                    >
                      privacy@workshop.com
                    </a>
                  </p>
                  <p className="mb-2 text-slate-700">
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                  <p className="text-slate-700">
                    <strong>Address:</strong> Workshop Privacy Office
                    <br />
                    123 Education Lane
                    <br />
                    Learning City, LC 12345
                    <br />
                    United States
                  </p>
                </div>
                <p className="mb-4 text-slate-700">
                  We will do our best to address your inquiry promptly. If you
                  have an unresolved privacy or data use concern that we have
                  not addressed satisfactorily, please contact our third-party
                  dispute resolution provider.
                </p>
              </div>
            </section>
          </div>

          {/* Agreement and print */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => window.print()}
            >
              Print this policy
            </Button>

            <Link href="/" className="w-full sm:w-auto">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                I understand and agree
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;

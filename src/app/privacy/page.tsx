import React from 'react';
const PrivacyPolicy = () => {
  return (
    <>
    <head>
      <title>Registration</title>
    </head>
    
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-6">
        Welcome to our online workshop! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
      </p>

      <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        During registration and participation in our workshop, we may collect the following information:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>Your name and contact details (email, phone number).</li>
        <li>Payment information (processed securely through third-party payment gateways).</li>
        <li>Workshop-related data (feedback, questions, and participation details).</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">We use your information to:</p>
      <ul className="list-disc list-inside mb-6">
        <li>Provide access to the workshop and related resources.</li>
        <li>Communicate updates, reminders, and follow-ups.</li>
        <li>Improve our workshop content and user experience.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">3. Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell or share your personal information with third parties, except:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>When required by law or legal processes.</li>
        <li>With trusted service providers (e.g., payment processors) to facilitate the workshop.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
      <p className="mb-6">
        We implement industry-standard measures to protect your data. However, no method of transmission over the internet is 100% secure.
      </p>

      <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
      <p className="mb-6">
        You have the right to access, update, or delete your personal information. To exercise these rights, please contact us at{' '}
        <a href="mailto:support@workshop.com" className="text-blue-500 underline">
          support@workshop.com
        </a>.
      </p>

      <h2 className="text-2xl font-semibold mb-2">6. Changes to This Policy</h2>
      <p className="mb-6">
        We may update this Privacy Policy from time to time. Any changes will be communicated via email or on our website.
      </p>

      <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at{' '}
        <a href="mailto:support@workshop.com" className="text-blue-500 underline">
          support@workshop.com
        </a>.
      </p>
    </div>
    </>
  );
};

export default PrivacyPolicy;
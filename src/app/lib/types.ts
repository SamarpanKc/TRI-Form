export type Workshop = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  institution: string;
  major: string;
  year_of_study: string;
  data_consent: boolean;
  registration_date: string;
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      test_workshop: {
        Row: Workshop;
        Insert: Omit<Workshop, 'id' | 'created_at'>;
        Update: Partial<Omit<Workshop, 'id' | 'created_at'>>;
      };
    };
  };
}

// app/lib/types.ts
export interface Registration {
  id: string;
  
  // Fields from your database
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  institution: string;
  major: string;
  year_of_study: string;
  registration_date: string;
  status: string;
  
  // Transformed fields for your component
  firstName: string;
  lastName: string;
  registrationDate: string;
  yearOfStudy: string;

}

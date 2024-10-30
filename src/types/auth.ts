export interface FormData {
    name: string;
    email: string;
    password: string;
    terms: boolean;
  }
  
  export interface ValidationErrors {
    name?: string;
    email?: string;
    password?: string;
    terms?: string;
  }
  
  export interface SignUpFormProps {
    onSubmit: (data: FormData) => Promise<void>;
    isLoading?: boolean;
    error?: string;
  }
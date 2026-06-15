export interface ForgotPasswordFormProps {
  email: string;
  setEmail: (val: string) => void;
  isLoading: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
}
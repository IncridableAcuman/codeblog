export interface OtpInputGroupProps {
  otp: string[];
  inputRefs: React.MutableRefObject<HTMLInputElement[]>;
  onChange: (element: HTMLInputElement, index: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
}
export interface ImageUploadProps {
  image: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
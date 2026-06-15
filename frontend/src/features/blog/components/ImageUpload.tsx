import React from 'react';
import { FiUpload } from 'react-icons/fi';

interface ImageUploadProps {
  image: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ image, onFileChange }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
      Muqova rasmi
    </label>
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-700 transition-all">
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
          <FiUpload className="w-8 h-8 mb-2 text-slate-400" />
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium truncate max-w-full">
            {image ? `Tanlangan rasm: ${image.name}` : "Rasm yuklash uchun bosing yoki sudrab keling"}
          </p>
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
      </label>
    </div>
  </div>
);
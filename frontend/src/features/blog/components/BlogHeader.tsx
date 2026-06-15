import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export const BlogHeader = () => (
  <div className="flex items-center justify-between">
    <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
      <FiArrowLeft /> Bosh sahifaga qaytish
    </Link>
  </div>
);
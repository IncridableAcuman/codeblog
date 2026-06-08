import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { 
  FiBold, FiItalic, FiCode, 
  FiList 
} from 'react-icons/fi';
import {LuHeading1,LuHeading2} from 'react-icons/lu'
import Placeholder from '@tiptap/extension-placeholder';

interface RichEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export const RichEditor: React.FC<RichEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Maqola matnini bu yerga yozing...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[250px] p-4 text-slate-900 dark:text-slate-100',
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 transition-colors">
      {/* Muharrir boshqaruv paneli (Toolbar) */}
      <div className="flex flex-wrap gap-1 p-2 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400' : ''}`}
        >
          <LuHeading1 size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400' : ''}`}
        >
          <LuHeading2 size={18} />
        </button>
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 self-center mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive('bold') ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400' : ''}`}
        >
          <FiBold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive('italic') ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400' : ''}`}
        >
          <FiItalic size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive('codeBlock') ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400' : ''}`}
        >
          <FiCode size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 ${editor.isActive('bulletList') ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400' : ''}`}
        >
          <FiList size={18} />
        </button>
      </div>

      {/* Haqiqiy matn yoziladigan maydon */}
      <EditorContent editor={editor} />
    </div>
  );
};
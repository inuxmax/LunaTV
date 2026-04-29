/* eslint-disable no-console */
'use client';
import { Check, Copy } from 'lucide-react';
import { useRef, useState } from 'react';

import { styles } from '@/app/admin/components/UIComponents';

interface CopyableInputProps {
  label?: string;
  value: string;
  onChange?: (val: string) => void;
  description?: string;
  readOnly?: boolean;
  placeholder?: string;
}

export default function CopyableInput({
  label,
  value,
  onChange,
  description,
  readOnly = true,
  placeholder = '',
}: CopyableInputProps) {
  const [đã sao chép, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = async () => {
    if (!inputRef.current) trả về;

    const textToCopy = giá trị;

    thử {
      // 1. Trước tiên hãy thử các API hiện đại
      if (navigator.clipboard && window.isSecureContext) {
        đang chờ navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        trở lại;
      }

      // 2. Thay thế: Tương thích với môi trường di động và không phải HTTPS
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Sao chép không thành công:', err);
      inputRef.current.select(); // Nếu thất bại, hãy chọn văn bản và để người dùng sao chép thủ công
    }
  };

  return (
    <div className='space-y-2'>
      {label && (
        <label className='block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 ml-1'>
          {label}
        </label>
      )}
      <div className='relative group'>
        <input
          ref={inputRef}
          type='text'
          value={value}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          onClick={() => readOnly && inputRef.current?.select()}
          className={`pr-12 ${styles.input} ${
            readOnly
              ? 'bg-gray-50/50 dark:bg-gray-800/50 cursor-default'
              : 'bg-white dark:bg-gray-800'
          }`}
        />
        <button
          type='button'
          onClick={copyToClipboard}
          className={`absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
            copied
              ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'
              : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title={copied ? 'Đã sao chép' : 'Sao chép vào khay nhớ tạm'}
        >
          {copied ? (
            <Check className='w-4.5 h-4.5 animate-in zoom-in duration-300' />
          ) : (
            <Copy className='w-4.5 h-4.5' />
          )}
        </button>
      </div>
      {description && (
        <p className='text-[11px] text-gray-400 dark:text-gray-500 italic px-1'>
          {description}
        </p>
      )}
    </div>
  );
}

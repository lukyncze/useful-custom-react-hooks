import {useState} from 'react';
import copy from 'copy-to-clipboard';
import {Maybe} from '../types';

interface Options {
  debug?: boolean;
  message?: string;
  format?: string;
  onCopy?: (clipboardData: object) => void;
}

interface CopyToClipboardHookResult {
  copyToClipboard: (text: string, options?: Options) => void;
  value: Maybe<string>;
  success: Maybe<boolean>;
}

export default function useCopyToClipboard(): CopyToClipboardHookResult {
  const [value, setValue] = useState<string>();
  const [success, setSuccess] = useState<boolean>();

  const copyToClipboard = (text: string, options?: Options) => {
    const result = copy(text, options);
    if (result) setValue(text);
    setSuccess(result);
  };

  return {copyToClipboard, value, success};
}


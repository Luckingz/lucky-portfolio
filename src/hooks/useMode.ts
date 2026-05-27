// src/hooks/useMode.ts
import { useState } from 'react';
import type { Mode } from '../types';

export function useMode() {
  const [mode, setMode] = useState<Mode>('frontend');
  return { mode, setMode };
}

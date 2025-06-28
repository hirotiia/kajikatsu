import { useEffect, useState } from 'react';

export function useMonthInputSupport(): boolean {
  const [supported, setSupported] = useState<boolean>(true);

  useEffect(() => {
    const testInput = document.createElement('input');
    testInput.setAttribute('type', 'month');
    setSupported(testInput.type === 'month');
  }, []);

  return supported;
}

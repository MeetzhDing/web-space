import { useRef } from 'react';

export function useRefWithCallback<T>(getInitValue: () => T) {
  const ref = useRef<T>(null);
  const hasInitRef = useRef(false);

  if (!hasInitRef.current) {
    ref.current = getInitValue();
    hasInitRef.current = true;
  }

  return ref;
}

'use client';

import { useState } from 'react';
import { ButtonComponent } from './ButtonComponent';

export function ErrorTrigger() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('This is a test critical error for checking ErrorBoundary!');
  }

  return (
    <ButtonComponent
      text="Error button"
      componentStyle=""
      handleClick={() => setShouldError(true)}
    />
  );
}

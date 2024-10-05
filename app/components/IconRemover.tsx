'use client'

import { useEffect } from 'react';

export default function IconRemover() {
  useEffect(() => {
    const removeElements = () => {
      const selectors = [
        '#__next-build-watcher',
        '.Toastify',
        '[data-testid="flowbite-tooltip"]',
        '[role="tooltip"]',
        '.fixed.bottom-0',
        '.fixed.right-0.bottom-0'
      ];
      const elements = document.querySelectorAll(selectors.join(', '));
      elements.forEach(el => el.remove());
    };

    removeElements();
    // Run the removal periodically in case the elements are re-added
    const interval = setInterval(removeElements, 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
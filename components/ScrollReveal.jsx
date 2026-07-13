import React, { useEffect, useRef, useState } from 'react';
import '../styles/scroll-reveal.css';

export const ScrollReveal = ({ children, delay = 0 }) => {
  const [hasRevealed, setHasRevealed] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    // Reference copy to ensure safe cleanup in unmount lifecycle
    const currentTarget = targetRef.current;

    // 1. Instantiating the native browser background observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          // 2. Unobserve immediately after revealing to save CPU/memory resources
          if (currentTarget) {
            observer.unobserve(currentTarget);
          }
        }
      },
      {
        root: null,          // Relies on the global browser viewport
        threshold: 0.1,      // Fires exactly when 10% of the element crosses into view
        rootMargin: '0px 0px -40px 0px' // Offset boundary so animation triggers naturally
      }
    );

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    // 3. Clean up the observer connections if user routes away
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={targetRef}
      className={`reveal-wrapper ${hasRevealed ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
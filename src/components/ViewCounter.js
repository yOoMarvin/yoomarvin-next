'use client';

import { useEffect, useState } from 'react';

export default function ViewCounter({ slug, className = '' }) {
  const [views, setViews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const incrementViewCount = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to increment view count');
        }
        
        const data = await response.json();
        setViews(data.count);
      } catch (error) {
        console.error('Error incrementing view count:', error);
      } finally {
        setLoading(false);
      }
    };

    incrementViewCount();
  }, [slug]);

  return (
    <span className={`text-sm text-onBackground-low ${className}`}>
      {loading ? 
        '-- views' : 
        `${views.toLocaleString()} view${views === 1 ? '' : 's'}`}
    </span>
  );
}

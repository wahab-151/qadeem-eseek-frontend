import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Hook to track the last visited page for logged-in customers
 * This allows redirecting users to their last page on next login
 */
export default function useTrackLastVisitedPage(isLoggedIn = false, userRole = null) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only track for logged-in customers (not admin/salesperson)
    if (!isLoggedIn || !pathname) return;
    
    const isCustomer = !userRole || 
                       (userRole.toLowerCase() !== 'admin' && 
                        userRole.toLowerCase() !== 'salesperson');
    
    if (!isCustomer) return;

    // Don't track auth pages or admin pages
    const isValidPage = !pathname.includes('/admin') && 
                        !pathname.includes('/login') && 
                        !pathname.includes('/register') &&
                        !pathname.includes('/signup') &&
                        !pathname.includes('/reset-password') &&
                        !pathname.includes('/change-password') &&
                        pathname !== '/';

    if (isValidPage) {
      const search = searchParams?.toString() || '';
      const fullPath = pathname + (search ? `?${search}` : '');
      
      try {
        // Debounce to avoid too many writes
        const timeoutId = setTimeout(() => {
          localStorage.setItem('last-visited-page', fullPath);
          console.log('[Track] Last visited page updated:', fullPath);
        }, 500);

        return () => clearTimeout(timeoutId);
      } catch (err) {
        console.warn('[Track] Failed to save last visited page:', err);
      }
    }
  }, [pathname, searchParams, isLoggedIn, userRole]);
}



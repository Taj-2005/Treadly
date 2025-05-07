import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function useNavigationGuard(shouldBlock, onTrigger) {
  const router = useRouter();
  const blockingRef = useRef(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (shouldBlock) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    const handleRouteChange = (url) => {
      if (shouldBlock && !blockingRef.current) {
        blockingRef.current = true;
        onTrigger(url);
        throw 'Navigation aborted.';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    router.events?.on('routeChangeStart', handleRouteChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      router.events?.off('routeChangeStart', handleRouteChange);
    };
  }, [shouldBlock, onTrigger]);
}

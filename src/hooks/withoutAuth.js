import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context';

export const WithoutAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { token } = useAuth();

    useEffect(() => {
      if (token) {
        router.replace(router.query.redirect || "/");
      }
    }, [token, router]);

    return !token ? <WrappedComponent {...props} /> : null;
  };
};


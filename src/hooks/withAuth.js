import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context';

export const WithAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { token } = useAuth();

    useEffect(() => {
      if (!token) {
        router.replace(`/login`);
      }
    }, [token, router]);

    return token ? <WrappedComponent {...props} /> : null;
  };
};

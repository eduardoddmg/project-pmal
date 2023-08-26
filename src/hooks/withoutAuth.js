import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context';
import { Loading } from '@/components';

export const WithoutAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { token, loading } = useAuth();

    useEffect(() => {
      if (token) {
        router.replace("/");
      }
    }, [token, router]);

    if (loading) return <Loading />
    return !token ? <WrappedComponent {...props} /> : null;
  };
};


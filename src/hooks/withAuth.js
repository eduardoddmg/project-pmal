import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context';
import { Loading } from '@/components';

export const WithAuth = (WrappedComponent, options) => {
  return (props) => {
    const router = useRouter();
    const { token, loading } = useAuth();


    useEffect(() => {
      
      if (!loading && !token) {
        router.replace(`/login`);
      }

    }, [token, router, loading]);

    if (loading) return <Loading />
    
    return token ? <WrappedComponent {...props} /> : null;
  };
};

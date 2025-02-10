// src/components/GlobalLoading.tsx
import React from 'react';
import Loading from './Loading';
import { useLoading } from '../utils/LoadingContext';

const GlobalLoading: React.FC = () => {
  const { isLoading } = useLoading();

  return <Loading open={isLoading} />;
};

export default GlobalLoading;
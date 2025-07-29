"use client"
import React, { Suspense } from 'react'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import AuthProvider from '@/app/AuthProvider';
import Loading from '@/app/loading.jsx';

const Provider = ({ children }) => {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
    <div>
      <Suspense fallback={<Loading/>}>
        <ConvexProvider client={convex}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ConvexProvider>
      </Suspense>
    </div>
  )
}

export default Provider

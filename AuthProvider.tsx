'use client'

import React from 'react'

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Add your authentication logic here
  return <>{children}</>
}

export default AuthProvider
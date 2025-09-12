import React from 'react'
import { Toaster } from 'react-hot-toast'

export const ToastProvider: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'var(--toast-bg)',
          color: 'var(--toast-color)',
          border: '1px solid var(--toast-border)',
          borderRadius: '0.75rem',
          padding: '1rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#ffffff',
          },
          style: {
            background: '#f0fdf4',
            color: '#166534',
            border: '1px solid #bbf7d0',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#ffffff',
          },
          style: {
            background: '#fef2f2',
            color: '#dc2626',
            border: '1px solid #fecaca',
          },
        },
        loading: {
          iconTheme: {
            primary: '#3b82f6',
            secondary: '#ffffff',
          },
          style: {
            background: '#eff6ff',
            color: '#1d4ed8',
            border: '1px solid #bfdbfe',
          },
        },
      }}
    />
  )
}

// Dark mode styles
export const ToastStyles: React.FC = () => {
  return (
    <style jsx global>{`
      :root {
        --toast-bg: #ffffff;
        --toast-color: #374151;
        --toast-border: #e5e7eb;
      }
      
      .dark {
        --toast-bg: #1f2937;
        --toast-color: #f9fafb;
        --toast-border: #374151;
      }
      
      .dark .go3958317564 {
        background: #1f2937 !important;
        color: #f9fafb !important;
        border: 1px solid #374151 !important;
      }
      
      .dark .go3958317564[data-type="success"] {
        background: #064e3b !important;
        color: #6ee7b7 !important;
        border: 1px solid #065f46 !important;
      }
      
      .dark .go3958317564[data-type="error"] {
        background: #7f1d1d !important;
        color: #fca5a5 !important;
        border: 1px solid #991b1b !important;
      }
      
      .dark .go3958317564[data-type="loading"] {
        background: #1e3a8a !important;
        color: #93c5fd !important;
        border: 1px solid #1e40af !important;
      }
    `}</style>
  )
}

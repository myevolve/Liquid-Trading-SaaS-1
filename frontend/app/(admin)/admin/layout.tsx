'use client'

import { useRequireAuth } from '@/lib/auth'
import { Loader2 } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading } = useRequireAuth('admin')

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="ml-auto flex items-center space-x-4">
            {/* Add admin navigation items here */}
          </div>
        </div>
      </nav>
      <main className="container mx-auto py-6">{children}</main>
    </div>
  )
}
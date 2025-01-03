'use client'

import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold">Liquid Trading</h1>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Button
                    variant="outline"
                    onClick={() => router.push('/admin')}
                  >
                    Admin Dashboard
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => router.push('/dashboard')}
                >
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => router.push('/login')}
                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push('/register')}
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Welcome to Liquid Trading
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Advanced crypto trading platform with powerful tools and real-time analytics
          </p>
          {!user && (
            <div className="flex justify-center space-x-4">
              <Button
                size="lg"
                onClick={() => router.push('/register')}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push('/login')}
              >
                Sign In
              </Button>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Liquid Trading. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

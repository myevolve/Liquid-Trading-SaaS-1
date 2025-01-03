'use client'

import { useAuth } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome Back{user?.email ? `, ${user.email}` : ''}</CardTitle>
          <CardDescription>
            Your trading dashboard is ready for customization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed p-8 text-center">
            <h3 className="mb-2 text-lg font-semibold">No Modules Installed</h3>
            <p className="text-sm text-muted-foreground">
              Modules will appear here once they are installed and configured.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Module placeholders */}
        <Card>
          <CardHeader>
            <CardTitle>Token Monitor</CardTitle>
            <CardDescription>Monitor new tokens across chains</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-sm text-muted-foreground">Module not installed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wallet Manager</CardTitle>
            <CardDescription>Manage your crypto wallets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-sm text-muted-foreground">Module not installed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trading View</CardTitle>
            <CardDescription>Advanced trading charts and analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-sm text-muted-foreground">Module not installed</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
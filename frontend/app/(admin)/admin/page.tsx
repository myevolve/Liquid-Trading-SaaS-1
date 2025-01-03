'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

interface User {
  id: number
  email: string
  role: string
  active: boolean
  approved: boolean
}

export default function AdminDashboard() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [autoApprove, setAutoApprove] = useState(false)

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8080/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }

      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (userId: number) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8080/api/admin/users/${userId}/approve`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to approve user')
      }

      await fetchUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve user')
    }
  }

  const handleToggleActive = async (userId: number, active: boolean) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8080/api/admin/users/${userId}/freeze`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ active }),
      })

      if (!response.ok) {
        throw new Error('Failed to update user status')
      }

      await fetchUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user status')
    }
  }

  const handleToggleAutoApprove = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8080/api/admin/settings/auto-approve', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ enabled: !autoApprove }),
      })

      if (!response.ok) {
        throw new Error('Failed to update auto-approve setting')
      }

      setAutoApprove(!autoApprove)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update auto-approve setting')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Button
              onClick={handleToggleAutoApprove}
              variant={autoApprove ? "default" : "outline"}
            >
              Auto-Approve New Users: {autoApprove ? "On" : "Off"}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3 text-sm">{user.email}</td>
                    <td className="px-4 py-3 text-sm">{user.role}</td>
                    <td className="px-4 py-3 text-sm">
                      {user.approved ? (
                        user.active ? (
                          <span className="text-green-600">Active</span>
                        ) : (
                          <span className="text-red-600">Frozen</span>
                        )
                      ) : (
                        <span className="text-yellow-600">Pending Approval</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        {!user.approved && (
                          <Button
                            size="sm"
                            onClick={() => handleApprove(user.id)}
                          >
                            Approve
                          </Button>
                        )}
                        {user.id !== currentUser?.id && (
                          <Button
                            size="sm"
                            variant={user.active ? "destructive" : "default"}
                            onClick={() => handleToggleActive(user.id, !user.active)}
                          >
                            {user.active ? "Freeze" : "Unfreeze"}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
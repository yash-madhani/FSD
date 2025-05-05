'use client';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase';


const AdminRequests = () => {
  const [requests, setRequests] = useState([])

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('attendancerequests')
      .select('*')
      .eq('is_approved', false)

    if (error) {
      toast.error('Failed to load requests')
    } else {
      setRequests(data)
    }
  }

  const approveRequest = async (requestId) => {
    const { error } = await supabase
      .from('attendancerequests')
      .update({ is_approved: true })
      .eq('request_id', requestId)

    if (error) {
      toast.error('Failed to approve request')
    } else {
      toast.success('Request approved!')
      fetchRequests()
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Attendance Requests</h1>
      <Separator />
      {requests.length === 0 ? (
        <p className="mt-4 text-muted-foreground">No pending requests.</p>
      ) : (
        <div className="grid gap-4 mt-4">
          {requests.map((req) => (
            <Card key={req.request_id}>
              <CardHeader>
                <CardTitle>{req.student_sap_id}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Reason:</strong> {req.reason}</p>
                <p className="text-sm text-muted-foreground">
                  <strong>Time:</strong> {req.time_range}
                </p>
                <Button
                  className="mt-4"
                  onClick={() => approveRequest(req.request_id)}
                >
                  Approve
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminRequests

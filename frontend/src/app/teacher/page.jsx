'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function TeacherDashboardPage() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  const sapId = '6000310006'; // Replace with real teacher ID from session
  // const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' }); // "Monday", "Tuesday", etc.
  const dayOfWeek = 'Wednesday'; // "Monday", "Tuesday", etc.

  useEffect(() => {
    const fetchLectures = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('lecture')
        .select('lecture_id, course_code, subject, start_time, end_time, room_no, group_code')
        .eq('teacher_sap_id', sapId)
        .eq('day_of_week', dayOfWeek);

      if (error) {
        console.error('Error fetching lectures:', error.message);
      } else {
        setLectures(data);
      }

      setLoading(false);
    };

    fetchLectures();
  }, [sapId, dayOfWeek]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lectures for {dayOfWeek}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-[120px] w-full rounded-xl" />
          ))
        ) : lectures.length === 0 ? (
          <p className="text-muted-foreground">No lectures scheduled for today.</p>
        ) : (
          lectures.map((lecture) => (
            <Card key={lecture.lecture_id}>
              <CardHeader>
                <CardTitle>{lecture.subject}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p><strong>Start:</strong> {lecture.start_time}</p>
                <p><strong>End:</strong> {lecture.end_time}</p>
                <p><strong>Room:</strong> {lecture.room_no}</p>
                <p><strong>Group:</strong> {lecture.group_code}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

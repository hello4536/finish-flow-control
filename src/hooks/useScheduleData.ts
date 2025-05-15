
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ScheduleEvent } from '@/types/schedule';
import { useToast } from '@/components/ui/use-toast';
import { format, parseISO } from 'date-fns';

export const useScheduleData = (selectedDate?: Date) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch events based on selected date or all events if no date is selected
  const fetchEvents = async (): Promise<ScheduleEvent[]> => {
    let query = supabase
      .from('schedule_events')
      .select('*')
      .order('date', { ascending: true });
    
    if (selectedDate) {
      // Format the date to match the format in the database
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      query = query.eq('date', formattedDate);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching schedule events:', error);
      throw new Error(error.message);
    }
    
    // Cast the data to ensure type safety
    return (data || []).map(event => ({
      ...event,
      type: event.type as 'job' | 'meeting' | 'delivery',
      status: event.status as 'scheduled' | 'completed' | 'cancelled'
    }));
  };
  
  // Query to fetch events
  const { 
    data: events = [], 
    isLoading,
    error,
    refetch 
  } = useQuery({
    queryKey: ['scheduleEvents', selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'all'],
    queryFn: fetchEvents,
  });
  
  // Add a new event
  const addEvent = useMutation({
    mutationFn: async (event: Omit<ScheduleEvent, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('schedule_events')
        .insert(event)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Event Added',
        description: 'The event has been successfully added to your schedule.',
      });
      queryClient.invalidateQueries({ queryKey: ['scheduleEvents'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to add event: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Update an event
  const updateEvent = useMutation({
    mutationFn: async (event: Partial<ScheduleEvent> & { id: string }) => {
      const { data, error } = await supabase
        .from('schedule_events')
        .update(event)
        .eq('id', event.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Event Updated',
        description: 'The event has been successfully updated.',
      });
      queryClient.invalidateQueries({ queryKey: ['scheduleEvents'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to update event: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Delete an event
  const deleteEvent = useMutation({
    mutationFn: async (eventId: string) => {
      const { error } = await supabase
        .from('schedule_events')
        .delete()
        .eq('id', eventId);
      
      if (error) throw error;
      return eventId;
    },
    onSuccess: () => {
      toast({
        title: 'Event Deleted',
        description: 'The event has been successfully removed from your schedule.',
      });
      queryClient.invalidateQueries({ queryKey: ['scheduleEvents'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to delete event: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Function to get events for a specific date
  const getEventsForDate = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return events.filter(event => event.date === formattedDate);
  };

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('schedule_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'schedule_events' },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return {
    events,
    isLoading,
    error,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
  };
};

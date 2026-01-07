// Google Calendar API integration
// Uses the access token from Supabase Google OAuth

const CALENDAR_API_BASE = 'https://www.googleapis.com/calendar/v3';

interface CalendarEvent {
    summary: string;
    description?: string;
    start: {
        dateTime: string;
        timeZone: string;
    };
    end: {
        dateTime: string;
        timeZone: string;
    };
    colorId?: string;
}

// Create a calendar event using the user's Google access token
export const createCalendarEvent = async (
    accessToken: string,
    event: {
        title: string;
        description?: string;
        date: Date;
        durationMinutes?: number;
    }
) => {
    const startTime = event.date.toISOString();
    const endTime = new Date(event.date.getTime() + (event.durationMinutes || 60) * 60000).toISOString();

    const calendarEvent: CalendarEvent = {
        summary: event.title,
        description: event.description || 'Added from NurtureNet Pregnancy App',
        start: {
            dateTime: startTime,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
            dateTime: endTime,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        colorId: '4', // Pink/Rose color for pregnancy events
    };

    try {
        const response = await fetch(`${CALENDAR_API_BASE}/calendars/primary/events`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(calendarEvent),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Failed to create calendar event');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating calendar event:', error);
        throw error;
    }
};

// Sync multiple events to Google Calendar
export const syncEventsToCalendar = async (
    accessToken: string,
    events: Array<{
        id: string;
        title: string;
        date: Date;
        time: string;
        type: string;
    }>
) => {
    const results = [];

    for (const event of events) {
        try {
            // Parse time string (e.g., "10:00 AM") and combine with date
            const [time, period] = event.time.split(' ');
            const [hours, minutes] = time.split(':').map(Number);
            let hour24 = hours;
            if (period === 'PM' && hours !== 12) hour24 += 12;
            if (period === 'AM' && hours === 12) hour24 = 0;

            const eventDate = new Date(event.date);
            eventDate.setHours(hour24, minutes, 0, 0);

            const result = await createCalendarEvent(accessToken, {
                title: event.title,
                description: `Type: ${event.type} - Synced from NurtureNet`,
                date: eventDate,
                durationMinutes: 60,
            });

            results.push({ id: event.id, success: true, calendarEventId: result.id });
        } catch (error) {
            results.push({ id: event.id, success: false, error });
        }
    }

    return results;
};

// List upcoming events from Google Calendar
export const listUpcomingEvents = async (accessToken: string, maxResults: number = 10) => {
    try {
        const now = new Date().toISOString();
        const response = await fetch(
            `${CALENDAR_API_BASE}/calendars/primary/events?maxResults=${maxResults}&timeMin=${now}&orderBy=startTime&singleEvents=true`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch calendar events');
        }

        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('Error fetching calendar events:', error);
        throw error;
    }
};

// Get events for a specific month
export const getEventsForMonth = async (
    accessToken: string,
    year: number,
    month: number // 0-indexed
) => {
    try {
        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59);

        const response = await fetch(
            `${CALENDAR_API_BASE}/calendars/primary/events?timeMin=${startOfMonth.toISOString()}&timeMax=${endOfMonth.toISOString()}&orderBy=startTime&singleEvents=true&maxResults=100`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch calendar events');
        }

        const data = await response.json();
        return (data.items || []).map((item: any) => ({
            id: item.id,
            title: item.summary || 'Untitled Event',
            description: item.description || '',
            date: new Date(item.start?.dateTime || item.start?.date),
            endDate: new Date(item.end?.dateTime || item.end?.date),
            isFromGoogle: true,
        }));
    } catch (error) {
        console.error('Error fetching events for month:', error);
        throw error;
    }
};

// Delete a calendar event
export const deleteCalendarEvent = async (accessToken: string, eventId: string) => {
    try {
        const response = await fetch(
            `${CALENDAR_API_BASE}/calendars/primary/events/${eventId}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );

        if (!response.ok && response.status !== 204) {
            throw new Error('Failed to delete calendar event');
        }

        return { success: true };
    } catch (error) {
        console.error('Error deleting calendar event:', error);
        throw error;
    }
};

// Update a calendar event
export const updateCalendarEvent = async (
    accessToken: string,
    eventId: string,
    updates: {
        title?: string;
        description?: string;
        date?: Date;
        durationMinutes?: number;
    }
) => {
    try {
        // First get the existing event
        const getResponse = await fetch(
            `${CALENDAR_API_BASE}/calendars/primary/events/${eventId}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );

        if (!getResponse.ok) {
            throw new Error('Failed to fetch event for update');
        }

        const existingEvent = await getResponse.json();

        // Merge updates
        const updatedEvent: any = { ...existingEvent };
        if (updates.title) updatedEvent.summary = updates.title;
        if (updates.description) updatedEvent.description = updates.description;
        if (updates.date) {
            const startTime = updates.date.toISOString();
            const endTime = new Date(updates.date.getTime() + (updates.durationMinutes || 60) * 60000).toISOString();
            updatedEvent.start = {
                dateTime: startTime,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            };
            updatedEvent.end = {
                dateTime: endTime,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            };
        }

        // Update the event
        const response = await fetch(
            `${CALENDAR_API_BASE}/calendars/primary/events/${eventId}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEvent),
            }
        );

        if (!response.ok) {
            throw new Error('Failed to update calendar event');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating calendar event:', error);
        throw error;
    }
};

// Create event and return with local ID mapping
export const createAndMapEvent = async (
    accessToken: string,
    localEvent: {
        localId: string;
        title: string;
        description?: string;
        date: Date;
        time: string;
        type: string;
        durationMinutes?: number;
    }
) => {
    try {
        // Parse time string
        const [time, period] = localEvent.time.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        let hour24 = hours;
        if (period === 'PM' && hours !== 12) hour24 += 12;
        if (period === 'AM' && hours === 12) hour24 = 0;

        const eventDate = new Date(localEvent.date);
        eventDate.setHours(hour24, minutes, 0, 0);

        const result = await createCalendarEvent(accessToken, {
            title: localEvent.title,
            description: `Type: ${localEvent.type} - Synced from NurtureNet\n${localEvent.description || ''}`,
            date: eventDate,
            durationMinutes: localEvent.durationMinutes || 60,
        });

        return {
            localId: localEvent.localId,
            googleEventId: result.id,
            success: true,
        };
    } catch (error) {
        return {
            localId: localEvent.localId,
            googleEventId: null,
            success: false,
            error,
        };
    }
};

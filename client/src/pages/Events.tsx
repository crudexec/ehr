import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { eventService } from '@/services/event.service';
import { Event, EventStatus } from '@/types';
import { formatDateTime, formatStatus } from '@/utils/format';
import { Calendar, MapPin, Plus } from 'lucide-react';

export const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const myEvents = await eventService.getMyEvents();
      setEvents(myEvents);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: EventStatus) => {
    const colors = {
      [EventStatus.SCHEDULED]: 'bg-blue-100 text-blue-700',
      [EventStatus.COMPLETED]: 'bg-green-100 text-green-700',
      [EventStatus.CANCELLED]: 'bg-red-100 text-red-700',
      [EventStatus.RESCHEDULED]: 'bg-yellow-100 text-yellow-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const handleCancelEvent = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel this event?')) {
      try {
        await eventService.cancelEvent(id);
        loadEvents();
      } catch (error) {
        console.error('Failed to cancel event:', error);
      }
    }
  };

  const handleCompleteEvent = async (id: string) => {
    try {
      await eventService.completeEvent(id);
      loadEvents();
    } catch (error) {
      console.error('Failed to complete event:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600 mt-2">Manage appointments and scheduled events</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2">
            <Card>
              <CardContent>
                <p className="text-gray-500 text-center py-8">Loading events...</p>
              </CardContent>
            </Card>
          </div>
        ) : events.length === 0 ? (
          <div className="col-span-2">
            <Card>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No events found</p>
                  <Button className="mt-4">Create your first event</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{event.title}</CardTitle>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      event.status
                    )}`}
                  >
                    {formatStatus(event.status)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {event.description && (
                    <p className="text-gray-600">{event.description}</p>
                  )}

                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDateTime(event.eventDate)}
                  </div>

                  {event.location && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                  )}

                  {event.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{event.notes}</p>
                    </div>
                  )}

                  <div className="flex space-x-2 pt-4 border-t">
                    <Button size="sm" variant="ghost">
                      Edit
                    </Button>
                    {event.status === EventStatus.SCHEDULED && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCompleteEvent(event.id)}
                        >
                          Complete
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleCancelEvent(event.id)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { intakeFormService } from '@/services/intakeForm.service';
import { IntakeForm, FormStatus } from '@/types';
import { formatDate, formatStatus } from '@/utils/format';
import { FileText, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const IntakeForms: React.FC = () => {
  const { user } = useAuth();
  const [forms, setForms] = useState<IntakeForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadForms();
    }
  }, [user]);

  const loadForms = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await intakeFormService.getIntakeForms(user.id, 1, 50);
      setForms(response.data);
    } catch (error) {
      console.error('Failed to load intake forms:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: FormStatus) => {
    const colors = {
      [FormStatus.DRAFT]: 'bg-gray-100 text-gray-700',
      [FormStatus.SUBMITTED]: 'bg-blue-100 text-blue-700',
      [FormStatus.APPROVED]: 'bg-green-100 text-green-700',
      [FormStatus.REJECTED]: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      try {
        await intakeFormService.deleteIntakeForm(id);
        loadForms();
      } catch (error) {
        console.error('Failed to delete form:', error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Intake Forms</h1>
          <p className="text-gray-600 mt-2">Patient intake and onboarding forms</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Intake Form
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Intake Forms ({forms.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading forms...</p>
          ) : forms.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No intake forms found</p>
              <Button className="mt-4">Create your first form</Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Primary Diagnosis</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forms.map((form) => (
                  <TableRow key={form.id}>
                    <TableCell>
                      <div className="font-medium">{form.clientName}</div>
                    </TableCell>
                    <TableCell>{formatDate(form.clientDob)}</TableCell>
                    <TableCell>
                      <div>
                        {form.clientPhone && (
                          <div className="text-sm">{form.clientPhone}</div>
                        )}
                        {form.emergencyContactName && (
                          <div className="text-xs text-gray-500">
                            Emergency: {form.emergencyContactName}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {form.primaryDiagnosis || 'Not specified'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          form.status
                        )}`}
                      >
                        {formatStatus(form.status)}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(form.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          View
                        </Button>
                        {form.status === FormStatus.DRAFT && (
                          <>
                            <Button size="sm" variant="ghost">
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleDelete(form.id)}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

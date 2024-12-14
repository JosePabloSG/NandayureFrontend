'use client';

import { useState } from 'react';
import RequestCard from './request-card';
import RequestModal from './request-modal';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import { RequestDetails } from '@/types/request-management/commonTypes';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { InboxIcon } from 'lucide-react';
import NoRequest from './no-request';
import { useGetRequestHistory } from '@/new-hooks';
import { useGetEmployeeId } from '@/hooks';

export default function RequestCardManagement() {
  const [selectedRequest, setSelectedRequest] = useState<RequestDetails | null>(
    null,
  );
  const { employeeId } = useGetEmployeeId()
  const { requests, isLoading } = useGetRequestHistory(employeeId?.toString() || '');

  const handleRequestClick = (request: RequestDetails) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  if (!requests || requests.length === 0) {
    return <NoRequest />;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Mis solicitudes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RequestCard
          requests={requests || []}
          onClick={handleRequestClick}
          isLoading={isLoading}
        />
      </div>
      <RequestModal
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={handleCloseModal}
      />
    </div>
  );
}

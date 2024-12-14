import { RequestSalaryCertificate } from '@/new-types';
import httpClient from '@/helpers/httpClient';

export async function postSalaryCertificate(data: Partial<RequestSalaryCertificate>) {
  return httpClient<RequestSalaryCertificate>({
    method: 'POST',
    endpoint: '/request-salary-certificates',
    data,
  });
}

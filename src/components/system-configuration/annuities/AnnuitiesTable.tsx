// src/components/AnnuitiesTable.tsx

import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAllAnnuities } from '@/hooks';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import EditAnnuityModal from './EditAnnuityModal';
import DeleteAnnuityModal from './DeleteAnnuityModal';

export default function AnnuitiesTable() {
  const { annuities, isLoading, isError } = useGetAllAnnuities();

  if (isLoading) {
    return <SkeletonLoader className="h-4 w-full" />;
  }

  if (isError) {
    return <div data-cy="error-loading">Error cargando datos de anualidades.</div>;
  }

  return (
    <Table data-cy="annuities-table">
      <TableHeader>
        <TableRow>
          <TableHead data-cy="table-head-id">ID</TableHead>
          <TableHead data-cy="table-head-date">Fecha</TableHead>
          <TableHead data-cy="table-head-description">Descripción</TableHead>
          <TableHead data-cy="table-head-amount">Monto</TableHead>
          <TableHead data-cy="table-head-employee">Empleado</TableHead>
          <TableHead data-cy="table-head-actions">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {annuities?.map((annuity) => (
          <TableRow key={annuity.id} data-cy={`table-row-${annuity.id}`}>
            <TableCell data-cy={`table-cell-id-${annuity.id}`}>{annuity.id}</TableCell>
            <TableCell data-cy={`table-cell-date-${annuity.id}`}>
              {new Date(annuity.Date).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </TableCell>
            <TableCell data-cy={`table-cell-description-${annuity.id}`}>{annuity.Description}</TableCell>
            <TableCell data-cy={`table-cell-amount-${annuity.id}`}>
              {Number(annuity.Amount || 0).toFixed(2)}
            </TableCell>

            <TableCell data-cy={`table-cell-employee-${annuity.id}`}>
              {annuity.employee 
                ? `${annuity.employee.Name} ${annuity.employee.Surname1} ${annuity.employee.Surname2}` 
                : 'Empleado desconocido'}
            </TableCell>
            <TableCell data-cy={`table-cell-actions-${annuity.id}`}>
              <div className="flex">
                <EditAnnuityModal annuity={annuity} annuityId={annuity.id} />
                <DeleteAnnuityModal id={annuity.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

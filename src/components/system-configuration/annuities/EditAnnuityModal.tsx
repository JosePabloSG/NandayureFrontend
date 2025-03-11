import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { usePatchAnnuity, useGetEmployees } from '@/hooks';
import { Annuity } from '@/types';

interface Props {
  annuity: Annuity;
  annuityId: number;
}

export default function EditAnnuityModal({ annuity, annuityId }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit } = usePatchAnnuity({
    setIsOpen: setIsEditModalOpen,
    annuityId,
  });

  const { employees, isLoading } = useGetEmployees();

  return (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        className="mr-2"
        data-cy={`edit-button-${annuityId}`}
      >
        <Pencil 
          onClick={() => setIsEditModalOpen(true)} 
          className="h-4 w-4"
        />
      </Button>
      <Dialog 
        open={isEditModalOpen} 
        onOpenChange={setIsEditModalOpen}
        data-cy={`edit-modal-${annuityId}`}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle data-cy="edit-modal-title">Editar Anualidad</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} data-cy="edit-form">
            <div className="grid gap-4 py-4">
              <div>
                <label htmlFor="Date" className="block text-sm font-medium">Fecha</label>
                <input
                  id="Date"
                  type="date"
                  defaultValue={new Date(annuity.Date).toISOString().split('T')[0]}
                  {...register('Date')}
                  className="w-full px-3 py-2 border rounded"
                  data-cy="edit-date"
                />
                {errors.Date && <p className="text-red-500 text-xs mt-2" data-cy="edit-date-error">{errors.Date.message}</p>}
              </div>
              <div>
                <label htmlFor="Description" className="block text-sm font-medium">Descripción</label>
                <input
                  id="Description"
                  type="text"
                  defaultValue={annuity.Description}
                  {...register('Description')}
                  className="w-full px-3 py-2 border rounded"
                  data-cy="edit-description"
                />
                {errors.Description && <p className="text-red-500 text-xs mt-2" data-cy="edit-description-error">{errors.Description.message}</p>}
              </div>
              <div>
                <label htmlFor="Amount" className="block text-sm font-medium">Monto</label>
                <input
                  id="Amount"
                  type="number"
                  defaultValue={Number(annuity.Amount || 0).toFixed(2)} 
                  {...register('Amount', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border rounded"
                  data-cy="edit-amount"
                />
                {errors.Amount && <p className="text-red-500 text-xs mt-2" data-cy="edit-amount-error">{errors.Amount.message}</p>}
              </div>
              <div>
                <label htmlFor="EmployeeId" className="block text-sm font-medium">Empleado</label>
                <select
                  id="EmployeeId"
                  defaultValue={annuity.EmployeeId}
                  {...register("EmployeeId")}
                  className="w-full px-3 py-2 border rounded"
                  data-cy="edit-employee"
                >
                  <option value="">Selecciona un empleado</option>
                  {!isLoading && employees?.map((employee) => (
                    employee && (
                      <option key={employee.id} value={employee.id}>
                        {employee.Name} {employee.Surname1} {employee.Surname2}
                      </option>
                    )
                  ))}
                </select>
                {errors.EmployeeId && (
                  <p className="text-red-500 text-xs mt-2" data-cy="edit-employee-error">{errors.EmployeeId.message}</p>
                )}
              </div>
              {errors.root && (
                <p className="text-red-500 text-xs mt-2" data-cy="edit-root-error">{errors.root.message}</p>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" data-cy="edit-submit">Guardar cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

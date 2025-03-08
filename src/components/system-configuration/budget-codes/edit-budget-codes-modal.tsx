import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePatchBudgetCode } from '@/hooks';
import { BudgetCode } from '@/types';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

interface Props {
  budgetCode: BudgetCode;
}

export default function EditBudgetCodeMoadol({ budgetCode }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit, mutation } =
    usePatchBudgetCode({
      setIsOpen: setIsEditModalOpen,
      budgetCodeId: budgetCode.id,
    });

  return (
    <>
   <Button variant="outline" size="icon" className="mr-2" onClick={() => setIsEditModalOpen(true)}>
   <Pencil className="h-4 w-4" data-cy={`edit-budget-${budgetCode.id}`}/>
  </Button>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen} >
        <DialogContent data-cy="edit-budget-modal">
          <DialogHeader>
            <DialogTitle>Editar Programa Departamental</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} data-cy="edit-budget-form">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Codigo Salario</Label>
                <Input
                  id="CodSalary"
                  defaultValue={budgetCode.CodSalary}
                  {...register('CodSalary')}
                  data-cy="edit-input-cod-salary"
                />
                {errors.CodSalary && (
                  <p className="text-red-500 text-xs" 
                  data-cy="error-edit-cod-salary">
                    {errors.CodSalary.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Codigo Extra</Label>
                <Input
                  id="CodExtra"
                  defaultValue={budgetCode.CodExtra}
                  {...register('CodExtra')}
                  data-cy="edit-input-cod-extra"
                />
                {errors.CodExtra && (
                  <p className="text-red-500 text-xs"
                  data-cy="error-edit-cod-extra">
                    {errors.CodExtra.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Codigo Anualidad</Label>
                <Input
                  id="CodAnuity"
                  defaultValue={budgetCode.CodAnuity}
                  {...register('CodAnuity')}
                  data-cy="edit-input-cod-anuity"
                />
                {errors.CodAnuity && (
                  <p className="text-red-500 text-xs"
                  data-cy="error-edit-cod-anuity">
                    {errors.CodAnuity.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Codigo Salario Plus</Label>
                <Input
                  id="CodSalaryPlus"
                  defaultValue={budgetCode.CodSalaryPlus}
                  {...register('CodSalaryPlus')}
                  data-cy="edit-input-cod-salary-plus"
                />
                {errors.CodSalaryPlus && (
                  <p className="text-red-500 text-xs"
                  data-cy="error-edit-cod-salary-plus">
                    {errors.CodSalaryPlus.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" data-cy="submit-edit-budget">Guardar cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

import { usePostBudgetCode } from '@/hooks';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function AddBudgetCodesModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isAddModalOpen,
    setIsAddModalOpen,
    errors,
  } = usePostBudgetCode();

  return (
    <>
      <Button onClick={handleAddNew} data-cy="open-add-budget">
    <Plus className="mr-2 h-4 w-4" /> Agregar código de presupuesto
</Button>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen} data-cy="add-budget-modal">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Codigo Presupuestario</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} data-cy="add-budget-form">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Codigo Salario</Label>
                <Input id="CodSalary" {...register('CodSalary')} data-cy="input-cod-salary"/>
                {errors.CodSalary && (
                  <p className="text-red-500 text-xs" data-cy="error-cod-salary">
                    {errors.CodSalary.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Codigo Extra</Label>
                <Input id="CodExtra" {...register('CodExtra')} data-cy="input-cod-extra"/>
                {errors.CodExtra && (
                  <p className="text-red-500 text-xs" data-cy="error-cod-extra">
                    {errors.CodExtra.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Codigo Anuidad</Label>
                <Input id="CodAnuity" {...register('CodAnuity')} data-cy="input-cod-anuity" />
                {errors.CodAnuity && (
                  <p className="text-red-500 text-xs" data-cy="error-cod-anuity">
                    {errors.CodAnuity.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Codigo Salario Plus</Label>
                <Input id="CodSalaryPlus" {...register('CodSalaryPlus')} data-cy="input-cod-salary-plus"/>
                {errors.CodSalaryPlus && (
                  <p className="text-red-500 text-xs"  data-cy="error-cod-salary-plus">
                    {errors.CodSalaryPlus.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" data-cy="submit-add-budget">Agregar codigo presupuestario</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

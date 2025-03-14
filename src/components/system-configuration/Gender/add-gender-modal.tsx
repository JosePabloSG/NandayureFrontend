'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import InputField from '@/components/ui/input-field';
import { usePostGender } from '@/hooks';
import { Plus } from 'lucide-react';

export default function AddGenderModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isAddModalOpen,
    setIsAddModalOpen,
    errors,
  } = usePostGender();

  return (
    <>
      <Button onClick={handleAddNew} data-cy="btn-add-gender" className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Agregar Género
      </Button>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Género</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <InputField
                id="Name"
                label="Nombre"
                type="text"
                register={register}
                errors={errors}
                 dataCy='input-add-name-gender'
                errorDataCy='error-name-gender'
              />
              {errors.root && (
                <p className="text-red-500 text-xs mt-2"  data-cy="error-add-root-gender">
                  {' '}
                  {errors.root.message}{' '}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button type="submit"  data-cy="btn-submit-add-gender" >Agregar Género</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
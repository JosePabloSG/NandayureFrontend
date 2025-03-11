import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteAnnuity } from '@/hooks';
import { Trash2 } from 'lucide-react';

interface Props {
  id: number;
}

export default function DeleteAnnuityModal({ id }: Props) {
  const {
    handleDelete,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    confirmDelete,
  } = useDeleteAnnuity({ annuityId: id });

  return (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={handleDelete} 
        data-cy={`delete-button-${id}`}
      > 
        <Trash2 className="h-4 w-4" />
      </Button>
      <Dialog 
        open={isDeleteModalOpen} 
        onOpenChange={setIsDeleteModalOpen} 
        data-cy={`delete-modal-${id}`}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle data-cy="delete-modal-title">Confirmar Eliminación</DialogTitle>
            <DialogDescription data-cy="delete-modal-description">
              ¿Estás seguro de que quieres eliminar esta anualidad? Esta acción
              no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              data-cy="delete-cancel-button"
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete} 
              data-cy="delete-confirm-button"
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

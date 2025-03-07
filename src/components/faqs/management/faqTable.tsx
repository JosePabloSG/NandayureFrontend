'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, Eye, Pencil, PlusIcon, RefreshCw, Trash2Icon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useGetFaqs from "@/hooks/faq/queries/useGetFaqs";
import useGetFaqCategories from "@/hooks/faq-categories/queries/useGetFaqCategories";
import { CreateFaq } from "./createFaq";
import UpdateFaq from "./updateFaq";
import DeleteFaq from "./deleteFaq";
import FaqStatusBadge from "./FaqStatusBadge";
import FaqPreview from "./faqPreview";
import { useEffect, useState } from "react";
import { useSearchFilter } from "@/hooks/use-search-filter";
import { SearchBar } from "@/components/ui/search-bar";
import { PaginationController } from "@/components/ui/pagination-controller";

export default function FaqTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const { faqs = [], isLoading: isLoadingFaqs, isError: isErrorFaqs, error: faqError, refetch: refetchFaqs } = useGetFaqs();
  const { faqCategories = [], isLoading: isLoadingCategories } = useGetFaqCategories();
  const { filteredData: filteredFaqs, setSearchValue } = useSearchFilter({
    data: faqs,
    searchFields: ["id", "question", "answer"],
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [])

  const itemsPerPage = 5
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentFaqCategories = filteredFaqs.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  const getCategoryName = (categoryId: number) => {
    const category = faqCategories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Categoría no encontrada';
  };

  const isLoading = isLoadingFaqs || isLoadingCategories;



  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-48" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Skeleton className="h-6 w-24" /></TableHead>
              <TableHead><Skeleton className="h-6 w-24" /></TableHead>
              <TableHead><Skeleton className="h-6 w-20" /></TableHead>
              <TableHead><Skeleton className="h-6 w-20" /></TableHead>
              <TableHead><Skeleton className="h-6 w-20" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (isErrorFaqs) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error al cargar FAQs</AlertTitle>
        <AlertDescription>
          <div className="flex flex-col space-y-2">
            <p>{faqError instanceof Error ? faqError.message : 'Ha ocurrido un error al cargar las FAQs'}</p>
            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchFaqs()}
                className="mt-2"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reintentar
              </Button>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between gap-4">
        <CreateFaq>
          <Button>
            <PlusIcon size={16} className="mr-2" />
            Crear FAQ
          </Button>
        </CreateFaq>
        <SearchBar onSearch={handleSearch} placeholder="Buscar preguntas frecuentes..." className="max-w-md" />
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">Pregunta</TableHead>
            <TableHead className="w-[40%]">Respuesta</TableHead>
            <TableHead className="w-[10%]">Categoría</TableHead>
            <TableHead className="w-[10%]">Estado</TableHead>
            <TableHead className="w-[10%]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faqs?.length > 0 ? faqs?.map((faq) => (
            <TableRow key={faq.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{faq.question}</TableCell>
              <TableCell className="truncate max-w-xs">{faq.answer}</TableCell>
              <TableCell>{getCategoryName(faq.faqCategoryId)}</TableCell>
              <TableCell>
                <FaqStatusBadge faq={faq} />
              </TableCell>
              <TableCell className="flex space-x-2 justify-end">
                <FaqPreview faq={faq} categoryName={getCategoryName(faq.faqCategoryId)}>
                  <Button size={'icon'} variant={'outline'}>
                    <Eye size={16} />
                  </Button>
                </FaqPreview>
                <UpdateFaq faq={faq} >
                  <Button size={'icon'} variant={'outline'}>
                    <Pencil size={16} />
                  </Button>
                </UpdateFaq>
                <DeleteFaq faq={faq}>
                  <Button size={'icon'} variant={'outline'}>
                    <Trash2Icon size={16} />
                  </Button>
                </DeleteFaq>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">No hay FAQs disponibles</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!isLoading && filteredFaqs.length > 0 && (
        <PaginationController
          totalItems={filteredFaqs.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          siblingCount={1}
          className="mt-4"
        />
      )}
    </div>
  );
}
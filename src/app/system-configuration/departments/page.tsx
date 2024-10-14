import DepartmentsTable from '@/components/system-configuration/departaments/departaments-table';

export default function DepartmentsPage() {
  return (
    <div>
      <div className="container mx-auto py-10">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold mb-4">Configuración de departamentos</h1>
          <div className="flex space-x-4 justify-center items-center"></div>
        </div>
        <DepartmentsTable />
      </div>
    </div>
  );
}

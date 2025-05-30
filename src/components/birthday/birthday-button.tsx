import { resetBirthdayCounter } from "@/utils/birthday";
import { useSession } from "next-auth/react";

export function ResetBirthdayButton() {
  const { data: session } = useSession();
  
  const handleReset = () => {
    const userId = session?.user?.employeeId;
    if (!userId) return;
    
    resetBirthdayCounter(userId);
  };
  
  return (
    <button 
      onClick={handleReset}
      className="mt-4 px-3 py-1 text-sm border rounded hover:bg-gray-100 transition-colors"
    >
      Resetear Efecto de Cumpleaños
    </button>
  );
}


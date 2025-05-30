"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { format, isSameDay, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Flag from "@/components/common/Flag"
import Spinner from "@/components/ui/spinner"
import { titleFont } from "@/lib/fonts"
import { usePostVacation } from "@/hooks"
import useGetHolidays from "@/hooks/holiday/queries/useGetHolidays"

export default function RequestVacationForm() {
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const { holidays, isError, isLoading, error } = useGetHolidays()
  const [disabledDates, setDisabledDates] = useState<Date[]>([])

  // Process holidays to determine which dates to disable
  useEffect(() => {
    if (holidays && holidays.length > 0) {
      const currentYear = new Date().getFullYear()
      const nextYear = currentYear + 1
      const holidayDates: Date[] = []

      // Process each active holiday
      holidays.forEach((holiday) => {
        // Solo procesar días festivos activos
        if (holiday.isActive) {
          if (holiday.isRecurringYearly && holiday.recurringMonth && holiday.recurringDay) {
            // For recurring holidays, add for current and next year
            holidayDates.push(new Date(currentYear, holiday.recurringMonth - 1, holiday.recurringDay))
            holidayDates.push(new Date(nextYear, holiday.recurringMonth - 1, holiday.recurringDay))
          } else if (holiday.specificDate) {
            // For specific date holidays - FIX: Use parseISO to correctly handle timezone issues
            // Añadir 'T12:00:00' asegura que la fecha se interprete al mediodía, evitando problemas de zona horaria
            holidayDates.push(parseISO(`${holiday.specificDate}T12:00:00`))
          }
        }
      })

      setDisabledDates(holidayDates)
    }
  }, [holidays])

  // Function to check if a date is a holiday
  const isHoliday = (date: Date) => {
    return disabledDates.some((holidayDate) => isSameDay(date, holidayDate))
  }

  // Function to calculate business days (excluding weekends and holidays)
  const calculateBusinessDays = (startDate: Date, endDate: Date): number => {
    let count = 0
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay()
      // Skip weekends and holidays
      if (dayOfWeek !== 0 && dayOfWeek !== 6 && !isHoliday(currentDate)) {
        count++
      }
      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return count
  }

  // Calculate total business days when date range changes
  const totalDays = date?.from && date?.to ? calculateBusinessDays(date.from, date.to) : 0

  const { onSubmit: submitVacationRequest, setValue, mutation, errors } = usePostVacation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (date?.from && date?.to) {
      setValue("departureDate", format(date.from, "yyyy-MM-dd")) // Fecha de salida es la fecha inicial
      setValue("entryDate", format(date.to, "yyyy-MM-dd")) // Fecha de entrada es la fecha final
      submitVacationRequest()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <h5 className={`${titleFont.className} text-lg font-semibold text-gray-900`}>Solicitud de vacaciones</h5>
        <p className="text-sm text-gray-600">
          Por favor, selecciona el rango de fechas para tu solicitud de vacaciones. La fecha inicial será tu fecha de
          salida y la fecha final será tu fecha de regreso.
        </p>
      </div>

      <Flag />

      <div className="space-y-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn("w-full justify-start text-left font-normal h-11", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y", { locale: es })} - {format(date.to, "LLL dd, y", { locale: es })}
                  </>
                ) : (
                  format(date.from, "LLL dd, y", { locale: es })
                )
              ) : (
                <span>Selecciona un rango de fechas</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="flex gap-4 p-3 border-b bg-gray-50">
              <div className="grid gap-1 flex-1">
                <h4 className="font-medium text-sm">Período seleccionado</h4>
                <p className="text-sm text-muted-foreground">
                  {date?.from ? (
                    date.to ? (
                      <>
                        <span className="font-medium text-primary">{format(date.from, "dd MMM", { locale: es })}</span>
                        {" - "}
                        <span className="font-medium text-primary">{format(date.to, "dd MMM", { locale: es })}</span>
                        <span className="ml-2 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                          {totalDays} días laborables
                        </span>
                      </>
                    ) : (
                      "Selecciona la fecha final"
                    )
                  ) : (
                    "Selecciona las fechas"
                  )}
                </p>
              </div>
            </div>
            <Calendar
              initialFocus
              mode="range"
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={es}
              disabled={[...disabledDates, { before: new Date() }, { dayOfWeek: [0, 6] }]}
              className="rounded-t-none"
            />
            {date?.from && date?.to && (
              <div className="p-3 border-t bg-muted/5">
                <div className="grid gap-1">
                  <div className="flex items-center text-xs text-muted-foreground gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    Días seleccionados: {totalDays} días laborables
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-400"></div>
                    Fines de semana y feriados no incluidos
                  </div>
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>

        {date?.from && date?.to && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="text-sm font-medium text-blue-900">
              Total días laborables seleccionados: <span className="font-bold">{totalDays}</span>
            </div>
          </div>
        )}
      </div>

      {isLoading && <div className="text-sm text-blue-600">Cargando días festivos...</div>}
      {isError && <div className="text-sm text-red-600">Error al cargar días festivos</div>}
      {errors?.root && <div className="text-sm text-red-600">{errors.root.message}</div>}

      <div className="pt-2">
        <Button
          type="submit"
          className="w-full sm:w-auto sm:ml-auto sm:flex"
          disabled={mutation.isPending || !date?.from || !date?.to}
        >
          {mutation.isPending ? <Spinner /> : "Enviar solicitud"}
        </Button>
      </div>
    </form>
  )
}

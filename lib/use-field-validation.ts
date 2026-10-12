"use client"

import { useState, type SyntheticEvent } from "react"

export function useFieldValidation() {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const clearFieldError = (field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
    field.setCustomValidity("")
    setFieldErrors(errors => errors[field.name] ? { ...errors, [field.name]: "" } : errors)
  }
  const validateField = (event: SyntheticEvent<HTMLFormElement>) => {
    const field = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    if (!field.name || !("setCustomValidity" in field)) return
    field.setCustomValidity("")
    let message = ""
    if (field.required && !field.value.trim()) message = "Ce champ est obligatoire."
    else if (field instanceof HTMLInputElement && field.type === "email" && field.value &&
      !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(field.value)) message = "Saisissez une adresse e-mail au format nom@domaine.fr."
    else if ("maxLength" in field && field.maxLength > 0 && field.value.length > field.maxLength) message = `Limitez ce champ à ${field.maxLength} caractères.`
    field.setCustomValidity(message)
    setFieldErrors(errors => ({ ...errors, [field.name]: message }))
  }
  return { fieldErrors, validateField, clearFieldError }
}

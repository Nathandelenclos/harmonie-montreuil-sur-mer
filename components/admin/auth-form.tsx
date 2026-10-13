'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useFieldValidation } from '@/lib/use-field-validation'
import type { AuthResult } from '@/app/admin/auth-actions'

export default function AuthForm({ mode, action }: { mode: 'login' | 'forgot' | 'reset' | 'verify'; action: (state: AuthResult, form: FormData) => Promise<AuthResult> }) {
  const [state, submit, pending] = useActionState(action, {})
  const [values, setValues] = useState<Record<string, string>>({})
  const { fieldErrors, validateField, clearFieldError } = useFieldValidation()
  const field = (name: string, label: string, type: string, autocomplete: string, minLength?: number) => <div><label htmlFor={`auth-${name}`}>{label}</label><input id={`auth-${name}`} name={name} type={type} value={values[name] || ''} autoComplete={autocomplete} required minLength={minLength} maxLength={name === 'email' ? 254 : 128} aria-invalid={!!fieldErrors[name]} aria-describedby={fieldErrors[name] ? `auth-${name}-error` : undefined} onChange={event => { clearFieldError(event.target); setValues(current => ({ ...current, [name]: event.target.value })) }} />{fieldErrors[name] && <p id={`auth-${name}-error`} className="admin-error" role="alert">{fieldErrors[name]}</p>}</div>
  return <form action={submit} className="admin-form" onBlur={validateField}>
    <p>Tous les champs sont obligatoires.</p>
    {mode !== 'reset' && field('email', 'Adresse e-mail', 'email', 'email')}
    {(mode === 'login' || mode === 'reset') && field('password', mode === 'reset' ? 'Nouveau mot de passe (12 caractères minimum)' : 'Mot de passe', 'password', mode === 'reset' ? 'new-password' : 'current-password', mode === 'reset' ? 12 : 1)}
    {mode === 'verify' && field('token', 'Code à 6 chiffres', 'text', 'one-time-code', 6)}
    {mode === 'reset' && field('confirmation', 'Confirmer le mot de passe', 'password', 'new-password', 12)}
    {state.error && <p role="alert" className="admin-error">{state.error}</p>}
    {state.message && <p role="status">{state.message}</p>}
    {mode === 'forgot' && state.message && <Link href="/admin/confirm" className="admin-link">Saisir le code reçu</Link>}
    <Button type="submit" disabled={pending}>{pending ? 'Veuillez patienter…' : mode === 'login' ? 'Se connecter' : mode === 'forgot' ? 'Recevoir le code' : mode === 'verify' ? 'Vérifier le code' : 'Changer le mot de passe'}</Button>
  </form>
}

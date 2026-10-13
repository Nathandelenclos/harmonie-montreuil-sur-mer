'use server'

import { redirect } from 'next/navigation'
import { createSessionClient } from '@/lib/supabase/server'
import { siteUrl } from '@/lib/metadata'

export type AuthResult = { error?: string; message?: string }
export async function signIn(_state: AuthResult, form: FormData): Promise<AuthResult> {
  const email = String(form.get('email') || '').trim()
  const password = String(form.get('password') || '')
  if (!email || !password) return { error: 'Renseignez votre adresse e-mail et votre mot de passe.' }
  try {
    const client = await createSessionClient(true)
    const { data, error } = await client.auth.signInWithPassword({ email, password })
    if (error || !data.user) return { error: 'Connexion refusée. Vérifiez vos identifiants ou réinitialisez votre mot de passe.' }
    const { data: member, error: membershipError } = await client.from('editorial_editors').select('user_id').eq('user_id', data.user.id).maybeSingle()
    if (!member || membershipError) { await client.auth.signOut(); return { error: 'Ce compte ne dispose pas d’un accès à l’administration.' } }
  } catch { return { error: 'La connexion est indisponible. Réessayez dans quelques instants.' } }
  redirect('/admin')
}

export async function signOut() {
  const client = await createSessionClient(true)
  await client.auth.signOut()
  redirect('/admin/login')
}

export async function requestPasswordReset(_state: AuthResult, form: FormData): Promise<AuthResult> {
  const email = String(form.get('email') || '').trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Saisissez une adresse e-mail au format nom@domaine.fr.' }
  try {
    const client = await createSessionClient(true)
    const origin = process.env.APP_ORIGIN || siteUrl
    const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/admin/reset-password` })
    if (error) return { error: 'L’envoi est indisponible. Patientez quelques minutes avant de réessayer.' }
  } catch { return { error: 'L’envoi est indisponible. Réessayez dans quelques instants.' } }
  return { message: 'Si cette adresse correspond à un compte, un code de récupération a été envoyé. Saisissez-le à l’étape suivante.' }
}

export async function verifyRecoveryCode(_state: AuthResult, form: FormData): Promise<AuthResult> {
  const email = String(form.get('email') || '').trim()
  const token = String(form.get('token') || '').trim()
  if (!email || !/^\d{6}$/.test(token)) return { error: 'Renseignez votre adresse e-mail et le code à 6 chiffres reçu.' }
  try {
    const client = await createSessionClient(true)
    const { error } = await client.auth.verifyOtp({ email, token, type: 'recovery' })
    if (error) return { error: 'Le code est incorrect ou expiré. Vérifiez-le ou demandez un nouveau code.' }
  } catch { return { error: 'La vérification est indisponible. Réessayez dans quelques instants.' } }
  redirect('/admin/reset-password')
}

export async function updatePassword(_state: AuthResult, form: FormData): Promise<AuthResult> {
  const password = String(form.get('password') || '')
  if (password.length < 12 || password.length > 128) return { error: 'Choisissez un mot de passe de 12 à 128 caractères.' }
  if (password !== form.get('confirmation')) return { error: 'Les deux mots de passe doivent être identiques.' }
  try {
    const client = await createSessionClient(true)
    const { data: { user } } = await client.auth.getUser()
    if (!user) return { error: 'Ce lien a expiré. Demandez un nouveau lien de récupération.' }
    const { error } = await client.auth.updateUser({ password })
    if (error) return { error: 'Le mot de passe n’a pas été modifié. Utilisez un nouveau mot de passe et réessayez.' }
    await client.auth.signOut()
  } catch { return { error: 'La modification est indisponible. Réessayez dans quelques instants.' } }
  return { message: 'Mot de passe modifié. Vous pouvez vous connecter.' }
}

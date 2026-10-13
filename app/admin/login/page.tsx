import Link from "next/link"
import AuthForm from '@/components/admin/auth-form'
import { supabaseConfig } from '@/lib/supabase/config'
import { signIn } from '../auth-actions'

export default function LoginPage() {
  return <section className="admin-auth"><p className="text-primary font-semibold">L’espace de l’équipe</p><h1>Faire vivre l’harmonie.</h1><p className="mb-8">Connectez-vous pour préparer les concerts et partager vos souvenirs.</p>
    {supabaseConfig() ? <AuthForm mode="login" action={signIn} /> : <p role="status">L’administration est en cours de configuration. Le site public reste accessible.</p>}
    <Link href="/admin/forgot-password" className="admin-link mt-6">Mot de passe oublié</Link>
  </section>
}

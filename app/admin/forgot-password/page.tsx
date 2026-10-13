import Link from "next/link"
import AuthForm from '@/components/admin/auth-form'
import { requestPasswordReset } from '../auth-actions'
export default async function ForgotPage({ searchParams }: { searchParams: Promise<{ expired?: string }> }) {
  const { expired } = await searchParams
  return <section className="admin-auth"><h1>Retrouver votre accès</h1><p className="mb-8">Recevez un code pour choisir un nouveau mot de passe.</p>{expired && <p role="alert">Le code a expiré ou a déjà été utilisé. Demandez-en un nouveau.</p>}<AuthForm mode="forgot" action={requestPasswordReset} /><Link href="/admin/login" className="admin-link mt-6">Retour à la connexion</Link></section>
}

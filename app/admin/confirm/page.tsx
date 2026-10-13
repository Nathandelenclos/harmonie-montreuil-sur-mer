import Link from 'next/link'
import AuthForm from '@/components/admin/auth-form'
import { verifyRecoveryCode } from '../auth-actions'
export default function ConfirmRecoveryPage() {
  return <section className="admin-auth"><h1>Vérifier votre code</h1><p className="mb-8">Saisissez le code à 6 chiffres reçu par e-mail pour choisir votre mot de passe.</p><AuthForm mode="verify" action={verifyRecoveryCode} /><Link href="/admin/forgot-password" className="admin-link mt-6">Demander un nouveau code</Link></section>
}

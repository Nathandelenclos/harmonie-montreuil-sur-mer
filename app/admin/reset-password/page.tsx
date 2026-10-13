import Link from "next/link"
import AuthForm from '@/components/admin/auth-form'
import { updatePassword } from '../auth-actions'
export default function ResetPage() {
  return <section className="admin-auth"><h1>Choisir un mot de passe</h1><AuthForm mode="reset" action={updatePassword} /><Link href="/admin/login" className="admin-link mt-6">Retour à la connexion</Link></section>
}

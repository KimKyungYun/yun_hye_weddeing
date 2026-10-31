import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth/requireAdmin';
import { COUPLE_TITLE } from '@/constants/wedding';
import LoginForm from './components/LoginForm';
import styles from './Login.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '로그인' };

export default async function LoginPage() {
  // 이미 관리자로 로그인했으면 바로 대시보드로
  if (await getAdminSession()) redirect('/admin');

  return (
    <main className={styles.login}>
      <div className={styles.login__card}>
        <p className={styles.login__eyebrow}>{COUPLE_TITLE}</p>
        <h1 className={styles.login__title}>청첩장 관리</h1>
        <LoginForm />
      </div>
    </main>
  );
}

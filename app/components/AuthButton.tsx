import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button onClick={() => signOut()}>
        Sign out
      </button>
    );
  }
  return (
    <Link href="/login">
      <button>
        Sign in
      </button>
    </Link>
  );
}
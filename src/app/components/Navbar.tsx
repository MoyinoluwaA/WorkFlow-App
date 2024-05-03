import React from 'react';
import { signOut } from 'next-auth/react';
import Button from './Button';
import { Session } from 'next-auth';

interface NavbarProps {
  session: any;
}

const Navbar = ({ session }: NavbarProps) => {
  return (
    <header>
      <nav className="flex items-center justify-between border border-b-slate-400 px-5 py-3">
        <span>Welcome {session?.user?.name}!</span>
        <Button onClick={() => signOut()}>Sign out</Button>
      </nav>
    </header>
  );
};

export default Navbar;

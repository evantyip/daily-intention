import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <div>You are not logged in</div>
        <button onClick={() => signIn()}>Sign In</button>
      </>
    );
  }
  return (
    <>
      <div>Hello, {session.user?.name}</div>
      <button onClick={() => signOut()}>Sign Out</button>
    </>
  );
};

export default Home;

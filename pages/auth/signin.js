import { getProviders, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignIn({ providers }) {
  const {
    query: { callbackUrl },
  } = useRouter();
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="btn"
            onClick={() => signIn(provider.id, { callbackUrl })}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

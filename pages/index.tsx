import axios from 'axios';
import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Login from '../components/Login';

const Home: NextPage = () => {
  const { data: session } = useSession();

  const createPost = async () => {
    const testData = {
      userId: session?.user.id,
      feelingInt: 1,
      word: 'success',
      notes: 'testing',
    };

    try {
      const res = await axios.post('/api/post', testData);

      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getPost = async () => {
    const res = await axios.get('/api/post');
    console.log(res);
  };

  if (!session) {
    return (
      <>
        <Login />
      </>
    );
  }
  return (
    <>
      <div className="navbar mb-2 shadow-lg bg-base-200 text-neutral rounded-box">
        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-bold">Intent</span>
        </div>
        <div className="flex-none">
          <button onClick={() => signOut()} className="btn btn-ghost">
            Sign Out
          </button>
        </div>
      </div>
      <div>
        <button onClick={() => createPost()} className="btn btn-primary">
          Add Post
        </button>
        <button onClick={() => getPost()} className="btn btn-primary">
          Get Post
        </button>
      </div>
    </>
  );
};

export default Home;

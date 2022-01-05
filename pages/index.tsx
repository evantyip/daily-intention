import axios from 'axios';
import type { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import Login from '../components/Login';
import {
  Day,
  DayCreation,
  Feeling,
  ReflectionCreation,
} from '../constants/interfaces';

const fetcher = (url: string) => axios.get(url).then((r) => r);

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { mutate: mutateDays } = useSWR(`/api/${session?.user.id}`, fetcher, {
    revalidateOnFocus: false,
    onSuccess: (key) => {
      setUserDays(key.data.Day);
    },
  });
  const { data: feelings } = useSWR('/api/feeling', fetcher, {
    revalidateOnFocus: false,
    onSuccess: (key) => {
      const mapping = new Map();
      key.data.forEach((el: Feeling) => {
        mapping.set(el.feeling, el.id);
      });
      setReflectionFeelingMap(mapping);
    },
  });
  const [createIntentState, setCreateIntentState] = useState<string>('modal');
  const [intentWord, setIntentWord] = useState<string>('');
  const [intentNotes, setIntentNotes] = useState<string>('');
  const [createReflectionState, setCreateReflectionState] =
    useState<string>('modal');
  const [reflectionNotes, setReflectionNotes] = useState<string>('');
  const [reflectionFeelingMap, setReflectionFeelingMap] =
    useState<Map<string, number>>();
  const [refelectionFeeling, setReflectionFeeling] = useState<
    number | undefined
  >(0);
  const [selectedDay, setSelectedDay] = useState<Day>();
  const [userDays, setUserDays] = useState<Day[]>();

  const createDay = async () => {
    const data: DayCreation = {
      userId: session!.user.id,
      word: intentWord,
      notes: intentNotes,
    };

    try {
      const res = await axios.post(`/api/${session?.user.id}/intent`, data);
      console.log(res);
      mutateDays();
      setIntentNotes('');
      setIntentWord('');
      toggleCreate('intent');
    } catch (e) {
      console.log(e);
    }
  };

  const createReflection = async () => {
    const data: ReflectionCreation = {
      dayId: selectedDay!.id,
      feelingInt: refelectionFeeling as number,
      notes: reflectionNotes,
    };
    try {
      const res = await axios.post(`/api/${session?.user.id}/reflection`, data);
      console.log(res);
      mutateDays();
      setSelectedDay(undefined);
      setReflectionFeeling(0);
      setReflectionNotes('');
      toggleCreate('reflection');
    } catch (e) {
      console.log(e);
    }
  };

  const formatTime = (time: any) => {
    return new Date(time).toLocaleDateString('en-gb', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const compareLatestDay = () => {
    const currentDate = new Date();
    if (userDays) {
      const latestDate = new Date(userDays[0].date);
      return currentDate.getDate() > latestDate.getDate();
    }
    return false;
  };

  const toggleCreate = (modal: string) => {
    if (modal == 'intent') {
      setCreateIntentState(
        createIntentState.includes('open') ? 'modal' : 'modal modal-open'
      );
    }
    if (modal == 'reflection') {
      setCreateReflectionState(
        createReflectionState.includes('open') ? 'modal' : 'modal modal-open'
      );
    }
  };

  const displayDays = () => {
    return userDays?.map((day) => {
      return (
        <div
          key={day?.id}
          className="card lg:card-side card-bordered shadow-lg col-span-1 lg:col-span-4 lg:col-start-2"
        >
          <div className="card-body prose lg:col-span-4">
            <h2 className="card-title max-h-10">{formatTime(day?.date)}</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <h3>Intent</h3>
                <p>word: {day?.Intent[0].word}</p>
                <h4>notes:</h4>
                <p className="whitespace-pre-line">{day?.Intent[0].notes}</p>
              </div>
              {day?.Reflection.length > 0 && (
                <div className="col-span-2">
                  <h3>Reflection</h3>
                  <p>feeling: {day?.Reflection[0].feeling?.feeling}</p>
                  <h4>notes:</h4>
                  <p className="whitespace-pre-line">
                    {day?.Reflection[0].notes}
                  </p>
                </div>
              )}
            </div>

            {day?.Reflection?.length == 0 && (
              <div className="card-actions">
                <button
                  onClick={() => {
                    toggleCreate('reflection');
                    setSelectedDay(day);
                  }}
                  className="btn btn-primary"
                >
                  Write Reflection
                </button>
              </div>
            )}
          </div>
        </div>
      );
    });
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
      <div className="grid grid-cols-1 gap-6 min-h-screen lg:p-10 lg:grid-cols-6 bg-base-200 rounded-box">
        <div className="navbar col-span-1 xl:col-span-6 mb-2 shadow-lg bg-base-200 text-neutral rounded-box max-h-20">
          <div className="flex-1 px-2 mx-2">
            <span className="text-lg font-bold">Intent</span>
          </div>
          <div className="flex-none">
            {compareLatestDay() && (
              <button
                onClick={() => toggleCreate('intent')}
                className="btn btn-primary"
              >
                Start a Day
              </button>
            )}
            <button onClick={() => signOut()} className="btn btn-ghost">
              Sign Out
            </button>
          </div>
        </div>
        <div className={createIntentState}>
          <div className="modal-box prose">
            <div>
              <h3>Intention for the day</h3>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">One Word to Describe Day</span>
              </label>
              <input
                type="text"
                value={intentWord}
                placeholder="Ex: productive"
                className="input input-bordered"
                onChange={(e) => setIntentWord(e.target.value)}
              />
              <label className="label">
                <span className="label-text">Notes</span>
              </label>
              <textarea
                value={intentNotes}
                onChange={(e) => setIntentNotes(e.target.value)}
                rows={5}
                className="textarea textarea-bordered resize-none"
              />
            </div>
            <div className="modal-action">
              <button onClick={createDay} className="btn btn-primary">
                Create
              </button>
              <button
                onClick={() => {
                  toggleCreate('intent');
                  setIntentNotes('');
                  setIntentWord('');
                }}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className={createReflectionState}>
          <div className="modal-box prose">
            <div>
              <h3>Reflection for {formatTime(selectedDay?.date)}</h3>
            </div>

            <div className="form-control">
              <select
                onChange={({ target }) =>
                  setReflectionFeeling(reflectionFeelingMap?.get(target.value))
                }
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>
                  Choose your feeling
                </option>
                {feelings?.data.map((el: Feeling) => {
                  return <option key={el.id}>{el.feeling}</option>;
                })}
              </select>
              <label className="label">
                <span className="label-text">Notes</span>
              </label>
              <textarea
                value={reflectionNotes}
                onChange={(e) => setReflectionNotes(e.target.value)}
                rows={5}
                className="textarea textarea-bordered resize-none"
              />
            </div>
            <div className="modal-action">
              <button onClick={createReflection} className="btn btn-primary">
                Add Reflection
              </button>
              <button
                onClick={() => {
                  toggleCreate('reflection');
                  setSelectedDay(undefined);
                  setReflectionFeeling(0);
                  setReflectionNotes('');
                }}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        {displayDays()}
      </div>
    </>
  );
};

export default Home;

import type { NextPage } from 'next';
import useSWR from 'swr';
import styles from '../styles/Home.module.css';
import fetcher from '../utils/fetcher';

interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
};

const Home: NextPage = () => {
  const { data } = useSWR<User>(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    fetcher
  );
  
  console.log('data', data);

  if (data) {
    return (
      <div>
        Weclome! {data.name};
      </div>
    );
  }

  return (
    <div className={styles.container}>

    </div>
  );
};

export default Home;

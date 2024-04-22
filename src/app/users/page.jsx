'use client'
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const { data, error } = useSWR('/api/users', fetcher);
  const [users, setUsers] = useState([]);

  console.log(data);
  const { rows } = data || {};
  console.log(rows);


  return (
    <div>
      <h1>Users</h1>
      {rows?.map((user) => (
        <div key={user.id}>
          <h2>{user.username}</h2>
          <p>{user.handicap_index}</p>
        </div>
      ))}

    </div>
  );
}

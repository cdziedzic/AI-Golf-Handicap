'use client'
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const { data, error } = useSWR('/api/users', fetcher);
  const [users, setUsers] = useState([]);

  const { rows } = data || {};

  return (
    <div>
      <h1>Rounds</h1>
      {rows?.map((round) => (
        <div key={round.user_id}>
          <p>{round.date_played}</p>
          <p>{round.course_name}</p>
          <p>Score: {round.score}</p>
          <p>Course rating:{round.course_rating}</p>
          <p>Slope:{round.slope}</p>
          <p>Differential:{round.differential}</p>
        </div>
      ))}

    </div>
  );
}

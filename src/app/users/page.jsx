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
    <div class="max-w-sm mx-auto my-10 p-5 bg-gray-300 rounded-lg shadow-lg">
    <div class="mb-2">
        <h5 class="text-xl font-bold leading-none text-gray-900">John Doe</h5>
        <p class="text-gray-600">Date: </p>
    </div>
    <div class="mb-2">
        <p class="text-lg text-gray-800">Course: </p>
        <p class="text-gray-600">Rating: 76.1</p>
        <p class="text-gray-600">Slope: 135</p>
        <p>Tees:</p>
        <p>Differential:</p>
    </div>
    <div class="mb-2">
        <p class="text-lg font-semibold text-gray-900">Score: </p>
    </div>
</div>
 
  );
}

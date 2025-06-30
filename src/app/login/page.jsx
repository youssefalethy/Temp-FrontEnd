import Login from '@/components/authentication/Login'
import React from 'react'

export default async function page() {

  // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  // const data = await response.json();
  // console.log(data);

  

  return (
    <div>
        <Login />
    </div>
  )
}

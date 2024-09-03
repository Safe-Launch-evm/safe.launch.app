export default async function client(url: string, data?: any, tag?: string) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const origin = process.env.NEXT_PUBLIC_APP_CLIENT;
  // const res = await fetch(`${BASE_URL}${url}`, {
  //   next: { tags: [`${tag}`] },
  //   headers: { accept: 'application/json' }
  // });
  // return res.json();

  const res = await fetch(`${BASE_URL}${url}`, {
    method: data ? 'POST' : 'GET',
    // next: { tags: [`${tag}`] },
    headers: {
      accept: 'application/json',
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_CLIENT ?? '',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

// export default async function client(url: string, data: any, tag?: string) {
//   const BASE_URL = process.env.BASE_API_URL;
//   const res = await fetch(`${BASE_URL}${url}`, {
//     method: 'POST', // Specify the request method
//     next: { tags: [`${tag}`] },
//     headers: {
//       accept: 'application/json',
//       'Content-Type': 'application/json' // Set the content type for JSON
//     },
//     body: JSON.stringify(data) // Convert the data to a JSON string
//   });
//   return res.json();
// }

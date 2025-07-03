import { firebaseApiKey } from '../Api keys/signup.env';

const GetData = async () => {
  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: localStorage.getItem('token'),
        }),
      }
    );

    const data = await res.json();
    return data?.users?.[0] || null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export default GetData;

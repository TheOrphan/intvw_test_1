import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { URL } from './config';

export default function myAxios(uri, method) {
  const [fetch, refetch] = useState(false);
  const [response, setResponse] = useState(null);
  uri = uri ? uri : '';

  useEffect(() => {
    fetching();
  }, [uri, fetch]);

  async function fetching() {
    try {
      const response = await axios({
        method: method ? 'get' : method,
        url: URL + uri,
      });
      setResponse({
        status: response.status,
        data: response.data,
      });
    } catch (error) {
      setResponse({ error });
    }
  }

  return [response, refetch];
}

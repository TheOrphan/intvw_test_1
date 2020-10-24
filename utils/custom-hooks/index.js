import { useEffect, useState, useReducer } from 'react';
import myAxios from '../api/myAxios';

export function useContact() {
  const [res, refetch] = myAxios('contact');
  const [contact, setContact] = useState(null);

  useEffect(() => {
    if (res && res.status == 200) {
      setContact(res.data.data);
    }
  }, [res]);

  return [contact, refetch];
}

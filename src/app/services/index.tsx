import axios from 'axios';
import { FormProps } from '../components/workflowSidebar';

export const sendApiRequest = async (data: FormProps) => {
  try {
    const res = await axios.post('/api/trigger', data);
    return res;
  } catch (err) {
    return null;
  }
};

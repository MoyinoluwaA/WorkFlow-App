import axios from 'axios';
import { FormProps } from '../components/workflowSidebar';

export const sendApiRequest = async (data: FormProps) => {
  try {
    const res = await axios.post('/api/trigger', data);
    return res;
  } catch (err: any) {
    throw new Error(
      JSON.stringify({
        error: true,
        code: err.response.status,
        statusText: err.response.statusText,
        message: err.response.data.error
          ? err.response.data.error[0]
          : err.response.data.message,
      }),
    );
  }
};

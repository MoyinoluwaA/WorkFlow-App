import axios from 'axios';
import { FormProps } from '../components/workflowSidebar';

export const sendApiRequest = async (data: FormProps) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUPLIC_APP_BASE_URL}/api/trigger`,
      data,
    );
    return res;
  } catch (err) {
    return null;
  }
};

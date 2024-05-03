import axios from 'axios';
import { WorkflowRepository } from '../repositories/workflow';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { action, url, triggerInput, triggerInputValue } = data;

    if (!action || !url || !triggerInput || !triggerInputValue) {
      throw new Error('add all required fields');
    }

    if (action !== 'GET') {
      throw new Error('Logic can only handle GET requests');
    }

    const res = await axios.get(`${url}?${triggerInput}=${triggerInputValue}`);

    await WorkflowRepository().addAction(res);

    return Response.json(res.data);
  } catch (error: any) {
    return new Response(`Error: ${error.message}`, {
      status: 400,
    });
  }
}

import axios from 'axios';
import WorkflowRepository from '../repositories/workflow';
import { validateInput } from '../middlewares/validation';
import { addActionSchema } from '../schemas/action';
import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../lib/connect';
import { TriggerActionDto } from './trigger-action.dto';

export async function POST(request: NextRequest) {
  try {
    await connectMongo();
    const data: TriggerActionDto = await request.json();
    await validateInput(addActionSchema, data);

    const repository = await WorkflowRepository;
    const configId = await repository.addActionConfiguration(data);
    const { url, triggerInput, triggerInputValue } = data;
    let outgoingUrl = url;
    if (triggerInput && triggerInputValue) {
      outgoingUrl = `${url}?${triggerInput}=${triggerInputValue}`;
    }
    const res = await axios.get(outgoingUrl);

    await repository.addActionResult({
      ...res.data,
      actionConfigId: configId,
    });

    return NextResponse.json(
      {
        status: 'success',
        data: res.data,
        message: 'Successfully triggered outgoing request',
        code: 200,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        error: error.error,
        message: error.message,
        code: error.status || 500,
      },
      {
        status: error.status || 500,
      },
    );
  }
}

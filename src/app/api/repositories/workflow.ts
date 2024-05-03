import { OptionalId, Document } from 'mongodb';
import clientPromise from '../../lib/mongodb';

export const WorkflowRepository = () => {
  const addAction = async <T extends { data: Object }>(res: T) => {
    try {
      const client = await clientPromise;
      const db = client.db('workflow-app');
      const workflowAction = db.collection('outgoing-api-calls');
      const result = await workflowAction.insertOne(res.data);
      return result.insertedId;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return {
    addAction,
  };
};

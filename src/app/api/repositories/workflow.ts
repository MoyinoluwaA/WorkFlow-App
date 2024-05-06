import clientPromise from '../../lib/mongodb';
import { CustomError } from '../utils/response';

const WorkflowRepository = async () => {
  const addActionConfiguration = async (data: Object) => {
    try {
      const client = await clientPromise;
      const db = client.db('workflow-app');
      const workflowAction = db.collection('action-configuration');
      const result = await workflowAction.insertOne(data);
      return result.insertedId;
    } catch (error: any) {
      throw new CustomError(
        'An error occured while adding data to database',
        500,
        error.message,
      );
    }
  };

  const addActionResult = async (data: Object) => {
    try {
      const client = await clientPromise;
      const db = client.db('workflow-app');
      const workflowAction = db.collection('outgoing-api-calls');
      const result = await workflowAction.insertOne(data);
      return result.insertedId;
    } catch (error: any) {
      throw new CustomError(
        'An error occured while adding data to database',
        500,
        error.message,
      );
    }
  };

  return {
    addActionResult,
    addActionConfiguration,
  };
};

export default WorkflowRepository();

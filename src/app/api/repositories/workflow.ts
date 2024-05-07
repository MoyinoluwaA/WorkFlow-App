import ActionConfig from '../models/actionConfig';
import { CustomError } from '../utils/response';
import ActionConfigResult from '../models/actionResult';

const WorkflowRepository = async () => {
  const addActionConfiguration = async (data: Object) => {
    try {
      const result = await ActionConfig.create(data);
      return result._id;
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
      const result = await ActionConfigResult.create(data);
      return result;
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

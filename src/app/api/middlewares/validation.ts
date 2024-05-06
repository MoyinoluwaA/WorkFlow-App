import { CustomError } from '../utils/response';

/**
 * @description Used to validate req body, params, query and headers to
 *  ensure the required fields are filled and are of the right data type
 */
export const validateInput = async (
  data: { schema: any; message?: string },
  dataToValidate: any,
) => {
  const options = { language: { key: '{{key}} ' }, abortEarly: false };

  const isValid = await data.schema.validate(dataToValidate, options);

  if (!isValid.error) {
    return;
  }

  const errorMessages = isValid.error.details.map(
    (err: { message: string }) => {
      return err.message.replace(/[\"]/gi, '');
    },
  );

  throw new CustomError('validation error occured', 400, errorMessages);
};

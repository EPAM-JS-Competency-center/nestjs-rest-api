import { DatabaseExceptions } from '../constants';

type DatabaseException = {
  __type: string | undefined;
};

export const getDatabaseExceptionType = <Error extends DatabaseException>(
  error: Error,
): string | undefined => error.__type;

export const getIsConditionalCheckFailedException = <
  Error extends DatabaseException,
>(
  error: Error,
): boolean => {
  const type = getDatabaseExceptionType(error);

  return Boolean(
    type && type.includes(DatabaseExceptions.CONDITIONAL_CHECK_FAILED),
  );
};

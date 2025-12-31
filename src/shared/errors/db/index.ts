import { SQL_ERRORS } from "../../constants"

export abstract class DatabaseException extends Error {
  constructor(
    public readonly status: number,
    message?: string,
  ) {
    super(message)
  }
}

export class ForeignKeyException extends DatabaseException {
  constructor() {
    super(422, `Erro de chave estranhgeira!`)
  }
}

export class RequiredFieldException extends DatabaseException {
  constructor(field: string) {
    super(400, `Campo obrigatório: ${field ?? ''}`)
  }
}

export class UniqueException extends DatabaseException {
  constructor() {
    super(409, `Erro de unicidade!`)
  }
}

export function dbError(error: any) {
  switch (error.code) {
    case SQL_ERRORS.FOREIGN_KEY:
      return new ForeignKeyException()
    case SQL_ERRORS.REQUIRED_FIELD:
      return new RequiredFieldException(error.column)
    case SQL_ERRORS.UNIQUE_FIELD:
      return new UniqueException()
    default:
      return error
  }
}
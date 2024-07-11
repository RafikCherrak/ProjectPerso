import Joi from "joi"
import _ from "lodash"
import { HttpException } from "../../exceptions/HttpException"
import logger from "../../services/logger"

export default abstract class BaseDTO {
  public schema: Joi.ObjectSchema<unknown> | null

  constructor(obj: unknown) {
    this.schema = null
    if (!obj)
      logger.warn("DTO parameter is null")
  }

  public validate(): void {
    const { error } = this.schema?.validate(_.omit(this, ["schema", "validate"])) ?? { error: null }
    if (error) {
      const { details } = error
      const message = details.map(i => i.message).join(",")
      throw new HttpException(message, "INVALID_PARAMETER", 422)
    }
  }
}

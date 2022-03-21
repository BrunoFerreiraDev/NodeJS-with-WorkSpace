import prisma from "@prisma/client";
import joi from "joi";
import Controller from "./Controller.js";

const { ParentalGuidance } = prisma;

const schema = joi.object({
  parentalGuidance: joi.string().valid(...Object.values(ParentalGuidance)),
  languages: joi.array().items(joi.string()),
  director: joi.string().required().min(3).max(50),
  name: joi.string().required(),
  duration: joi.number().integer().positive().max(500),
  thumbnail: joi.string().allow(""),
  rating: joi.number().max(10),
  description: joi.string().required().max(10000),
});

class MovieController extends Controller {
  constructor() {
    super({ entity: "movie", validationSchema: schema });
  }
}

export default MovieController;

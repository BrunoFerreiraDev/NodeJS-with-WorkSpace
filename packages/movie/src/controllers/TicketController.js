import prisma from "@prisma/client";
import joi from "joi";
import Controller from "./Controller.js";

const { TicketType } = prisma;

const schema = joi.object({
  price: joi.number().required().precision(2),
  type: joi
    .string()
    .required()
    .valid(...Object.values(TicketType)),

  session: joi.object({
    connect: joi.object({
      id: joi.string().required(),
    }),
  }),
  user: joi.object({
    connect: joi.object({
      id: joi.number().required(),
    }),
  }),
});

class TicketController extends Controller {
  constructor() {
    super({
      entity: "ticket",
      validationSchema: schema,
      prismaOptions: {
        include: {
          session: {
            include: {
              movie: true,
            },
          },
          user: true,
        },
      },
    });
  }

  store(request, response) {
    const { sessionId, userId } = request.body;

    delete request.body.sessionId;
    delete request.body.userId;

    request.body = {
      ...request.body,
      session: {
        connect: {
          id: sessionId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    };

    super.store(request, response);
  }
}

export default TicketController;

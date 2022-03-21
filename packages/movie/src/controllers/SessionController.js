import prisma from '@prisma/client';
import joi from 'joi';
import Controller from './Controller.js';

const { Room, SeatStatus, SeatType } = prisma;

const schema = joi.object({
  sessionDate: joi.date().required(),
  room: joi.string().required().valid(
    ...Object.values(Room),
  ),
  caption: joi.boolean().required(),

  movie: joi.object({
    connect: joi.object({
      id: joi.string().required(),
    }),
  }),
  SessionSeats: joi.any(),
});

class SessionController extends Controller {
  constructor() {
    super({
      entity: 'session',
      validationSchema: schema,
      prismaOptions: {
        include: {
          movie: true, Ticket: true, SessionSeats: true,
        },
      },
    });

    this.excludeColumns = [
      { line: 'A', columns: [1, 3] },
      { line: 'B', columns: [3] }];
    this.maxOfColumns = 5;
    this.maxOfRows = 5;
  }

  generateSeats() {
    const seats = [];
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for (let x = 0; x < this.maxOfRows; x++) {
      for (let y = 0; y < this.maxOfColumns; y++) {
        const isExcluded = this.excludeColumns.find(({ columns, line }) => columns.includes(y + 1) && line === alphabet[x]);

        if (isExcluded) {
          continue;
        }

        seats.push({
          line: alphabet[x],
          column: y + 1,
          type: SeatType.STANDARD,
          status: SeatStatus.AVAILABLE,
        });
      }
    }

    return seats;
  }

  store(request, response) {
    const { movieId } = request.body;

    delete request.body.movieId;

    request.body = {
      ...request.body,
      movie: {
        connect: {
          id: movieId,
        },
      },
      SessionSeats: {
        createMany: { data: this.generateSeats() },
      },
    };

    request.body.movie = {
      connect: {
        id: movieId,
      },
    };

    super.store(request, response);
  }
}

export default SessionController;

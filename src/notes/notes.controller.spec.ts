import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { Note } from './schemas/note.schema';

describe('NotesController', () => {
  let controller: NotesController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        NotesService,
        { provide: getModelToken(Note.name), useValue: jest.fn() },
      ],
    }).compile();

    controller = moduleRef.get<NotesController>(NotesController);
  });

  describe('findAll', () => {
    it('should return an array of notes', async () => {
      expect(controller).toBeDefined();
    });
  });
});

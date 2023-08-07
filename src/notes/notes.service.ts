import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './schemas/note.schema';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async getAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  async getById(id: string): Promise<Note | null> {
    return this.noteModel.findById(id);
  }

  async create(noteDto: CreateNoteDto): Promise<Note> {
    const newNote = new this.noteModel(noteDto);
    return newNote.save();
  }

  async remove(id: string): Promise<Note | null> {
    return this.noteModel.findByIdAndRemove(id);
  }

  async update(id: string, noteDto: UpdateNoteDto): Promise<Note | null> {
    return this.noteModel.findByIdAndUpdate(id, noteDto, { new: true });
  }
}

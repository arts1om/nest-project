import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Header,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';
import { Note } from './schemas/note.schema';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getAll(): Promise<Note[]> {
    return this.notesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Note | null> {
    return this.notesService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.notesService.create(createNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Note | null> {
    return this.notesService.remove(id);
  }

  @Put(':id')
  update(
    @Body() updateNoteDto: UpdateNoteDto,
    @Param('id') id: string,
  ): Promise<Note | null> {
    return this.notesService.update(id, updateNoteDto);
  }
}

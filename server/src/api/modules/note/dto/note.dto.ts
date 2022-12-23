import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

class MetadataGroupFieldSchemaDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;
}

class MetadataGroupFieldDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: MetadataGroupFieldSchemaDto })
  schema: MetadataGroupFieldSchemaDto;

  @ApiProperty()
  value: any;
}

class NoteMetadataGroupDto {
  @ApiProperty()
  context: string;

  @ApiProperty({ type: [MetadataGroupFieldDto] })
  fields: MetadataGroupFieldDto[];
}

class NoteMetadataDto {
  @ApiProperty({ type: [NoteMetadataGroupDto] })
  groups: NoteMetadataGroupDto[];
}

export class NoteDto {
  @AutoMap()
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ type: NoteMetadataDto })
  metadata: NoteMetadataDto;

  @ApiProperty()
  document: any;

  @AutoMap()
  @ApiProperty()
  createdAt: Date;

  @AutoMap()
  @ApiProperty()
  updatedAt: Date;
}

export class CreateNoteResponse {
  @ApiProperty({ type: NoteDto })
  createdNote: NoteDto;
}

export class GetNoteResponse {
  @ApiProperty({ type: NoteDto })
  note: NoteDto;
}

export class GetNotesResponse {
  @ApiProperty({ type: [NoteDto] })
  notes: NoteDto[];
}

export class UpdateNoteTitleBody {
  @ApiProperty()
  title: string;
}

export class UpdateNoteTitleResponse {}

export class UpdateNoteDocumentBody {
  @ApiProperty()
  document: any;
}

export class UpdateNoteDocumentResponse {}

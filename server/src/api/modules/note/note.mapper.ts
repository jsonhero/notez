import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { Note } from '@database/schemas';

import * as DTO from './dto';

@Injectable()
export class NoteMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      // createMap(mapper, Note, DTO.NoteResponse);
    };
  }
}

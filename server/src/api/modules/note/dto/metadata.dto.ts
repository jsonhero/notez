import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class AddMetadataFieldResponse {}

export class AddMetadataFieldBody {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;
}

export class UpdateMetadataFieldResponse {}

export class UpdateMetadataFieldBody {
  @ApiProperty()
  fieldId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;
}

export class UpdateMetadataFieldValueResponse {}

export class UpdateMetadataFieldValueBody {
  @ApiProperty()
  fieldId: string;

  @ApiProperty()
  value: any;
}

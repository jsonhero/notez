import { Schema, model, connect, HydratedDocument } from 'mongoose';
import { nanoid } from 'nanoid';

interface INoteMetdata {
  schema: any;
  implements: string[];
  values: any;
}

interface INote {
  metadata: INoteMetdata;
}

const NoteMetadataSchema = new Schema<INoteMetdata>({
  values: {
    local: {},
    external: {},
  },
  implements: [String],
  schema: {},
});

const NoteSchema = new Schema<INote>({
  metadata: NoteMetadataSchema,
});

const NoteModel = model('Note', NoteSchema);

interface INoteTable {
  implementationId: string;
  title: string;
  schema: any;
}

const NoteTableSchema = new Schema<INoteTable>({
  implementationId: String,
  title: String,
  schema: {},
});
const NoteTableModel = model('NoteTable', NoteTableSchema);

function generateFieldId() {
  return 'f_' + nanoid(10);
}

interface ICreateNote {
  fields: {
    definition: {
      name: string;
      type: string;
    };
    value: any;
  }[];
}

function createNote(note: ICreateNote): HydratedDocument<INote> {
  const valuesObj = {};
  const schemaObj = {};

  note.fields.forEach((field) => {
    const fieldId = generateFieldId();
    valuesObj[fieldId] = field.value;
    schemaObj[fieldId] = field.definition;
  });

  return new NoteModel({
    metadata: {
      values: {
        local: valuesObj,
        external: {
          test: 1,
        },
      },
      schema: {
        fields: schemaObj,
      },
      implements: ['Test'],
    },
  });
}

async function run() {
  // 4. Connect to MongoDB
  await connect('mongodb://localhost:27017/notez');
  // const { nanoid } = await import('nanoid');

  const note1 = createNote({
    fields: [
      {
        definition: {
          type: 'text',
          name: 'First Name',
        },
        value: 'Jason',
      },
      {
        definition: {
          type: 'text',
          name: 'Last Name',
        },
        value: 'Bratt',
      },
    ],
  });

  await note1.save();

  const noteTable = new NoteTableModel({
    title: 'Person',
    externalId: 't_' + nanoid(10),
    schema: {
      fields: {
        [generateFieldId()]: {
          type: 'text',
          name: 'First Name',
        },
        [generateFieldId()]: {
          type: 'text',
          name: 'Last Name',
        },
      },
    },
  });

  await noteTable.save();
}

run();


class Note {
  metadata: NoteMetadata;
}


class NoteMetadata {


  _generateFieldId(): string {
    return 'f_' + nanoid(10);
  }

  setFieldValue(fieldId: string, fieldValue: MetaDataFieldValue): void {
    
  }
}

class MetaDataFieldValue {
  type: string;

  constructor(type: string) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  getValue(): any {
    return null;
  }
}

class MetaDataFieldValueText extends MetaDataFieldValue {
  value: string;

  constructor() {
    super('text');
  }
}

class MetaDataFieldValueNumber extends MetaDataFieldValue {
  value: number;

  constructor() {
    super('number');
  }

  getValue(): number {
    return this.value;
  }
}

class MetaDataFieldValueDate extends MetaDataFieldValue {
  value: Date;

  constructor() {
    super('date');
  }

  getValue(): Date {
    return this.value;
  }
}
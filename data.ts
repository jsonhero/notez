interface NoteDatabase {
  id: string;
  title: string;
  schema: NoteDatabaseSchema;
  notes: Note[]
}

interface NoteDatabaseSchema {
  columns:  [
    {
      id: string;
      name: string;
      type: string;
      meta: any; // data about the type
    }
  ]
}

interface NoteRef {
  note: Note
}

interface Note {
  title: string;
  metadata: NoteMetadata;
  content: any;
  refs: {
    to: NoteRef[]
    from: NoteRef[]
  };
}

interface NoteMetadata {
  fields: [
    {
      context: 'local',
      field: {
        type: string,
        meta: any,
      },
      value: {}
    },
    {
      context: 'external',
      externalDatabaseId: string,
      externalColumnId: string,
      // externalSchemaId: any;
      value: {} 
    },
    {
      value: {
        
      }
    }
  ],
  implementations: [{
    externalDatabaseId: string
  }]
}


const fields = {
  ['local_{columnId}']: '2',
  ['{noteDatabaseId}_{columnId}']: '123',

}



interface Person {
  firstName: string;
  lastName: string;
}

interface Friend {
  birthday: Date;
}

interface WorkColleague {
  place: string;
}

interface PersonFriend {
  person_firstName: string;
  person_lastName: string;
  friend_birthday: Date;
  local_relatedTo: [Person]
  local_partner: Person
}

const metadata = {
  
}


notes.metadata.fields.find({

})



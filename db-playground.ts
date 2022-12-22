import { Schema, model, connect } from 'mongoose';

const TestNote = {
  metadata: {
    values: {
      local: {
        'columnId': ''
      },
      'tableId': {
        'columnId': '',
      },
    },
    schema: {
      'columnId': {
        name: ''
      }
    },
    implements: ['tableId']
  }
}

interface IMetadataSchema {

}

interface INoteMetdata {
  schema: {};
  implements: string[];
  values: {};
}

interface INote {
  metadata: INoteMetdata;
}

const NoteMetadataSchema = new Schema<INoteMetdata>({
  values: {},
  implements: [String],
  schema: {},
});

const NoteSchema = new Schema<INote>({
  metadata: NoteMetadataSchema,
});

async function run() {
  // 4. Connect to MongoDB
  await connect('mongodb://localhost:27017/notez');

  const user = new User({
    name: 'Bill',
    email: 'bill@initech.com',
    avatar: 'https://i.imgur.com/dM7Thhn.png',
  });
  await user.save();

  console.log(user.email); // 'bill@initech.com'
}

const data1 = [
  {
    metadata: {
      fields: [
        {
          context: 'local',
          field: {
            type: 'text',
          },
        },
      ],
    },
  },
];

const PersonDatabase = {
  id: 'abc',
  title: 'Person',
  schema: {
    columns: [
      // Own columns
      {
        id: 'firstName',
        type: 'text',
        name: 'First Name',
      },
      {
        id: 'lastName',
        type: 'text',
        name: 'Last Name',
      },
    ],
    extends: [],
  },
};

const FriendDatabase = {
  title: 'Friend',
  schema: {
    columns: [
      // Own columns
      {
        id: 'birthday',
        type: 'date',
        name: 'Birthday',
      },
      {
        id: 'friends',
        type: 'NoteRef<Friend>[]',
        name: 'Friends',
      },
      // These would calculated/dynamic columns, you cannot change definitions of these since they're owned by Person
      {
        id: 'person_firstName',
        type: 'text',
        name: '<Person> First Name',
      },
      {
        id: 'person_lastName',
        type: 'text',
        name: '<Person> Last Name',
      },
    ],
    extends: [PersonDatabase],
  },
};

const BestFriendDatabase = {
  title: 'BestFriend',
  schema: {
    columns: [
      // Own columns
      {
        id: 'favoriteColor',
        type: 'color',
        name: 'Favorite Color',
      },
      // Dynamic columns
      {
        id: 'friend_birthday',
      },
      {
        id: 'friend_friends',
      },
      {
        id: 'person_firstName',
      },
      {
        id: 'person_lastName',
      },
    ],
    extends: [FriendDatabase],
  },
};

const GamerDatabase = {
  title: 'Gamer',
  schema: {
    columns: [
      // Own columns
      {
        id: 'bestGame',
        type: 'text',
        name: 'Best Game',
      },
      // Dynamic columns
      {
        id: 'person_firstName',
      },
      {
        id: 'person_lastName',
      },
    ],
    extends: [PersonDatabase],
  },
};

const ProjectDatabase = {
  title: 'Project',
  schema: {
    columns: [
      // Own columns
      {
        id: 'name',
        type: 'text',
        name: 'Name',
      },
      {
        id: 'members',
        type: 'NoteRef<Person>',
        name: 'Name',
      },
    ],
    extends: [],
  },
};

const friendNotes = [
  {
    id: 1,
    title: 'Friend 1',
    metadata: {
      values: {
        // local
        local_pets: ['Kitty', 'Dog'],
        // external
        person_firstName: 'Jason',
        person_lastName: 'Bratt',
        friend_birthday: '09/21/1995',
        friend_friends: [2],
      },
      implements: [FriendDatabase],
    },
  },
  {
    id: 2,
    title: 'Friend 2',
    metadata: {
      values: {

        
        // local
        local_truckColor: 'Red',
        local_lastPoop: '12/19/2022',
        // external
        person_firstName: 'Billy',
        person_lastName: 'Joel',
        friend_birthday: '01/22/1987',
        friend_friends: [1],
        gamer_bestGame: 'Minecraft',
      },
      // See's that <Person> exists on both <Gamer> and <Friend> at the top level so it's fields are not duplicated
      implements: [FriendDatabase, GamerDatabase],
    },
  },
  {
    id: 3,
    title: 'Best Friend 1',
    metadata: {
      values: {
        // external
        person_firstName: 'Timmy',
        person_lastName: 'Doodle',
        friend_birthday: '05/09/1990',
        friend_friends: [1, 2],
        bestfriend_favoriteColor: 'Green',
      },
      implements: [BestFriendDatabase],
    },
  },
  {
    id: 4,
    title: 'Project 1',
    metadata: {
      values: {
        // external
        project_name: 'Cool Thing',
        // Can implement 'Friend' notes since it extends Person
        // Search ex.
        // Find Person schema, then recursively search all nested extensions to find eligible databases and implemented notes
        //      Person
        //     /       \
        //  Friend    Gamer
        //    |
        //  Best Friend
        project_members: [1, 2, 3],
      },
      implements: [ProjectDatabase],
    },
  },
];

// Dec 8: I rode in my friend @Sage's car to @Batman

// Dec 9: I drove my @Chevy to go see @Ironman


/**
 *             Car                    Engine
 *   CarBrand   |   Engine          /      \
 *       \      |    /     ElectricEngine    GasEngine
*           CarModel
*        
      
 * s
 */

const ElectricEngine = {
  watts: number,
}

const GasEngine = {
  gallons: number,
}


const Car = {
  engine: Engine,
};

const CarBrand = {
  name: string,
}

const CarModel = {
  brand: CarBrand, // can mark filterable field of engine, so only shows electric engines if electric brand
  name: string,
  // if brand = tesla, filter by electric engines 
}

const carNotes = [
  {
    id: 1,
    metadata: {
      values: {
        car_engine: 'GasGuzzler4000', // selected from list of gas engines since brand = toyota
        carmodel_brand: 'Toyota',
        carmodel_name: 'Rav 4',
      },
      implements: [CarModel],
    },
  },
],






const TestNote = {
  metadata: {
    values: {
      local: {
        'columnId': ''
      },
      'tableId': {
        'columnId': '',
      },
    },
    schema: {
      'columnId': {
        name: ''
      }
    },
    implements: ['tableId']
  }
}
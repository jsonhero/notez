import * as path from 'path';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { ApiModule } from './api';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ApiModule,
    MongooseModule.forRoot('mongodb://localhost/note-1'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: path.join(__dirname, './schema.gql'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

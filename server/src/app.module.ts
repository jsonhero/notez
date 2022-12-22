import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

import { ApiModule } from './api';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ApiModule,
    MongooseModule.forRoot('mongodb://localhost/note-1'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

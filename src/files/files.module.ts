import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typefiles } from './entities/files.entity';
import { filesController } from './files.controller';
import { FilesServices } from './files.service';

@Module({
  controllers: [filesController],
  providers: [FilesServices],
  imports: [TypeOrmModule.forFeature([typefiles])],
})
export class FilesModule {}

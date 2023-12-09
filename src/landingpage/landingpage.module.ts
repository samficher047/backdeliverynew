import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandingDataController } from './landingpage.controller';
import { LandingDataService } from './landingpage.service';
import { landingdata } from './entities/landingdata.entity';

@Module({
  controllers: [LandingDataController],
  providers: [LandingDataService],
  imports: [TypeOrmModule.forFeature([landingdata])],
})
export class LandingDataModule {}

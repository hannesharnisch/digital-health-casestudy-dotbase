import { Module } from '@nestjs/common';
import { KPIController } from './kpi.controller';
import { KPIService } from './kpi.service';

@Module({
  imports: [],
  controllers: [KPIController],
  providers: [KPIService],
})
export class AppModule {}

import { Controller, Get, Param, Query } from '@nestjs/common';
import { KPIService } from './kpi.service';
import KPIType, { KPIid } from './KPIModel/Type';
import KPI from './KPIModel/KPI';

@Controller()
export class KPIController {
  constructor(private readonly kpiService: KPIService) {}

  @Get('/kpi/types')
  getKPITypes(): KPIType[] {
    return this.kpiService.getTypes();
  }

  @Get('/kpi/:id')
  async getKPI(
    @Param('id') id: KPIid,
    @Query('start') startTime?: string,
    @Query('end') endTime?: string,
  ): Promise<KPI> {
    return this.kpiService.getKPI(id, startTime || '2024-2-10', endTime);
  }
}

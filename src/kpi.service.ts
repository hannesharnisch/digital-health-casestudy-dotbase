import { Injectable } from '@nestjs/common';
import KPIAggregatorRegistry from './KPIRegistry';
import KPIType, { KPIid } from './KPIModel/Type';

@Injectable()
export class KPIService {
  getTypes(): KPIType[] {
    return KPIAggregatorRegistry.getKPITypes();
  }

  getKPI(id: KPIid, startTime: string, endTime?: string) {
    return KPIAggregatorRegistry.createInstance(id).calculate({
      start: startTime,
      end: endTime,
    });
  }
}

import KPIAggregator from './KPIAggregator';
import KPIType, { KPIid } from '../KPIModel/Type';
import data from '../assets/sample_data/Revenue/exampleRevenueAPIResponse.json';
import KPIOrganizationReference from '../KPIModel/OrganizationReference';
import KPI from '../KPIModel/KPI';
import KPIPeriod from '../KPIModel/Period';

class RevenueAggregator implements KPIAggregator {
  public getType(): KPIType {
    return {
      id: KPIid.Revenue,
      name: 'Total Revenue',
    };
  }

  public calculate(period: KPIPeriod): KPI {
    const periodRevenues: PeriodRevenue[] = [];
    data.sales_data.forEach((elem: any) => {
      periodRevenues.push({
        start: data.start_date,
        end: data.end_date,
        departmentId: elem.departmentId,
        department: elem.department,
        revenue: elem.sales,
      });
    });

    return KPI.createKPI(
      {
        id: KPIid.Revenue,
        name: 'Total Revenue',
      },
      {
        value: periodRevenues.reduce((acc, elem) => acc + elem.revenue, 0),
        unit: 'euros',
      },
      new KPIOrganizationReference('1', 'Example Hospital'),
      period,
      { performer: [new KPIOrganizationReference('121', 'Dotbase')] },
    );
  }
}

interface PeriodRevenue {
  start: string;
  end: string;
  departmentId: string;
  department: string;
  revenue: number;
}

export default RevenueAggregator;

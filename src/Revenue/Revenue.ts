import KPI from '../KPIModel/KPI';
import KPIOrganizationReference from '../KPIModel/OrganizationReference';
import KPIPeriod from '../KPIModel/Period';
import { KPIid } from '../KPIModel/Type';
import data from '../assets/sample_data/Revenue/exampleRevenueAPIResponse.json';

interface PeriodRevenue {
  start: string;
  end: string;
  departmentId: string;
  department: string;
  revenue: number;
}

export function demonstrateRevenue() {
  const parsedData = data;
  // Create PeriodRevenue Objects
  const periodRevenues: PeriodRevenue[] = [];
  parsedData.sales_data.forEach((elem: any) => {
    periodRevenues.push({
      start: parsedData.start_date,
      end: parsedData.end_date,
      departmentId: elem.departmentId,
      department: elem.department,
      revenue: elem.sales,
    });
  });

  const dotbasePerformerOption = {
    performer: [new KPIOrganizationReference('121', 'Dotbase')],
  };

  const totalRevenueKPI = KPI.createKPI(
    {
      id: KPIid.Revenue,
      name: 'Total Revenue',
    },
    {
      value: periodRevenues.reduce((acc, elem) => acc + elem.revenue, 0),
      unit: 'euros',
    },
    new KPIOrganizationReference('1', 'Example Hospital'),
    new KPIPeriod(periodRevenues[0].start, periodRevenues[0].end),
    dotbasePerformerOption,
  );

  // Create KPIs
  const departmentKPIs: KPI[] = [];
  periodRevenues.forEach((elem) => {
    departmentKPIs.push(
      KPI.createKPI(
        {
          id: KPIid.Revenue,
          name: `Department Revenue: ${elem.department}`,
        },
        {
          value: elem.revenue,
          unit: 'euros',
        },
        new KPIOrganizationReference(elem.departmentId, elem.department),
        new KPIPeriod(elem.start, elem.end),
        dotbasePerformerOption,
      ),
    );
  });
  return {
    total: totalRevenueKPI,
    departments: departmentKPIs,
  };
}

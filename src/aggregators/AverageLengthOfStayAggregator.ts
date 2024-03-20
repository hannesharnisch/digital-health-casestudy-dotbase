import { Encounter } from 'fhir/r4';
import KPI from '../KPIModel/KPI';
import KPIPeriod from '../KPIModel/Period';
import { calculateAverage, getDaysDifference } from '../utils';
import KPIOrganizationReference from '../KPIModel/OrganizationReference';
import KPIAggregator from './KPIAggregator';
import KPIType, { KPIid } from '../KPIModel/Type';
import data from '../assets/sample_data/AverageLengthOfStay/encounters.json';
class AverageLengthOfStayAggregator implements KPIAggregator {
  public getType(): KPIType {
    return {
      id: KPIid.AverageLengthOfStay,
      name: 'Average Length of Stay',
    };
  }

  public calculate(period: KPIPeriod): KPI {
    const IMPEncounter: Encounter[] = data as Encounter[]; // Gets dummy encounters with status finished and class IMP

    const daysOfStay = IMPEncounter.map((elem) => {
      if (elem.period?.start === undefined || elem.period?.end === undefined) {
        return null;
      }
      return getDaysDifference(
        new Date(elem.period?.start),
        new Date(elem.period?.end),
      );
    });

    const cleanDaysOfStay: number[] = daysOfStay.filter(
      (elem): elem is number => typeof elem === 'number',
    );

    const avg = calculateAverage(cleanDaysOfStay);

    return KPI.createKPI(
      this.getType(),
      {
        value: avg,
        unit: 'days',
      },
      new KPIOrganizationReference('1', 'Example Hospital'),
      period,
      { performer: [new KPIOrganizationReference('121', 'Dotbase')] },
    );
  }
}

export default AverageLengthOfStayAggregator;

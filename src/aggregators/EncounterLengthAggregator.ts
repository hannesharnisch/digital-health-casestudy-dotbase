import { Encounter } from 'fhir/r4';
import KPI from '../KPIModel/KPI';
import KPIPeriod from '../KPIModel/Period';
import KPIType, { KPIid } from '../KPIModel/Type';
import KPIAggregator from './KPIAggregator';
import { calculateAverage } from '../utils';
import KPIOrganizationReference from '../KPIModel/OrganizationReference';
import data from '../assets/sample_data/EncounterLength/encounters.json';
import KPIReferenceRange, { RangeCodings } from 'src/KPIModel/ReferenceRange';

class EncounterLengthAggregator implements KPIAggregator {
  public getType(): KPIType {
    return {
      id: KPIid.EncounterLength,
      name: 'Encounter Length',
    };
  }

  public calculate(period: KPIPeriod): KPI {
    const sampleEncounters: Encounter[] = data as Encounter[];
    const durations = sampleEncounters.map((elem) => {
      return elem.length?.value;
    });
    const cleanDurations: number[] = durations.filter(
      (elem): elem is number => typeof elem === 'number',
    );

    const avg = calculateAverage(cleanDurations);

    return KPI.createKPI(
      this.getType(),
      {
        value: avg,
        unit: 'minutes',
      },
      new KPIOrganizationReference('1', 'Example Hospital'),
      period,
      {
        performer: [new KPIOrganizationReference('121', 'Dotbase')],
        referenceRange: [
          new KPIReferenceRange(
            RangeCodings.range,
            { value: 0, unit: 'minutes' },
            undefined,
          ),
        ],
      },
    );
  }
}

export default EncounterLengthAggregator;

import { Bundle, CodeableConcept, Observation, Reference } from 'fhir/r4';
import KPI from '../KPIModel/KPI';
import KPIPeriod from '../KPIModel/Period';
import KPIType, { KPIid } from '../KPIModel/Type';
import KPIAggregator from './KPIAggregator';
import { dataToBundle } from '../Bundle';
import KPIOrganizationReference from '../KPIModel/OrganizationReference';
import data from '../assets/sample_data/PatientSatisfaction/samplePatientSatisfactionBundle.fhir.json';
import KPIReferenceRange, { RangeCodings } from 'src/KPIModel/ReferenceRange';
class PatientSatisfactionAggregator implements KPIAggregator {
  getType(): KPIType {
    return {
      id: KPIid.PatientSatisfaction,
      name: 'Patient Satisfaction',
    };
  }
  calculate(period: KPIPeriod): KPI {
    console.log(data);
    const searchBundle = dataToBundle(data);
    if (searchBundle == null) {
      throw Error('Dummy Bundle could not be loaded');
    }
    const extractedResults = extractQuestionnaireObservations(
      searchBundle,
    ) as SatisfactionObservation[];
    const average =
      (calculateAverageSatisfaction(extractedResults) /
        extractQuestionnaireMaxScore(extractedResults)) *
      100;

    return KPI.createKPI(
      this.getType(),
      {
        value: average,
        unit: 'percent',
      },
      new KPIOrganizationReference('1111'),
      period,
      {
        performer: [new KPIOrganizationReference('121', 'Dotbase')],
        referenceRange: [
          new KPIReferenceRange(
            RangeCodings.range,
            {
              value: 0,
            },
            {
              value: 100,
            },
          ),
          new KPIReferenceRange(
            RangeCodings.target,
            {
              value: 100,
            },
            undefined,
          ),
          new KPIReferenceRange(
            RangeCodings.baseline,
            {
              value: 76,
            },
            undefined,
            'Baseline calculated by causal impact analysis',
          ),
        ],
      },
    );
  }
}

/**
 * Example Class for Observations of patient satisfaction questionnaires
 */
interface SatisfactionObservation extends Observation {
  id: string;
  status:
    | 'registered'
    | 'preliminary'
    | 'final'
    | 'amended'
    | 'corrected'
    | 'cancelled'
    | 'entered-in-error'
    | 'unknown';
  code: CodeableConcept;
  subject: Reference;
  encounter: Reference;
  effectiveDateTime: string;
  component: { code: CodeableConcept; valueInteger: number }[];
}

export default PatientSatisfactionAggregator;
/**
 * Calculates patient satisfaction average of given observations
 * @param observations
 */
function calculateAverageSatisfaction(observations: SatisfactionObservation[]) {
  const sum = observations.reduce(
    (acc, elem) => acc + elem.component[0].valueInteger,
    0,
  );
  return sum / observations.length;
}

function extractQuestionnaireObservations(bundle: Bundle) {
  return bundle.entry?.map((elem) => {
    return elem.resource;
  });
}

function extractQuestionnaireMaxScore(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  observations: SatisfactionObservation[],
): number {
  return 5;
}

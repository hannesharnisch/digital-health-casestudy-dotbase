import { Bundle, CodeableConcept, Observation, Reference } from 'fhir/r4';
import KPI from '../KPIModel/KPI';
import KPIPeriod from '../KPIModel/Period';
import KPIType, { KPIid } from '../KPIModel/Type';
import KPIAggregator from './KPIAggregator';
import { dataToBundle } from '../Bundle';
import KPIOrganizationReference from '../KPIModel/OrganizationReference';
import data from '../assets/sample_data/PatientSatisfaction/samplePatientSatisfactionBundle.fhir.json';
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
    const average = calculateAverageSatisfaction(extractedResults);

    return KPI.createKPI(
      this.getType(),
      {
        value: average,
        unit: 'Points',
      },
      new KPIOrganizationReference('1111'),
      period,
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

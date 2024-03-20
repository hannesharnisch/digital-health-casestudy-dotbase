import KPIType, { KPIid } from '../KPIModel/Type';
import DivideAggregator from './DivideAggregator';
import EncounterLengthAggregator from './EncounterLengthAggregator';
import PatientSatisfactionAggregator from './PatientSatisfactionAggregator';

class EncounterLengthAndPatientSatisfactionAggregator extends DivideAggregator {
  public getType(): KPIType {
    return {
      id: KPIid.EncounterLengthAndPatientSatisfaction,
      name: 'Encounter Length and Patient Satisfaction',
    };
  }
  protected dividend = new EncounterLengthAggregator();
  protected divisor = new PatientSatisfactionAggregator();
}

export default EncounterLengthAndPatientSatisfactionAggregator;

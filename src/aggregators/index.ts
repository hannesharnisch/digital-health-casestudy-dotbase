import AverageLengthOfStay from './AverageLengthOfStayAggregator';
import EncounterLength from './EncounterLengthAggregator';
import EncounterLengthAndPatientSatisfaction from './EncounterLengthAndPatientSatisfactionAggregator';
import KPIAggregator from './KPIAggregator';
import PatientSatisfaction from './PatientSatisfactionAggregator';

export default [
  AverageLengthOfStay,
  EncounterLength,
  PatientSatisfaction,
  EncounterLengthAndPatientSatisfaction,
] as (new () => KPIAggregator)[];

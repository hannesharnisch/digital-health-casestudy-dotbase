import AverageLengthOfStay from './AverageLengthOfStayAggregator';
import EncounterLength from './EncounterLengthAggregator';
import EncounterLengthAndPatientSatisfaction from './EncounterLengthAndPatientSatisfactionAggregator';
import KPIAggregator from './KPIAggregator';
import PatientSatisfaction from './PatientSatisfactionAggregator';
import RevenueAggregator from './RevenueAggregator';

export default [
  AverageLengthOfStay,
  EncounterLength,
  PatientSatisfaction,
  EncounterLengthAndPatientSatisfaction,
  RevenueAggregator,
] as (new () => KPIAggregator)[];

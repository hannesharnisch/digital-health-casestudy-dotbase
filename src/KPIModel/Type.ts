export enum KPIid {
  AverageLengthOfStay = 'AverageLengthOfStay',
  EncounterLength = 'EncounterLength',
  PatientSatisfaction = 'PatientSatisfaction',
  EncounterLengthAndPatientSatisfaction = 'EncounterLengthAndPatientSatisfaction',
  Revenue = 'Revenue',
}

interface KPIType {
  id: KPIid;
  name: string;
}

export default KPIType;

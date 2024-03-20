import { CodeableConcept, ObservationReferenceRange, Quantity } from 'fhir/r4';

class KPIReferenceRange implements ObservationReferenceRange {
  age?: undefined;
  high?: Quantity | undefined;
  low?: Quantity | undefined;
  text?: string | undefined;
  type: CodeableConcept;

  constructor(
    type: CodeableConcept,
    low: Quantity | undefined,
    high: Quantity | undefined,
    description?: string,
  ) {
    this.type = type;
    this.low = low;
    this.high = high;
    description ? (this.text = description) : null;
  }
}

export default KPIReferenceRange;

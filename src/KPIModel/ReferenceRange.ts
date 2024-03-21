import { CodeableConcept, ObservationReferenceRange, Quantity } from 'fhir/r4';

export class RangeCodings implements CodeableConcept {
  coding: { code: string; display: string }[];
  private constructor(code: string, display: string) {
    this.coding = [{ code, display }];
  }
  static range: RangeCodings = new RangeCodings('range', 'Range');
  static baseline: RangeCodings = new RangeCodings('baseline', 'Baseline');
  static target: RangeCodings = new RangeCodings('target', 'Target');
}

class KPIReferenceRange implements ObservationReferenceRange {
  age?: undefined;
  high?: Quantity | undefined;
  low?: Quantity | undefined;
  text?: string | undefined;
  type: RangeCodings;

  constructor(
    type: RangeCodings,
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

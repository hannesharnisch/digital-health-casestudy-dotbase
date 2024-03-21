import { CodeableConcept, Observation, Quantity, Reference } from 'fhir/r4';
import KPIType from './Type';
import KPIOrganizationReference from './OrganizationReference';
import KPIPeriod from './Period';
import KPIReferenceRange from './ReferenceRange';

/**
 * This interface is only necessary for the static createKPI method
 */
interface KPICreatorOptions {
  performer?: Reference[] | undefined;
  dataAbsentReason?: CodeableConcept | undefined;
  referenceRange?: KPIReferenceRange[] | undefined;
}

interface KPIProperties {
  code: CodeableConcept;
  focus: KPIOrganizationReference[];
  effectivePeriod: KPIPeriod;
}

interface KPIOptions {
  performer?: Reference[] | undefined;
  dataAbsentReason?: CodeableConcept | undefined;
  referenceRange?: KPIReferenceRange[] | undefined;
  valueQuantity?: Quantity | undefined;
}

class KPI implements Observation {
  readonly resourceType = 'Observation';
  readonly status = 'final';
  readonly category: CodeableConcept[] = [{ coding: [{ display: 'KPI' }] }];
  basedOn?: undefined; // property should not be set
  code: CodeableConcept;
  partOf?: undefined; // property should not be set
  subject: undefined; // property should not be set
  focus: KPIOrganizationReference[];
  encounter?: undefined; // property should not be set
  effectivePeriod: KPIPeriod;
  performer?: Reference[] | undefined;
  valueQuantity?: Quantity | undefined;
  valueCodeableConcept?: undefined; // .value[x] of Observation must be valueQuantity
  valueString?: undefined; // .value[x] of Observation must be valueQuantity
  valueBoolean?: undefined; // .value[x] of Observation must be valueQuantity
  valuePeriod?: undefined; // .value[x] of Observation must be valueQuantity
  valueDateTime?: undefined; // .value[x] of Observation must be valueQuantity
  valueInteger?: undefined; // .value[x] of Observation must be valueQuantity
  valueRange?: undefined; // .value[x] of Observation must be valueQuantity
  valueRatio?: undefined; // .value[x] of Observation must be valueQuantity
  valueTime?: undefined; // .value[x] of Observation must be valueQuantity
  valueSampledData?: undefined; // .value[x] of Observation must be valueQuantity
  dataAbsentReason?: CodeableConcept | undefined;
  bodySite?: undefined; // property should not be set
  specimen?: undefined; // property should not be set
  device?: undefined; // property should not be set
  referenceRange?: KPIReferenceRange[] | undefined;
  component?: undefined; // property should not be set

  constructor(props: KPIProperties, options: KPIOptions) {
    // Validation: dataAbsentReason Rule
    if (
      options.valueQuantity === undefined &&
      options.dataAbsentReason === undefined
    ) {
      throw Error(
        'To create a KPI Object, either a valueQuantity or a dataAbsentReason must be provided in "options" argument of the constructor',
      );
    }

    // mandatory values
    this.code = props.code;
    this.focus = props.focus;
    this.effectivePeriod = props.effectivePeriod;

    // optional values
    for (const key of Object.keys(options)) {
      this[key] = options[key];
    }
  }

  static createKPI(
    kpiType: KPIType,
    value: Quantity,
    referedOrganization: KPIOrganizationReference,
    period: KPIPeriod,
    options?: KPICreatorOptions,
  ) {
    const kpiCode: CodeableConcept = {
      coding: [{ code: kpiType.id, display: kpiType.name }],
    };

    return new KPI(
      {
        code: kpiCode,
        focus: [referedOrganization],
        effectivePeriod: period,
      },
      {
        valueQuantity: value,
        ...options,
      },
    );
  }
}

export default KPI;

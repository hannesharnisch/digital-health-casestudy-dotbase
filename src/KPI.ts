import {CodeableConcept, Observation, ObservationReferenceRange, Period, Quantity, Reference} from "fhir/r4";

interface KPIIdentifier {
    id: string,
    name: string
}

interface KPIOptions {
    performer?: Reference[] | undefined;
    dataAbsentReason?: CodeableConcept | undefined;
    referenceRange?: KPIReferenceRange[] | undefined;
}
export class KPIPeriod implements Period {
    start: string;
    end?: string | undefined;

    constructor(start: string, end?: string | undefined) {
        this.start = start
        this.end = end
    }
}

class KPIReferenceRange implements ObservationReferenceRange {
    age?: undefined;
    high?: Quantity | undefined;
    low?: Quantity | undefined;
    text?: string | undefined;
    type: CodeableConcept;

    constructor(type: CodeableConcept, low: Quantity | undefined, high: Quantity | undefined, description?: string) {
        this.type = type
        this.low = low
        this.high = high
        description ? this.text = description : null
    }
}

export class KPIOrganizationReference implements Reference {
    reference: string;
    display: string | undefined;
    type: string;
    constructor(orgId: string, orgName?: string) {
        this.reference = `Organization/${orgId}`
        this.display = orgName
        this.type = 'Organization'
    }

}

export class KPI implements Observation {
    readonly resourceType = 'Observation';
    readonly status = 'final';
    readonly category: CodeableConcept[] =  [{"coding": [{"display": "KPI"}]}]
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

    constructor(inputObject: any) {
        this.code = inputObject.code
        this.focus = inputObject.focus
        this.effectivePeriod = new KPIPeriod(inputObject.effectivePeriod.start, inputObject.effectivePeriod.end)

        for (const key of Object.keys(inputObject)) {
            if (['code', 'subject', 'category', 'effectivePeriod'].includes(key)){
                continue
            }
            // @ts-ignore
            this[key] = inputObject[key]
        }
    }

    static createKPI(kpiIdentifier: KPIIdentifier, value: Quantity, referedOrganization: KPIOrganizationReference, period: KPIPeriod, options?: KPIOptions){
        const kpiCode: CodeableConcept = {coding: [{code: kpiIdentifier.id, display: kpiIdentifier.name}]}

        return new KPI({
            code: kpiCode,
            focus: [referedOrganization],
            effectivePeriod: period,
            valueQuantity: value,
            ...options
        })
    }

}
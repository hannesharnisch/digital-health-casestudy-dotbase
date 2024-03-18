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
    basedOn?: undefined;
    code: CodeableConcept;
    partOf?: undefined;
    subject: undefined;
    focus: KPIOrganizationReference[];
    encounter?: undefined;
    effectivePeriod: KPIPeriod;
    performer?: Reference[] | undefined;
    valueQuantity?: Quantity | undefined;
    valueCodeableConcept?: undefined; // .value must be quantity
    valueString?: undefined; // .value must be quantity
    valueBoolean?: undefined; // .value must be quantity
    valuePeriod?: undefined; // .value must be quantity
    valueDateTime?: undefined; // .value must be quantity
    valueInteger?: undefined; // .value must be quantity
    valueRange?: undefined; // .value must be quantity
    valueRatio?: undefined; // .value must be quantity
    valueTime?: undefined; // .value must be quantity
    valueSampledData?: undefined; // .value must be quantity
    dataAbsentReason?: CodeableConcept | undefined;
    bodySite?: undefined;
    specimen?: undefined;
    device?: undefined;
    referenceRange?: KPIReferenceRange[] | undefined;
    component?: undefined;

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
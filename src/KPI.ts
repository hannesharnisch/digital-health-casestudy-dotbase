import {CodeableConcept, Observation, ObservationReferenceRange, Period, Quantity, Reference} from "fhir/r4";

interface KPIOptions {
    performer?: Reference[] | undefined;
    dataAbsentReason?: CodeableConcept | undefined;
    referenceRange?: KPIReferenceRange[] | undefined;
}
export class KPIPeriod implements Period {
    start: string;
    end: string | undefined;

    constructor(start: string, end: string | undefined) {
        this.start = start
        this.end = end
    }
}

class KPIReferenceRange implements ObservationReferenceRange {
    age?: undefined;
    high?: Quantity | undefined;
    low: Quantity;
    text?: string;

    constructor(description: string, low: Quantity, high: Quantity | undefined) {
        this.text = description
        this.low = low
        this.high = high
    }
}

export class OrganizationReference implements Reference {
    reference: string
    display: string | undefined;
    constructor(orgId: string, orgName?: string) {
        this.reference = `Organization/${orgId}`
        this.display = orgName
    }

}

export class KPI implements Observation {
    readonly resourceType = 'Observation';
    readonly status = 'final';
    readonly category: CodeableConcept[] =  [{"coding": [{"display": "KPI"}]}]
    basedOn?: undefined;
    code: CodeableConcept;
    partOf?: undefined;
    subject: Reference;
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
        this.subject = inputObject.subject
        this.effectivePeriod = new KPIPeriod(inputObject.effectivePeriod.start, inputObject.effectivePeriod.end)

        for (const key of Object.keys(inputObject)) {
            if (['code', 'subject', 'category', 'effectivePeriod'].includes(key)){
                continue
            }
            // @ts-ignore
            this[key] = inputObject[key]
        }
    }

    static createKPI(kpiName: string, value: Quantity, referedOrganization: OrganizationReference, period: KPIPeriod, options?: KPIOptions){
        const kpiCode: CodeableConcept = {"coding": [{"display": kpiName}]}

        return new KPI({
            code: kpiCode,
            subject: referedOrganization,
            effectivePeriod: period,
            ...options
        })
    }

}
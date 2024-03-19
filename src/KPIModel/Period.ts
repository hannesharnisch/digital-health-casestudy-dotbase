import { Period } from "fhir/r4";


class KPIPeriod implements Period {
    start: string;
    end?: string | undefined;

    constructor(start: string, end?: string | undefined) {
        this.start = start
        this.end = end
    }
}

export default KPIPeriod
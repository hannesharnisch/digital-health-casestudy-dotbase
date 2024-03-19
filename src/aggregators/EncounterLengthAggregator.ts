import { Encounter } from "fhir/r4";
import KPI from "../KPIModel/KPI";
import KPIPeriod from "../KPIModel/Period";
import KPIType, { KPIid } from "../KPIModel/Type";
import KPIAggregator from "./KPIAggregator";
import { calculateAverage, getDaysDifference, readFHIRResourceList } from "../utils";
import KPIOrganizationReference from "../KPIModel/OrganizationReference";


class EncounterLengthAggregator implements KPIAggregator {
    public getType(): KPIType {
        return {
            id: KPIid.EncounterLength,
            name: "Encounter Length"
        }
    }

    public calculate(period: KPIPeriod): KPI {
        const sampleEncounters: Encounter[] = readFHIRResourceList("./assets/sample_data/EncounterLength/encounters.json")
        const durations = sampleEncounters.map((elem) => {
            return elem.length?.value
        })
        const cleanDurations: number[] = durations.filter(
            (elem): elem is number => typeof elem === 'number'
        )

        const avg = calculateAverage(cleanDurations)

        return KPI.createKPI(
            this.getType(),
            {
                value: avg,
                unit: "minutes"
            },
            new KPIOrganizationReference("1", "Example Hospital"),
            new KPIPeriod("2024-03-01", "2024-03-31"),
            { performer: [new KPIOrganizationReference('121', 'Dotbase')] }
        )
    }
}

export default EncounterLengthAggregator;
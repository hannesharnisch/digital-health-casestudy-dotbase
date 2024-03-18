import {Encounter} from "fhir/r4";
import {calculateAverage, readJson} from "../utils";
import {KPI, KPIOrganizationReference, KPIPeriod} from "../KPI";

export function demonstrateEncounterLength(jsonPath: string) {
    const sampleEncounters = getSampleEncounters(jsonPath)
    const durations = sampleEncounters.map((elem) => {
        return elem.length?.value
    })
    const cleanDurations: number[] = durations.filter(
        (elem): elem is number => typeof elem === 'number'
    )

    const avg = calculateAverage(cleanDurations)

    return KPI.createKPI(
        {
            id: "6",
            name: "Average Length Of Encounter"
        },
        {
            value: avg,
            unit: "minutes"
        },
        new KPIOrganizationReference("1", "Example Hospital"),
        new KPIPeriod("2024-03-01", "2024-03-31"),
        { performer: [new KPIOrganizationReference('121', 'Dotbase')] }
    )
}

function getSampleEncounters(jsonPath: string): Encounter[] {
    const json = readJson(jsonPath)
    return json.map((elem: any) => {
        return elem as Encounter
    })
}
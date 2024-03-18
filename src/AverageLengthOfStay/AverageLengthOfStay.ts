import {Encounter} from "fhir/r4";
import {KPI, KPIPeriod, KPIOrganizationReference} from "../KPI";
import {calculateAverage, readJson} from "../utils";


export function demonstrateAverageLengthOfStayKPI(jsonPath: string) : KPI {
    const IMPEncounter : Encounter[] = getEncounters(jsonPath) // Gets encounters with status finished and class IMP

    const daysOfStay = IMPEncounter.map((elem) => {
        if (elem.period?.start === undefined || elem.period?.end === undefined) {
            return null
        }
        return getDaysDifference(new Date(elem.period?.start), new Date(elem.period?.end))
    })

    const cleanDaysOfStay: number[] = daysOfStay.filter(
        (elem): elem is number => typeof elem === 'number'
    );


    const avg = calculateAverage(cleanDaysOfStay)

    return KPI.createKPI(
    {
            id: "1",
            name: "Average Length Of Stay"
        },
        {
            value: avg,
            unit: "days"
        },
        new KPIOrganizationReference("1", "Example Hospital"),
        new KPIPeriod("2024-03-01"),
{ performer: [new KPIOrganizationReference('121', 'Dotbase')] }
    )
}

function getEncounters(jsonPath: string) : Encounter[] {
    const data = readJson(jsonPath)
    return data.map((elem: any) => {return elem as Encounter})
}

function getDaysDifference(date1: Date, date2: Date) {
    const date1Time = date1.getTime();
    const date2Time = date2.getTime();
    const timeDifference = Math.abs(date2Time - date1Time);
    return  Math.ceil(timeDifference / (1000 * 3600 * 24));
}
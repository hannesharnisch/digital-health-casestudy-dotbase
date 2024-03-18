import {patientSatisfactionDemonstration} from "../PatientSatisfaction/PatientSatisfaction";
import {demonstrateEncounterLength} from "../EncounterLength/EncounterLength";
import {KPI, KPIOrganizationReference, KPIPeriod} from "../KPI";

export function demonstrateElAPSKPI(encountersJsonPath: string, psJsonPaht: string) {
    const psKPI = patientSatisfactionDemonstration(psJsonPaht)
    const encounterLengthKPI = demonstrateEncounterLength(encountersJsonPath)

    if (psKPI.valueQuantity?.value === undefined || encounterLengthKPI.valueQuantity?.value === undefined) {
        throw Error('Data of KPIs is inconsistent')
    }

    const ratio = psKPI.valueQuantity?.value / psKPI.valueQuantity?.value

    return KPI.createKPI(
        {
            id: "7",
            name: "Patient Satisfaction and average length of stay ratio"
        },
        {
            value: ratio
        },
        new KPIOrganizationReference("1", "Example Hospital"),
        new KPIPeriod("2024-03-01", "2024-03-31"),
        { performer: [new KPIOrganizationReference('121', 'Dotbase')] }
    )
}
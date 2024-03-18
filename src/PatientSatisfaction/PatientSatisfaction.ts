import {jsonToBundle} from "../Bundle";
import {Bundle, CodeableConcept, Observation, Reference} from "fhir/r4";
import {KPI, KPIPeriod, KPIOrganizationReference} from "../KPI";

/**
 * Example Class for Observations of patient satisfaction questionnaires
 */
interface SatisfactionObservation extends Observation {
    id: string
    status: ('registered'|'preliminary'|'final'|'amended'|'corrected'|'cancelled'|'entered-in-error'|'unknown')
    code: CodeableConcept
    subject: Reference
    encounter: Reference
    effectiveDateTime: string
    component: {code: CodeableConcept, valueInteger: number}[]
}

/**
 * Calculates patient satisfaction average of given observations
 * @param observations
 */
function calculateAverageSatisfaction(observations: SatisfactionObservation[]) {
    const sum = observations.reduce((acc, elem) => acc + elem.component[0].valueInteger, 0)
    return sum / observations.length
}

/**
 * This funciton simulates a FHIR Rest-Api call and return a bundle
 * of observations which have a specific code and are in a specific period
 * The REST call for such a result would be: http://hapi.fhir.org/baseR4/Observation?date=ge<start-date>&date=le<end-date>&code=<code-of-questionnaire-response>
 */
function dummyRestFHIRApiCall(jsonPath: string): Bundle | null{
    return jsonToBundle(jsonPath)
}

function extractQuestionnaireObservations(bundle: Bundle) {
    return bundle.entry?.map((elem) => {
        return elem.resource
    })
}

export function patientSatisfactionDemonstration(jsonPath: string){
    const searchBundle = dummyRestFHIRApiCall(jsonPath)
    if (searchBundle == null){
        throw Error('Dummy Bundle could not be loaded')
    }
    const extractedResults = extractQuestionnaireObservations(searchBundle) as SatisfactionObservation[]
    const average = calculateAverageSatisfaction(extractedResults)

    return KPI.createKPI(
        {
            id: "2",
            name: "Patient satisfaction KPI"
        },
        {
            value: average,
            unit: "Points"
        },
        new KPIOrganizationReference("1111"),
        new KPIPeriod("2024-03-17")
    )
}


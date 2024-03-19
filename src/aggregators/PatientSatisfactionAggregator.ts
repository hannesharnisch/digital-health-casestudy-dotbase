import { Bundle, CodeableConcept, Observation, Reference } from "fhir/r4";
import KPI from "../KPIModel/KPI";
import KPIPeriod from "../KPIModel/Period";
import KPIType, { KPIid } from "../KPIModel/Type";
import KPIAggregator from "./KPIAggregator";
import { jsonToBundle } from "../Bundle";
import KPIOrganizationReference from "../KPIModel/OrganizationReference";


class PatientSatisfactionAggregator implements KPIAggregator {
    getType(): KPIType {
        return {
            id: KPIid.PatientSatisfaction,
            name: "Patient Satisfaction"
        }
    }
    calculate(period: KPIPeriod): KPI {
        const searchBundle = dummyRestFHIRApiCall('./assets/sample_data/PatientSatisfaction/samplePatientSatisfactionBundle.fhir.json')
        if (searchBundle == null){
            throw Error('Dummy Bundle could not be loaded')
        }
        const extractedResults = extractQuestionnaireObservations(searchBundle) as SatisfactionObservation[]
        const average = calculateAverageSatisfaction(extractedResults)

        return KPI.createKPI(
            this.getType(),
            {
                value: average,
                unit: "Points"
            },
            new KPIOrganizationReference("1111"),
            new KPIPeriod("2024-03-17")
        )
    }
}

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

export default PatientSatisfactionAggregator;
/**
 * Calculates patient satisfaction average of given observations
 * @param observations
 */
function calculateAverageSatisfaction(observations: SatisfactionObservation[]) {
    const sum = observations.reduce((acc, elem) => acc + elem.component[0].valueInteger, 0)
    return sum / observations.length
}

/**
 * This function simulates a FHIR Rest-Api call and return a bundle
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
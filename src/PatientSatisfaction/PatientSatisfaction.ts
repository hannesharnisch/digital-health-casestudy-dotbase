import {jsonToBundle} from "../Bundle";

// TODO

export function test(){
    const b = jsonToBundle("/Users/henry/Desktop/digital-health-casestudy-dotbase/src/PatientSatisfaction/FHIR_data/samplePatientSatisfactionBundle.fhir.json")
    console.log(b)
}


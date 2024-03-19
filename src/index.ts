import {patientSatisfactionDemonstration} from "./PatientSatisfaction/PatientSatisfaction";
import {demonstrateRevenue} from "./Revenue/Revenue";
import {showObject} from "./utils";
import {demonstrateAverageLengthOfStayKPI} from "./AverageLengthOfStay/AverageLengthOfStay";
import {demonstrateEncounterLength} from "./EncounterLength/EncounterLength";
import {demonstrateElAPSKPI} from "./EncounterLengthAndPatientSatisfaction/EncounterLengthAndPatientSatisfaction";

// Patient satisfaction
console.log("Patient Satisfaction KPI:")
console.log(showObject(patientSatisfactionDemonstration('./assets/sample_data/PatientSatisfaction/samplePatientSatisfactionBundle.fhir.json')))

const revenues = demonstrateRevenue("./assets/sample_data/Revenue/exampleRevenueAPIResponse.json")
console.log("\n")
console.log("Total Revenue")
console.log(showObject(revenues.total))
console.log("\n")
console.log("Department Revenue")
revenues.departments.forEach((elem) => {
    console.log(showObject(elem))
})

console.log("\n")
console.log("Average Length Of Stay")
console.log(showObject(demonstrateAverageLengthOfStayKPI("./assets/sample_data/AverageLengthOfStay/encounters.json")))

console.log("\n")
console.log("Average Length Of Encounter")
console.log(showObject(demonstrateEncounterLength("./assets/sample_data/EncounterLength/encounters.json")))

console.log("\n")
console.log("Patient satisfaction and average length of encounter ratio")
console.log(showObject(demonstrateElAPSKPI("./assets/sample_data/EncounterLength/encounters.json", './assets/sample_data/PatientSatisfaction/samplePatientSatisfactionBundle.fhir.json')))

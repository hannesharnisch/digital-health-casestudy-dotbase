import {patientSatisfactionDemonstration} from "./PatientSatisfaction/PatientSatisfaction";
import {demonstrateRevenue} from "./Revenue/Revenue";
import {showObject} from "./utils";

// Patient satisfaction
console.log("Patient Satisfaction KPI:")
console.log(showObject(patientSatisfactionDemonstration('/Users/henry/Desktop/digital-health-casestudy-dotbase/src/PatientSatisfaction/FHIR_data/samplePatientSatisfactionBundle.fhir.json')))

const revenues = demonstrateRevenue("/Users/henry/Desktop/digital-health-casestudy-dotbase/src/Revenue/exampleRevenueAPIResponse.json")
console.log("\n")
console.log("Total Revenue")
console.log(showObject(revenues.total))
console.log("\n")
console.log("Department Revenue")
revenues.departments.forEach((elem) => {
    console.log(showObject(elem))
})

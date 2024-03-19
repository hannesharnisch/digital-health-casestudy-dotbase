import {demonstrateRevenue} from "./Revenue/Revenue";
import {dummyKPIPeriod, showObject} from "./utils";
import aggregators from "./aggregators";
import KPIAggregatorRegistry from "./KPIRegistry";
import { KPIid } from "./KPIModel/Type";


for(const aggregator of aggregators){
    KPIAggregatorRegistry.register(aggregator);
}

// Patient satisfaction
console.log("Patient Satisfaction KPI:")
console.log(showObject(
    KPIAggregatorRegistry.createInstance(KPIid.PatientSatisfaction)?.calculate(dummyKPIPeriod()))
)

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
console.log(showObject(
    KPIAggregatorRegistry.createInstance(KPIid.AverageLengthOfStay)?.calculate(dummyKPIPeriod()))
)

console.log("\n")
console.log("Average Length Of Encounter")
console.log(showObject(
    KPIAggregatorRegistry.createInstance(KPIid.EncounterLength)?.calculate(dummyKPIPeriod()))
)

console.log("\n")
console.log("Patient satisfaction and average length of encounter ratio")
console.log(showObject(
    KPIAggregatorRegistry.createInstance(KPIid.EncounterLengthAndPatientSatisfaction)?.calculate(dummyKPIPeriod()))
)

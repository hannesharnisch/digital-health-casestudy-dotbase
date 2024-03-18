import {readJson} from "../utils";
import {KPI, KPIPeriod, OrganizationReference} from "../KPI";

interface PeriodRevenue {
    start: string
    end: string
    departmentId: string
    department: string
    revenue: number

}

export function demonstrateRevenue(jsonPath: string) {
    const parsedData = readJson(jsonPath)
    // Create PeriodRevenue Objects
    const periodRevenues : PeriodRevenue[] = []
    parsedData.sales_data.forEach((elem: any) => {
        periodRevenues.push({
            start: parsedData.start_date,
            end: parsedData.end_date,
            departmentId: elem.departmentId,
            department: elem.department,
            revenue: elem.sales
        })
    })

    const dotbasePerformerOption = { performer: [new OrganizationReference('121', 'Dotbase')] }

    const totalRevenueKPI = KPI.createKPI(
        {
            id: "4",
            name: "Total Revenue"
        },
        {
            value: periodRevenues.reduce((acc, elem) => acc + elem.revenue, 0),
            unit: "euros"
        },
        new OrganizationReference("1", "Example Hospital"),
        new KPIPeriod(periodRevenues[0].start, periodRevenues[0].end),
        dotbasePerformerOption
    )


    // Create KPIs
    const departmentKPIs : KPI[] = []
    periodRevenues.forEach((elem) => {
        departmentKPIs.push(KPI.createKPI(
            {
                id: "3",
                name: `Department Revenue: ${elem.department}`
            },
            {
                value: elem.revenue,
                unit: "euros"
            },
            new OrganizationReference(elem.departmentId, elem.department),
            new KPIPeriod(elem.start, elem.end),
            dotbasePerformerOption
        ))
    })
    return {
        total: totalRevenueKPI,
        departments: departmentKPIs
    }
}
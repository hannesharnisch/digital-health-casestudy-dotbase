import KPI from '../KPIModel/KPI';
import KPIPeriod from '../KPIModel/Period';
import KPIType from '../KPIModel/Type';

interface KPIAggregator {
  getType(): KPIType;
  calculate(period: KPIPeriod): KPI;
}

export default KPIAggregator;

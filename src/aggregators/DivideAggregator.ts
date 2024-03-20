import KPI from '../KPIModel/KPI';
import KPIPeriod from '../KPIModel/Period';
import KPIType from '../KPIModel/Type';
import KPIAggregator from './KPIAggregator';

abstract class DivideAggregator implements KPIAggregator {
  public abstract getType(): KPIType;
  protected abstract dividend: KPIAggregator;
  protected abstract divisor: KPIAggregator;

  public calculate(period: KPIPeriod): KPI {
    const dividend = this.dividend.calculate(period);
    const divisor = this.divisor.calculate(period);
    //TODO: handle Error by setting data absent reason
    const value =
      dividend.valueQuantity?.value || 1 / (divisor.valueQuantity?.value || 1);
    return KPI.createKPI(
      this.getType(),
      {
        value: value,
        unit: dividend.valueQuantity?.unit + '/' + divisor.valueQuantity?.unit,
      },
      dividend.focus[0],
      period,
    );
  }
}

export default DivideAggregator;

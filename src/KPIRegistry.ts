import KPIType, { KPIid } from "./KPIModel/Type";
import KPIAggregator from "./aggregators/KPIAggregator";

// Create a registry to hold mappings of keys to KPIAggregator subclasses
class KPIAggregatorRegistry {
  private static aggregators: { [key: string]: new () => KPIAggregator } = {};
  private static kpiTypes: KPIType[] = [];

  static register(aggregator: new () => KPIAggregator) {
      const type = new aggregator().getType();
      this.aggregators[type.id] = aggregator;
      this.kpiTypes.push(type);
  }

  static getKPITypes(): KPIType[] {
    return this.kpiTypes;
  }

  static createInstance(key: KPIid): KPIAggregator | undefined {
      const AggregatorClass = this.aggregators[key];
      if (AggregatorClass) {
          return new AggregatorClass();
      }
      return undefined;
  }
}



export default KPIAggregatorRegistry;
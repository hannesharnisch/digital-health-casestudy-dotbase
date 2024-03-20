import KPIPeriod from './KPIModel/Period';

export function showObject(obj: any) {
  return JSON.stringify(obj);
}

export function calculateAverage(arr: number[]) {
  const sum = arr.reduce((acc, elem) => acc + elem, 0);
  return sum / arr.length;
}

export function getDaysDifference(date1: Date, date2: Date) {
  const date1Time = date1.getTime();
  const date2Time = date2.getTime();
  const timeDifference = Math.abs(date2Time - date1Time);
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
}

export function dummyKPIPeriod(): KPIPeriod {
  return new KPIPeriod('2024-03-01');
}

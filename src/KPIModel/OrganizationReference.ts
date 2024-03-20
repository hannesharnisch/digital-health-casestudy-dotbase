import { Reference } from 'fhir/r4';

class KPIOrganizationReference implements Reference {
  reference: string;
  display: string | undefined;
  type: string;

  constructor(orgId: string, orgName?: string) {
    this.reference = `Organization/${orgId}`;
    this.display = orgName;
    this.type = 'Organization';
  }
}

export default KPIOrganizationReference;

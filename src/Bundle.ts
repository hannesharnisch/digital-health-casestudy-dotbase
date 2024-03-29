import {
  Bundle,
  Identifier,
  Signature,
  BundleLink,
  Element,
  BundleEntry,
} from 'fhir/r4';

// Get dummy
class BundleImpl implements Bundle {
  readonly resourceType = 'Bundle';
  entry?: Array<BundleEntry> | undefined;
  identifier?: Identifier | undefined;
  link?: BundleLink[] | undefined;
  signature?: Signature | undefined;
  timestamp?: string | undefined;
  _timestamp?: Element | undefined;
  total?: number | undefined;
  type:
    | 'document'
    | 'message'
    | 'transaction'
    | 'transaction-response'
    | 'batch'
    | 'batch-response'
    | 'history'
    | 'searchset'
    | 'collection';
  _type?: Element | undefined;

  constructor(
    type:
      | 'document'
      | 'message'
      | 'transaction'
      | 'transaction-response'
      | 'batch'
      | 'batch-response'
      | 'history'
      | 'searchset'
      | 'collection',
  ) {
    this.type = type;
  }

  extractPropertiesFromInputObject(inputObj: Partial<Bundle>): void {
    // Iteriere über alle Eigenschaften im Eingabeobjekt
    for (const key of Object.keys(inputObj)) {
      // Überprüfe, ob das Schlüsselwort in der Klasse vorhanden ist
      if (key === 'type') {
        continue;
      }
      this.entry = inputObj.entry;
      this.identifier = inputObj.identifier;
      this.link = inputObj.link;
      this.signature = inputObj.signature;
      this.timestamp = inputObj.timestamp;
      this._timestamp = inputObj._timestamp;
      this.total = inputObj.total;
      this.type = inputObj.type;
      this._type = inputObj._type;
    }
  }
}

export function dataToBundle(data: any): Bundle | null {
  try {
    const parsedData = data;
    if (typeof parsedData === 'object' && parsedData !== null) {
      const validTypes = [
        'document',
        'message',
        'transaction',
        'transaction-response',
        'batch',
        'batch-response',
        'history',
        'searchset',
        'collection',
      ];
      if (
        !(
          typeof parsedData.type === 'string' &&
          validTypes.includes(parsedData.type)
        )
      ) {
        console.error('type of Bundle is not valid');
        return null;
      }

      const bundle: BundleImpl = new BundleImpl(parsedData.type);
      bundle.extractPropertiesFromInputObject(parsedData);
      return bundle;
    } else {
      console.error(
        'Ungültiges JSON-Format: Das geparste JSON ist kein Objekt oder null.',
      );
      return null;
    }
  } catch (error) {
    console.error('Fehler beim Parsen des JSON:', error);
    return null;
  }
}

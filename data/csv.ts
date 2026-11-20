export type CsvRecord = Record<string, string>;

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let field = '';
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === '"') {
      if (insideQuotes && line[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (character === ',' && !insideQuotes) {
      fields.push(field);
      field = '';
    } else {
      field += character;
    }
  }

  if (insideQuotes) {
    throw new Error(`Invalid CSV row with an unclosed quoted field: ${line}`);
  }

  fields.push(field);
  return fields;
}

export function parseCsv(contents: string): CsvRecord[] {
  const lines = contents.split(/\r?\n/).filter((line) => line.trim().length > 0);

  if (lines.length < 2) {
    throw new Error('The CSV must include a header and at least one data row.');
  }

  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line, index) => {
    const values = parseCsvLine(line);
    if (values.length !== headers.length) {
      throw new Error(`CSV row ${index + 2} has ${values.length} fields; expected ${headers.length}.`);
    }

    return Object.fromEntries(headers.map((header, column) => [header, values[column]]));
  });
}

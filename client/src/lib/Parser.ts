import { Aisle, Ingredient, Quantity, Recipe, Section } from "./types";

class IngredientParser {
  private measurements: string[];

  private static parseNumber(str: string): number {
    if (str.indexOf("/") !== -1) {
      const [n, d] = str.split("/");
      return parseInt(n, 10) / parseInt(d, 10);
    }
    return parseInt(str, 10);
  }

  public constructor(measurements: string[]) {
    this.measurements = measurements;
  }

  public parseIngredient(line: string): Ingredient | null {
    if (line === "") {
      return null;
    }
    var words = line.split(" ");
    if (words.length === 0) {
      return null;
    }
    var num = undefined;
    if (/^[0-9\/]+$/.test(words[0])) {
      num = IngredientParser.parseNumber(words[0]);
      if (isNaN(num)) {
        throw "failed to parse '" + line + "'";
      }
      words = words.slice(1);
      if (words.length === 0) {
        return null;
      }
    }
    var measurement = "";
    if (this.isMeasurement(words[0])) {
      measurement = words[0];
      words = words.slice(1);
      if (words.length === 0) {
        return null;
      }
    }
    var name = words.join(" ");
    var quantity: Quantity | null = null;
    if (num !== undefined) {
      quantity = [num, measurement];
    }
    return {
      quantity,
      name
    };
  }

  private isMeasurement(word: string): boolean {
    return this.measurements.indexOf(word) !== -1;
  }
}

export class Parser {
  // A section is a header followed by one or more runs of non-empty lines.
  //
  // For example:
  //
  // = Section Header =
  // Part1
  // Part1
  //
  // Part2
  // Part2
  //
  // This function parses runs of sections delimited by double newlines.
  public static parseSections(text: string): Section[] {
    if (!text) {
      return [];
    }
    const lines = text.split("\n");
    const sections: Section[] = [];
    let section: Section | null = null;
    var part: string[] = [];
    for (let line of lines) {
      if (section != null) {
        if (line.length > 0) {
          part.push(line);
          continue;
        }
        // Line is empty so we are done with this part.

        // Part is empty, this means this is the second empty line we've
        // encountered in a row, so we're done with this section.
        if (part.length === 0) {
          sections.push(section);
          section = null;
        } else {
          section.parts.push(part);
          part = [];
        }
      } else {
        part.push(line);
      }
      if (Parser.isHeader(line)) {
        section = { header: Parser.trimHeader(line), parts: [] };
        part = [];
      }
    }
    if (part.length > 0) {
      if (!section) {
        throw new Error("section shouldn't be null here");
      }
      section.parts.push(part);
    }
    if (section != null) {
      sections.push(section);
    }
    return sections;
  }

  public static parseRecipes(
    recipesText: string,
    measurementsText: string
  ): Recipe[] {
    var sections = Parser.parseSections(recipesText);
    var parser = new IngredientParser(measurementsText.split("\n"));

    var recipes: Recipe[] = [];
    for (let i = 0; i < sections.length; i++) {
      var parseIngredient: (
        line: string
      ) => Ingredient = parser.parseIngredient.bind(parser);
      const parts = sections[i].parts;
      const steps = parts.length > 2 ? parts.slice(2) : [];
      recipes.push({
        id: i,
        url: parts[0][0] || null,
        name: sections[i].header,
        ingredients: sections[i].parts[1].map(parseIngredient),
        steps
      });
    }
    return recipes;
  }

  public static parseAisles(aislesText: string): Aisle[] {
    var result: Aisle[] = [];
    var sections = Parser.parseSections(aislesText);
    sections.forEach(section => {
      result.push({ name: section.header, ingredientNames: section.parts[0] });
    });
    return result;
  }

  private static trimHeader(str: string): string {
    return str.substring(1, str.length - 1).trim();
  }

  // Returns true if the line represents a section header.
  private static isHeader(line: string): boolean {
    return line.charAt(0) === "=";
  }
}

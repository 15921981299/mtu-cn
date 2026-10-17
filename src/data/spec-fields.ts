/**
 * Display rules for catalog spec fields.
 *
 * The imported catalog data mixes real measurements with values that belong
 * to other fields (designation codes, pressure ratings, German descriptions).
 * Showing those under a "Dimensions" label would publish wrong data, so
 * measurement-like values are displayed and everything else is omitted.
 */

/** Values that mean "not published" in the source catalog data. */
const MISSING = /^(?:n\s*\/?\s*a|[\-–—])?$/i;

export const isMissingSpec = (value: string | undefined | null): boolean =>
  value == null || MISSING.test(String(value).trim());

/**
 * A catalog DIMENSIONS value counts as a measurement when it contains a
 * number plus a unit (mm/cm), a diameter symbol, an "x" between numbers,
 * or an ID/OD x cross-section pattern. Thread callouts such as "M 10 X 40"
 * and "M18X1.5" pass through the x-pattern.
 */
const MEASUREMENT =
  /\d[\d.,]*\s*(?:mm|cm|\u00d8|\u03a6)\b|[\d.]+\s*[xX\u00d7]\s*[\d.]+|\b(?:ID|OD)\s*[xX]\s*[\d.]+/i;

export const isMeasurementLike = (value: string | undefined | null): boolean =>
  !isMissingSpec(value) && MEASUREMENT.test(String(value).trim());

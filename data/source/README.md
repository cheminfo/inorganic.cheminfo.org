# Source datasets

The nomenclature sheet the pool was built from, kept with its French names so
the site can be translated back without losing one: `nomenclature.tsv` as it
was exported, and `nomenclature.json`, its usable rows (191).

The site reads `src/data/compounds.ts` and the names in `src/data/locales/`,
which differ from the sheet on purpose:

- `SeO2` and `NO` are listed twice; each appears once. `NO` accepts both
  _nitrogen monoxide_ and _nitric oxide_, and _Selenium dioxyde_ is dropped.
- `CCl4` is named _phosphorus trisulfide_ in the sheet; it is carbon
  tetrachloride.
- `H3P` is called _hydrophosphoric acid_; it is phosphine, `PH3`, and is filed
  with the covalent compounds.
- `H2CO` (_hypocarbonous acid_) is formaldehyde and `H2CO2` (_carbonous acid_)
  formic acid: both are left out.
- `HNO` is called _hyponitrous acid_; that acid is `H2N2O2`.
- _Nitric dioxide_ is nitrogen dioxide, _Dibromide heptaoxide_ dibromine
  heptoxide, _Hypophosphous acid_ hypophosphorous acid.
- The hydroxides of metals with several charges take their Roman numeral in
  English, as they already do in French: copper(II) hydroxide, not copper
  hydroxide. So do `Ir2O3` and `Cu2O2`.
- `VO2` has level 1 and `HNCS` none; they are read as 10 and 20.

That leaves 187 compounds: 163 at school level, 24 at university level.

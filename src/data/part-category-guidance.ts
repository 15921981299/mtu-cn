/**
 * Technical guidance shown on part pages, by catalog category, with optional
 * series-specific notes. Written in-house; keep statements general enough to
 * hold across ratings, and route anything rating-specific to the serial check.
 */
export type CategoryGuidance = {
  role: string;
  replaceWhen: string[];
  checks: string[];
};

export const categoryGuidance: Record<string, CategoryGuidance> = {
  'Gaskets and seals': {
    role: 'Gaskets, O-rings, and sealing rings keep oil, coolant, fuel, charge air, and exhaust gas in their own circuits. On high-speed MTU engines they work against high combustion pressures and frequent thermal cycling, so a seal that looks intact can still have lost its elasticity or set to the shape of the old joint.',
    replaceWhen: [
      'a joint has been opened for inspection or repair, even if the old seal looks usable',
      'oil or coolant weeping appears at a cover, pipe flange, or housing',
      'a coolant test shows oil contamination or combustion gas in the cooling system',
    ],
    checks: [
      'Material matters: fuel-system and coolant-system O-rings of the same size can use different elastomers',
      'Superseded gasket numbers often reflect a material or thickness change, so mixed old and new gaskets on one joint should be avoided',
      'Order the complete set for a joint rather than single pieces when the cover or head comes off',
    ],
  },
  'Filters': {
    role: 'Oil, fuel, and air filters protect the most expensive parts of the engine: bearings, injectors, and turbochargers. MTU specifies filter fineness and capacity for each series, and fuel filtration in particular is matched to the injection system, because common-rail injectors tolerate far less contamination than older pump-and-nozzle systems.',
    replaceWhen: [
      'the scheduled service interval in the maintenance schedule is reached',
      'the differential-pressure indicator or a filter alarm signals restriction',
      'fuel contamination, water in fuel, or a dust ingress event has occurred',
    ],
    checks: [
      'Replace primary and secondary fuel filters together unless the maintenance schedule says otherwise',
      'Easy-change and spin-on versions of a filter are not always interchangeable on the same housing',
      'Keep one complete filter set per engine on board or on site for unplanned changes',
    ],
  },
  'Fuel system': {
    role: 'The fuel system meters and delivers fuel at the pressure and timing the combustion process needs. Small wear in injectors, pumps, or valves shows up as higher fuel consumption, smoke, uneven cylinder temperatures, or rough running long before a complete failure.',
    replaceWhen: [
      'exhaust temperatures differ noticeably between cylinders',
      'black smoke, hard starting, or knocking points to injection problems',
      'fuel leaks appear at high-pressure lines, unions, or pump seals',
    ],
    checks: [
      'Check the maintenance documentation on reusing high-pressure lines; deformed sealing cones on refitted lines are a common leak source',
      'Injectors should be ordered with the correct seals and copper rings for the cylinder head',
      'Exchange (EX-prefixed) injectors and pumps are a practical option when new units have long lead times',
    ],
  },
  'Sensors and electrical': {
    role: 'Pressure, temperature, speed, and level sensors feed the engine governor and safety system. A faulty sensor can trigger alarms, power reduction, or a shutdown even when the engine itself is healthy, which is why sensors are among the most frequently ordered emergency parts.',
    replaceWhen: [
      'a sensor reading is implausible compared with a test gauge or neighbouring engines',
      'an alarm or shutdown is logged but the measured value is normal',
      'connector damage, corrosion, or broken wiring is found at the sensor',
    ],
    checks: [
      'Thread type, connector style, and measuring range must match; similar-looking sensors are often not interchangeable',
      'Newer replacement numbers may require a different connector or cable, which should be confirmed before ordering',
      'Check the wiring and connector before replacing the sensor itself',
    ],
  },
  'Cooling system': {
    role: 'The cooling system removes heat from the cylinder liners, cylinder heads, lube oil, and charge air. Marine MTU engines usually combine an engine coolant circuit with a seawater circuit through heat exchangers, while generator engines often use radiators. Coolant quality has a direct effect on liner cavitation and pump seal life.',
    replaceWhen: [
      'coolant leaks from the pump weep hole indicate seal wear',
      'engine temperature rises under load or fluctuates, pointing to thermostats or flow problems',
      'seawater pump impellers show cracked or missing vanes at inspection',
    ],
    checks: [
      'Replace thermostats and their seals together, and check the opening temperature on the replacement',
      'Seawater pump impellers should be kept as onboard spares for marine engines',
      'Flush and refill with an approved coolant after replacing pumps or heat-exchanger parts',
    ],
  },
  'Lubrication': {
    role: 'The lubrication system supplies oil to bearings, pistons, the valve train, and turbochargers, and on many engines also cools the pistons. Low oil pressure is one of the main protective shutdown triggers, so pumps, valves, and coolers in this circuit are critical to availability.',
    replaceWhen: [
      'oil pressure drops at operating temperature compared with earlier readings',
      'oil analysis shows coolant, fuel dilution, or rising wear metals',
      'the oil cooler leaks internally or externally',
    ],
    checks: [
      'Use an oil of the category permitted for the engine and fuel in use',
      'Pressure-relief and regulating valves should be replaced with their springs and seals',
      'After a bearing failure, clean or replace the oil cooler to remove debris',
    ],
  },
  'Pistons and liners': {
    role: 'Pistons, rings, and wet cylinder liners form the combustion chamber and carry the highest thermal loads in the engine. They are usually replaced during a major overhaul, and liner protrusion and size grades have to be checked so the cylinder head seals correctly.',
    replaceWhen: [
      'oil consumption or blow-by rises beyond the expected level',
      'borescope inspection shows liner scoring, bore polishing, or ring damage',
      'liner cavitation is found on the coolant side',
    ],
    checks: [
      'Order liners with their sealing rings, and pistons with complete ring sets',
      'Size grades and weight classes must be matched within one engine',
      'Measurements from the inspection record decide which grade to order',
    ],
  },
  'Bearings': {
    role: 'Main and connecting-rod bearings support the crankshaft and run on a thin oil film. MTU bearings are supplied in size grades to suit original and reground crankshafts, so the size marked on the old shells or on the crankshaft record has to be known before ordering.',
    replaceWhen: [
      'the engine reaches its major-overhaul interval',
      'oil analysis or filter inspection shows bearing material',
      'oil pressure loss or knocking points to bearing wear',
    ],
    checks: [
      'Confirm the size grade (for example size 0 or an undersize) from the old shells or crankshaft measurements',
      'Replace bearings as complete sets per crankshaft journal type',
      'Thrust bearings and washers should be checked together with the main bearings',
    ],
  },
  'Valve train': {
    role: 'Valves, guides, seats, springs, and rocker components control gas exchange in the cylinder head. Wear in the valve train shows up as compression loss, rising exhaust temperatures, or changes in valve clearance between service intervals.',
    replaceWhen: [
      'valve clearance changes quickly between adjustments',
      'compression is low on one or more cylinders',
      'valves or seats show burning, pitting, or recession during head overhaul',
    ],
    checks: [
      'Valve guides and seats are matched to the valve stem and head; order them per cylinder head',
      'Replace valve stem seals whenever valves are removed',
      'Inner and outer valve springs are usually separate part numbers',
    ],
  },
  'Turbocharging': {
    role: 'Turbochargers recover energy from the exhaust gas to compress the intake air. Their rotating parts run at very high speeds, so bearing and seal condition, balance, and clean oil supply decide service life. Larger MTU engines may use several turbochargers or sequential turbocharging, where turbochargers are switched in as load increases.',
    replaceWhen: [
      'unusual noise, oil leakage into the intake or exhaust, or blue smoke appears',
      'charge-air pressure is lower than normal at the same load',
      'inspection shows blade damage on the turbine or compressor wheel',
    ],
    checks: [
      'Turbine wheels, compressor wheels, and housings are often specific to one turbocharger version; take the reference from the turbocharger nameplate',
      'Replace gaskets and oil-line seals when refitting a turbocharger',
      'Find the cause of a turbocharger failure, such as oil supply or foreign objects, before installing the replacement',
    ],
  },
  'Air and intake': {
    role: 'The intake system delivers clean, cooled air to the cylinders. Leaks in hoses, charge-air pipes, or intercooler connections reduce charge pressure and raise exhaust temperatures, while damaged air filters let dust reach the turbocharger and cylinders.',
    replaceWhen: [
      'charge-air hoses are cracked, swollen, or oil-soaked',
      'boost pressure drops and a leak is found on the charge-air side',
      'air-filter elements reach their restriction limit',
    ],
    checks: [
      'Replace hose clamps with the hoses on charge-air connections',
      'Check charge-air cooler connections for oil, which can indicate turbocharger seal problems',
      'Intake parts on marine engines may differ from generator versions of the same series',
    ],
  },
  'Drive components': {
    role: 'Gears, shafts, couplings, belts, fasteners, and locking parts transmit drive to pumps, camshafts, and auxiliaries and hold assemblies together. Many of these items are inexpensive but critical: a missing tab washer or a reused stretch bolt can cause a far larger failure.',
    replaceWhen: [
      'locking elements such as tab washers or self-locking nuts have been removed',
      'gear teeth, splines, or keyways show wear or pitting',
      'belts show cracks, glazing, or incorrect tension after adjustment',
    ],
    checks: [
      'Use new fasteners where the maintenance documentation specifies single use',
      'Order belts as matched sets on multi-belt drives',
      'Check slotted nuts, washers, and pins together with the component they secure',
    ],
  },
  'Engine components': {
    role: 'This group covers structural and miscellaneous engine parts, from covers and housings to brackets, pipes, and fittings, as well as special tools used during maintenance. Fitment depends heavily on the exact engine version and installation, so the engine serial number and catalog position are essential.',
    replaceWhen: [
      'the part is cracked, distorted, or damaged during removal',
      'a modification or later standard requires the updated part',
      'an overhaul or repair procedure lists the item as replace-on-removal',
    ],
    checks: [
      'Send a photo of the part in its installed position if the catalog reference is unclear',
      'Housings and covers may differ between left and right engine banks',
      'Check whether related seals or fasteners are needed with the part',
    ],
  },
  'Repair kits': {
    role: 'Repair kits group the seals, small parts, and wear items needed for one repair task, such as a pump or valve overhaul. They reduce the risk of missing a small item during the job, but the content of a kit can change when it is superseded.',
    replaceWhen: [
      'a component such as a pump or valve is overhauled rather than replaced',
      'a leak is traced to internal seals of an assembly',
      'the maintenance task lists the kit for the interval',
    ],
    checks: [
      'Confirm the kit matches the exact assembly version on the engine',
      'Compare the kit content with the parts removed before reassembly',
      'Ask for the current kit content if the kit number has been superseded',
    ],
  },
  'Control components': {
    role: 'Control components include actuators, valves, governors, and electronic units that manage fuel delivery, speed, and protection functions. On electronically controlled engines they work together with software and sensors, so replacement can involve configuration as well as hardware.',
    replaceWhen: [
      'the engine control logs faults that point to the component after wiring checks',
      'actuators stick, respond slowly, or leak',
      'a modification requires a later hardware version',
    ],
    checks: [
      'Confirm whether the replacement needs programming or a dataset for the engine',
      'Match connector type and hardware version to the existing installation',
      'Record the old unit serial number and label before removal',
    ],
  },
};

/** Series-level technical context used to refine the category guidance. */
export const seriesTechNotes: Record<string, Partial<Record<string, string>>> = {
  'MTU 4000': {
    'Fuel system': 'Series 4000 engines use common-rail fuel injection, with high rail pressures and injectors that are sensitive to fuel cleanliness. Fuel filtration and high-pressure line condition deserve particular attention.',
    'Sensors and electrical': 'Series 4000 engines rely on an electronic engine governor, so sensor faults are logged and can lead to power reduction. Fault codes help narrow down which sensor to order.',
    'Turbocharging': 'Larger Series 4000 versions use more than one turbocharger, and marine versions may use sequential turbocharging. Take the reference from the turbocharger nameplate as well as the engine serial number.',
  },
  'MTU 2000': {
    'Fuel system': 'Series 2000 engines have been built with different injection systems over their production life, including common-rail versions. The full model code and serial number decide which injector and pump references apply.',
    'Sensors and electrical': 'Most Series 2000 engines use electronic engine management, and fault logs help identify a failing sensor before it causes a shutdown.',
  },
  'MTU 396': {
    'Fuel system': 'Series 396 engines use conventional pump-and-nozzle injection rather than common rail. Injection pump and nozzle-holder references vary between ratings and older engines may carry superseded numbers.',
    'Turbocharging': 'Series 396 versions differ in charge-air cooling and turbocharger arrangement; the "TB" and "TE" letters in the model code describe the charge-air cooling layout.',
  },
  'MTU 956': {
    'Fuel system': 'Series 956 engines use conventional injection systems, and many have been in service for decades, so supersession checks are a normal part of quoting fuel-system parts.',
  },
  'MTU 1163': {
    'Turbocharging': 'Series 1163 engines are known for sequential turbocharging, where additional turbochargers are switched in as load rises. Flap and control parts for the switching system are specific to the installation.',
  },
  'MTU 595': {
    'Turbocharging': 'Series 595 engines use sequential turbocharging on many versions, so turbocharger and charge-air flap references depend on the exact model.',
  },
  'MTU 538': {
    'Gaskets and seals': 'Series 538 parts are often listed under older reference formats. Keep the full number including any letters and slash suffix when ordering seals and gaskets.',
  },
  'MTU 183': {
    'Cooling system': 'Series 183 engines in marine service use a seawater pump and heat exchanger, while generator versions may be radiator-cooled, so cooling parts depend on the installation.',
  },
};

export const getPartGuidance = (category: string, series: string[]) => {
  const guidance = categoryGuidance[category];
  if (!guidance) return undefined;
  const seriesNote = series.map((name) => seriesTechNotes[name]?.[category]).find(Boolean);
  return { ...guidance, seriesNote };
};

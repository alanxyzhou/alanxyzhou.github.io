export const defaultUnits = [
    { name: "meter", symbol: "m", mega: "Mm" },
    { name: "kilogram", symbol: "kg", mega: "Mkg" },
    { name: "second", symbol: "s", mega: "Ms" },
];

export const otherUnits = [
    // SI base units
    { name: "ampere", symbol: "A", mega: "MA" },
    { name: "kelvin", symbol: "K", mega: "MK" },
    { name: "mole", symbol: "mol", mega: "Mmol" },
    { name: "candela", symbol: "cd", mega: "Mcd" },

    // SI derived units with special names
    { name: "radian", symbol: "rad", mega: "Mrad" },
    { name: "steradian", symbol: "sr", mega: "Msr" },
    { name: "hertz", symbol: "Hz", mega: "MHz" },
    { name: "newton", symbol: "N", mega: "MN" },
    { name: "pascal", symbol: "Pa", mega: "MPa" },
    { name: "joule", symbol: "J", mega: "MJ" },
    { name: "watt", symbol: "W", mega: "MW" },
    { name: "coulomb", symbol: "C", mega: "MC" },
    { name: "volt", symbol: "V", mega: "MV" },
    { name: "farad", symbol: "F", mega: "MF" },
    { name: "ohm", symbol: "Ω", mega: "MΩ" },
    { name: "siemens", symbol: "S", mega: "MS" },
    { name: "weber", symbol: "Wb", mega: "MWb" },
    { name: "tesla", symbol: "T", mega: "MT" },
    { name: "henry", symbol: "H", mega: "MH" },
    { name: "degree Celsius", symbol: "°C", mega: "M°C" },
    { name: "lumen", symbol: "lm", mega: "Mlm" },
    { name: "lux", symbol: "lx", mega: "Mlx" },
    { name: "becquerel", symbol: "Bq", mega: "MBq" },
    { name: "gray", symbol: "Gy", mega: "MGy" },
    { name: "sievert", symbol: "Sv", mega: "MSv" },
    { name: "katal", symbol: "kat", mega: "Mkat" },

    // Common metric and SI-adjacent units
    { name: "gram", symbol: "g", mega: "Mg" },
    { name: "tonne", symbol: "t", mega: "Mt" },
    { name: "liter", symbol: "L", mega: "ML" },
    { name: "hectare", symbol: "ha", mega: "Mha" },
    { name: "minute", symbol: "min", mega: "Mmin" },
    { name: "hour", symbol: "h", mega: "Mh" },
    { name: "day", symbol: "d", mega: "Md" },
    { name: "degree", symbol: "°", mega: "M°" },
    { name: "arcminute", symbol: "′", mega: "M′" },
    { name: "arcsecond", symbol: "″", mega: "M″" },
    { name: "astronomical unit", symbol: "au", mega: "Mau" },
    { name: "dalton", symbol: "Da", mega: "MDa" },
    { name: "electronvolt", symbol: "eV", mega: "MeV" },
    { name: "neper", symbol: "Np", mega: "MNp" },
    { name: "bel", symbol: "B", mega: "MB" },
    { name: "decibel", symbol: "dB", mega: "MdB" },

    // CGS and older scientific units
    { name: "centimeter", symbol: "cm", mega: "Mcm" },
    { name: "dyne", symbol: "dyn", mega: "Mdyn" },
    { name: "erg", symbol: "erg", mega: "Merg" },
    { name: "poise", symbol: "P", mega: "MP" },
    { name: "stokes", symbol: "St", mega: "MSt" },
    { name: "gauss", symbol: "G", mega: "MG" },
    { name: "oersted", symbol: "Oe", mega: "MOe" },
    { name: "maxwell", symbol: "Mx", mega: "MMx" },
    { name: "gal", symbol: "Gal", mega: "MGal" },
    { name: "barye", symbol: "Ba", mega: "MBa" },
    { name: "phot", symbol: "ph", mega: "Mph" },
    { name: "stilb", symbol: "sb", mega: "Msb" },
    { name: "statcoulomb", symbol: "statC", mega: "MstatC" },
    { name: "statvolt", symbol: "statV", mega: "MstatV" },
    { name: "abampere", symbol: "abA", mega: "MabA" },
    { name: "abvolt", symbol: "abV", mega: "MabV" },

    // Pressure
    { name: "bar", symbol: "bar", mega: "Mbar" },
    { name: "atmosphere", symbol: "atm", mega: "Matm" },
    { name: "torr", symbol: "Torr", mega: "MTorr" },
    { name: "millimeter of mercury", symbol: "mmHg", mega: "MmmHg" },
    { name: "pound per square inch", symbol: "psi", mega: "Mpsi" },

    // Energy and power
    { name: "calorie", symbol: "cal", mega: "Mcal" },
    { name: "kilocalorie", symbol: "kcal", mega: "Mkcal" },
    { name: "British thermal unit", symbol: "BTU", mega: "MBTU" },
    { name: "therm", symbol: "thm", mega: "Mthm" },
    { name: "watt-hour", symbol: "Wh", mega: "MWh" },
    { name: "horsepower", symbol: "hp", mega: "Mhp" },

    // Radiation and radioactivity
    { name: "curie", symbol: "Ci", mega: "MCi" },
    { name: "roentgen", symbol: "R", mega: "MR" },
    { name: "rad", symbol: "rd", mega: "Mrd" },
    { name: "rem", symbol: "rem", mega: "Mrem" },

    // Imperial and US customary length
    { name: "thou", symbol: "thou", mega: "Mthou" },
    { name: "mil", symbol: "mil", mega: "Mmil" },
    { name: "inch", symbol: "in", mega: "Min" },
    { name: "hand", symbol: "hh", mega: "Mhh" },
    { name: "foot", symbol: "ft", mega: "Mft" },
    { name: "yard", symbol: "yd", mega: "Myd" },
    { name: "chain", symbol: "ch", mega: "Mch" },
    { name: "furlong", symbol: "fur", mega: "Mfur" },
    { name: "mile", symbol: "mi", mega: "Mmi" },
    { name: "league", symbol: "lea", mega: "Mlea" },
    { name: "link", symbol: "li", mega: "Mli" },
    { name: "rod", symbol: "rod", mega: "Mrod" },
    { name: "pole", symbol: "pole", mega: "Mpole" },
    { name: "perch", symbol: "perch", mega: "Mperch" },

    // Imperial and US customary area
    { name: "square inch", symbol: "in²", mega: "Min²" },
    { name: "square foot", symbol: "ft²", mega: "Mft²" },
    { name: "square yard", symbol: "yd²", mega: "Myd²" },
    { name: "acre", symbol: "ac", mega: "Mac" },
    { name: "rood", symbol: "ro", mega: "Mro" },
    { name: "section", symbol: "sec", mega: "Msec" },
    { name: "township", symbol: "twp", mega: "Mtwp" },

    // Imperial and US customary mass
    { name: "grain", symbol: "gr", mega: "Mgr" },
    { name: "dram", symbol: "dr", mega: "Mdr" },
    { name: "ounce", symbol: "oz", mega: "Moz" },
    { name: "pound", symbol: "lb", mega: "Mlb" },
    { name: "stone", symbol: "st", mega: "Mst" },
    { name: "quarter", symbol: "qr", mega: "Mqr" },
    { name: "hundredweight", symbol: "cwt", mega: "Mcwt" },
    { name: "ton", symbol: "ton", mega: "Mton" },
    { name: "slug", symbol: "slug", mega: "Mslug" },

    // Imperial and US customary volume
    { name: "minim", symbol: "minim", mega: "Mminim" },
    { name: "fluid dram", symbol: "fl dr", mega: "Mfl dr" },
    { name: "teaspoon", symbol: "tsp", mega: "Mtsp" },
    { name: "tablespoon", symbol: "tbsp", mega: "Mtbsp" },
    { name: "fluid ounce", symbol: "fl oz", mega: "Mfl oz" },
    { name: "gill", symbol: "gi", mega: "Mgi" },
    { name: "cup", symbol: "cup", mega: "Mcup" },
    { name: "pint", symbol: "pt", mega: "Mpt" },
    { name: "quart", symbol: "qt", mega: "Mqt" },
    { name: "gallon", symbol: "gal", mega: "Mgal" },
    { name: "peck", symbol: "pk", mega: "Mpk" },
    { name: "bushel", symbol: "bu", mega: "Mbu" },
    { name: "barrel", symbol: "bbl", mega: "Mbbl" },
    { name: "cord", symbol: "cord", mega: "Mcord" },
    { name: "board foot", symbol: "FBM", mega: "MFBM" },

    // Nautical and navigation
    { name: "fathom", symbol: "ftm", mega: "Mftm" },
    { name: "cable", symbol: "cbl", mega: "Mcbl" },
    { name: "nautical mile", symbol: "nmi", mega: "Mnmi" },
    { name: "knot", symbol: "kn", mega: "Mkn" },

    // Time, because time can also be productized
    { name: "shake", symbol: "shake", mega: "Mshake" },
    { name: "jiffy", symbol: "jiffy", mega: "Mjiffy" },
    { name: "fortnight", symbol: "fn", mega: "Mfn" },
    { name: "sennight", symbol: "sn", mega: "Msn" },
    { name: "month", symbol: "mo", mega: "Mmo" },
    { name: "year", symbol: "yr", mega: "Myr" },
    { name: "sidereal day", symbol: "sid d", mega: "Msid d" },
    { name: "sidereal year", symbol: "sid yr", mega: "Msid yr" },

    // Temperature scales
    { name: "degree Fahrenheit", symbol: "°F", mega: "M°F" },
    { name: "degree Rankine", symbol: "°R", mega: "M°R" },

    // Speed
    { name: "mile per hour", symbol: "mph", mega: "Mmph" },
    { name: "foot per second", symbol: "ft/s", mega: "Mft/s" },
    { name: "Mach", symbol: "Ma", mega: "MMa" },

    // Typography and printing
    { name: "point", symbol: "pt", mega: "Mpt" },
    { name: "pica", symbol: "pc", mega: "Mpc" },
    { name: "didot point", symbol: "dd", mega: "Mdd" },
    { name: "cicero", symbol: "cc", mega: "Mcc" },
    { name: "em", symbol: "em", mega: "Mem" },
    { name: "en", symbol: "en", mega: "Men" },

    // Information and computing
    { name: "bit", symbol: "bit", mega: "Mbit" },
    { name: "byte", symbol: "B", mega: "MB" },
    { name: "nibble", symbol: "nibble", mega: "Mnibble" },
    { name: "word", symbol: "word", mega: "Mword" },
    { name: "baud", symbol: "Bd", mega: "MBd" },
    { name: "shannon", symbol: "Sh", mega: "MSh" },
    { name: "nat", symbol: "nat", mega: "Mnat" },
    { name: "hartley", symbol: "Hart", mega: "MHart" },
    { name: "pixel", symbol: "px", mega: "Mpx" },

    // Astronomy and astrophysics
    { name: "light-second", symbol: "ls", mega: "Mls" },
    { name: "light-minute", symbol: "lmin", mega: "Mlmin" },
    { name: "light-year", symbol: "ly", mega: "Mly" },
    { name: "parsec", symbol: "pc", mega: "Mpc" },
    { name: "jansky", symbol: "Jy", mega: "MJy" },
    { name: "solar mass", symbol: "M☉", mega: "MM☉" },
    { name: "earth mass", symbol: "M⊕", mega: "MM⊕" },
    { name: "solar radius", symbol: "R☉", mega: "MR☉" },
    { name: "earth radius", symbol: "R⊕", mega: "MR⊕" },
    { name: "solar luminosity", symbol: "L☉", mega: "ML☉" },

    // Atomic and nuclear
    { name: "barn", symbol: "b", mega: "Mb" },
    { name: "fermi", symbol: "fm", mega: "Mfm" },
    { name: "angstrom", symbol: "Å", mega: "MÅ" },
    { name: "x unit", symbol: "xu", mega: "Mxu" },

    // Jewelry, gems, and precious metals
    { name: "carat", symbol: "ct", mega: "Mct" },
    { name: "point carat", symbol: "pt ct", mega: "Mpt ct" },
    { name: "troy ounce", symbol: "oz t", mega: "Moz t" },
    { name: "pennyweight", symbol: "dwt", mega: "Mdwt" },
    { name: "momme", symbol: "momme", mega: "Mmomme" },

    // Apothecaries' units
    { name: "scruple", symbol: "s ap", mega: "Ms ap" },
    { name: "apothecary dram", symbol: "dr ap", mega: "Mdr ap" },
    { name: "apothecary ounce", symbol: "oz ap", mega: "Moz ap" },
    { name: "apothecary pound", symbol: "lb ap", mega: "Mlb ap" },

    // Historical and traditional length
    { name: "barleycorn", symbol: "bc", mega: "Mbc" },
    { name: "digit", symbol: "digit", mega: "Mdigit" },
    { name: "finger", symbol: "finger", mega: "Mfinger" },
    { name: "palm", symbol: "palm", mega: "Mpalm" },
    { name: "span", symbol: "span", mega: "Mspan" },
    { name: "cubit", symbol: "cubit", mega: "Mcubit" },
    { name: "ell", symbol: "ell", mega: "Mell" },
    { name: "pace", symbol: "pace", mega: "Mpace" },
    { name: "rope", symbol: "rope", mega: "Mrope" },
    { name: "nail", symbol: "nail", mega: "Mnail" },

    // Japanese traditional units
    { name: "rin", symbol: "rin", mega: "Mrin" },
    { name: "bu", symbol: "bu", mega: "Mbu" },
    { name: "sun", symbol: "sun", mega: "Msun" },
    { name: "shaku", symbol: "shaku", mega: "Mshaku" },
    { name: "ken", symbol: "ken", mega: "Mken" },
    { name: "jo", symbol: "jo", mega: "Mjo" },
    { name: "tsubo", symbol: "tsubo", mega: "Mtsubo" },
    { name: "cho", symbol: "cho", mega: "Mcho" },
    { name: "ri", symbol: "ri", mega: "Mri" },
    { name: "go", symbol: "go", mega: "Mgo" },
    { name: "sho", symbol: "sho", mega: "Msho" },
    { name: "to", symbol: "to", mega: "Mto" },
    { name: "koku", symbol: "koku", mega: "Mkoku" },
    { name: "momme", symbol: "monme", mega: "Mmonme" },
    { name: "kin", symbol: "kin", mega: "Mkin" },
    { name: "kan", symbol: "kan", mega: "Mkan" },

    // Indian and South Asian traditional units
    { name: "ratti", symbol: "ratti", mega: "Mratti" },
    { name: "masha", symbol: "masha", mega: "Mmasha" },
    { name: "tola", symbol: "tola", mega: "Mtola" },
    { name: "seer", symbol: "seer", mega: "Mseer" },
    { name: "maund", symbol: "maund", mega: "Mmaund" },
    { name: "gaz", symbol: "gaz", mega: "Mgaz" },
    { name: "kos", symbol: "kos", mega: "Mkos" },

    // Delightfully real oddities
    { name: "smoot", symbol: "smoot", mega: "Msmoot" },
    { name: "beard-second", symbol: "bs", mega: "Mbs" },
    { name: "svedberg", symbol: "S", mega: "MS" },
    { name: "darcy", symbol: "D", mega: "MD" },
    { name: "langley", symbol: "Ly", mega: "MLy" },
    { name: "kayser", symbol: "K", mega: "MK" },
    { name: "mired", symbol: "mired", mega: "Mmired" },
];

export const units = [...defaultUnits, ...otherUnits];

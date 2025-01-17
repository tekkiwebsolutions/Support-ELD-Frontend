export const FuelTypes = [
  { user_id: "diesel", label: "Diesel" },
  { user_id: "gasoline", label: "Gasoline" },
  { user_id: "propane", label: "Propane" },
  { user_id: "liquid_natural_gas", label: "Liquid Natural Gas" },
  { user_id: "compressed_natural_gas", label: "Compressed Natural Gas" },
  { user_id: "ethanol", label: "Ethanol" },
  { user_id: "methanol", label: "Methanol" },
  { user_id: "e_85", label: "E-85" },
  { user_id: "m_85", label: "M-85" },
  { user_id: "a55", label: "A55" },
  { user_id: "biodiesel", label: "Biodiesel" },
  { user_id: "other", label: "Other" },
];

export const EldConnection = [
  { user_id: "Heavy_duty_vehicle", label: "Heavy Duty Vehicle" },
  { user_id: "Light_duty_vehicle", label: "Light Duty Vehicle" },
];
export const TimeZoneOptions = [
  { value: "UTC", label: "UTC" },
  { value: "Pacific Time", label: "Pacific Time" },
  { value: "Newfoundland Time", label: "Newfoundland Time" },
  { value: "Mountain Time", label: "Mountain Time" },
  { value: "Alaska Time", label: "Alaska Time" },
  { value: "Arizona Time", label: "Arizona Time" },
  { value: "Eastern Time", label: "Eastern Time" },
  { value: "Central Time", label: "Central Time" },
  { value: "Atlantic Time", label: "Atlantic Time" },
  { value: "Hawaii–Aleutian Time", label: "Hawaii–Aleutian Time" },
];
export const CountryOptions = [
  { value: "United States", label: "United States" },
  { value: "US Protectorates", label: "US Protectorates" },
  { value: "Canada", label: "Canada" },
  { value: "Mexico", label: "Mexico" },
  { value: "Other", label: "Other" },
];
export const StateOptions = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
].map((state) => ({ label: state, value: state }));

export const resetbreak = [
  { label: "30 min rest break", value: "30 min rest break" },
  { label: "No break", value: "No break" },
];
export const reset = [
  { value: "34 Hour Restart", label: "34 Hour Restart" },

  { value: "24 Hour Restart", label: "24 Hour Restart" },
];

 export const HosOption = [
  { value: 'USA_70_8', label: 'USA 70 hour / 8 day' },
  { value: 'USA_60_7', label: 'USA 60 hour / 7 day' },
  { value: 'California_80_8', label: 'California 80 hour / 8 day' },
  { value: 'Texas_70_7', label: 'Texas 70 hour / 7 day' },
  { value: 'Mexico_Only', label: 'Mexico Only' },
  { value: 'Canada_70_7', label: 'Canada 70 hour / 7 day' },
  { value: 'Canada_120_14', label: 'Canada 120 hour / 14 day' }
]

enum STEPS_ENUM {
  SELECT_SOURCE = 0,
  GENERATE_SMILE = 1,
  VALIDATE_SMILE = 2,
  PREDICT = 3
};

const STEPS = ['Select source image', 'Generate SMILE','Validate SMILE', 'Predict'];

export {
  STEPS_ENUM,
  STEPS
};
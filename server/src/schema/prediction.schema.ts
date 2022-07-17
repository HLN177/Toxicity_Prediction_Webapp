import {object, string, number, TypeOf} from 'zod';

const generateSmilePayload = {
  body: object({
    ImgName: string({
      required_error: "File Name is required"
    }),
    ImgData: string({
      required_error: "File Data is required"
    })
  })
};

const generateSmileSchema = object({
  ...generateSmilePayload
});

type GenerateSmileInput = TypeOf<typeof generateSmileSchema>;

export {
  generateSmileSchema,
  GenerateSmileInput
};
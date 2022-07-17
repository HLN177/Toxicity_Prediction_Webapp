import { writeFile, unlink } from 'fs/promises';
import { execSync, spawn } from 'child_process';
import { Request, Response } from "express";
import { GenerateSmileInput } from "../schema/prediction.schema";
import { IMAGE_TYPE, MOL_FILE_TYPE } from '../const/prediction.const';
import REGEX from '../utils/regex';

interface Path {
  FILE_NAME: string,
  IMAGO_CONSOLE_PATH: string
  EXTENSION: string | null,
  SOURCE_IMG_PATH: string,
  MOL_FILE_PATH: string,
  MOL_TO_SMILE_PY_PATH: string
}

/**
 * step1: validate img file type
 * step2: save source img
 * step3: transfer img to mol file using imago_console
 * step4: generate smile from mol file
 * step5: send back smile
 * step6: delete source img and mol file
 * @param req 
 * @param res 
 * @returns 
 */
async function generateSmileFileHandler(
  req: Request<{}, {}, GenerateSmileInput['body']>,
  res: Response
) {
  try {
    // get userId
    const userId = res.locals.user._id;
    // request parsing
    const {
      ImgName: imgName,
      ImgData: imgData
    } = req.body;
    // generate file path
    const {
      EXTENSION,
      IMAGO_CONSOLE_PATH,
      SOURCE_IMG_PATH,
      MOL_FILE_PATH,
      MOL_TO_SMILE_PY_PATH
    } = generatePath(imgName, userId);

    // step1: validate img file type
    if(!validateImgFileType(EXTENSION)) {
      return res.status(400).send({message: 'invalid file type'});
    }

    //step2: save source img
    await saveSourceImg(imgData, SOURCE_IMG_PATH);

    //step3: transfer img to mol file using imago_console
    imgToMol(IMAGO_CONSOLE_PATH, SOURCE_IMG_PATH, MOL_FILE_PATH);

    // step4: generate smile from mol file by python script
    const SMILE = await molToSmile(MOL_TO_SMILE_PY_PATH, MOL_FILE_PATH);

    // step5: send back smile
    res.send({
      SmileResult: SMILE
    });

    // step6: delete source img and mol file (async)
    clearFile(SOURCE_IMG_PATH, MOL_FILE_PATH);
    return;
  } catch (err: any) {
    return res.status(400).send({message: err.message});
  }
}

function validateImgFileType(extension: string | null): boolean {
  if (!extension) {
    return false;
  }
  if (IMAGE_TYPE.indexOf(extension) === -1) {
    return false;
  }
  return true;
}

async function saveSourceImg(imgData: string, imgPath: string) {
  try {
    const buffer = Buffer.from(imgData, 'base64');
    await writeFile(imgPath, buffer);
  } catch (err) {
    throw err;
  }
}

function imgToMol(imagoPath: string, srcImgPath: string, molFilePath: string) {
  try {
    execSync(`${imagoPath} ${srcImgPath} -o ${molFilePath}`);
  } catch (err) {
    throw err;
  }
}

function molToSmile(pyPath: string, molFilePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const pyProcess = spawn('python', [pyPath, '-p', molFilePath]);
    let result = '';
    let isError = false;
    pyProcess.stdout.on('data', res => {
      result += res;
    });
    pyProcess.stderr.on('data', data => {
      result += data;
      !isError && (isError = true);
    });
    pyProcess.on('close', () => {
      if (result.substring(0, 5) === 'error' || isError) {
        reject(result);
        return;
      }
      resolve(result.replace(REGEX.LINE_BREAKS, ''));
    })
  })
}

function generatePath(imgName: string, userId: any = ''): Path {
  const RUNTIME_PATH = './src/runtime/';
  const IMAGO_CONSOLE_PATH = './src/runtime/imago_console';
  const FILE_NAME = imgName.match(REGEX.FILE_NAME)![0];
  const EXTENSION = imgName.match(REGEX.FILE_EXTENSION)![0];
  const SOURCE_IMG_PATH = `${RUNTIME_PATH}${userId}_${imgName}`;
  const MOL_FILE_PATH = `${RUNTIME_PATH}${userId}_${FILE_NAME}${MOL_FILE_TYPE}`;
  const MOL_TO_SMILE_PY_PATH = `./src/utils/mol2smile.py`;
  // return (): Path => {
  return {
    FILE_NAME,
    IMAGO_CONSOLE_PATH,
    EXTENSION,
    SOURCE_IMG_PATH,
    MOL_FILE_PATH,
    MOL_TO_SMILE_PY_PATH
  };
  // };
}

function clearFile(srcImgPath: string, molFilePath: string) {
  try {
    unlink(srcImgPath);
    unlink(molFilePath);
  } catch (err) {
    console.log(`delete file error: ${err}`);
  }
}

export {
  generateSmileFileHandler
};
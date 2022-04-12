import fs from 'fs'


export const deleteFile = async (filename: string) => {

  try {
    //check if exists file
    await fs.promises.stat(filename)
  } catch {
    //if not exists, return a error
    return;
  }
  //delete file
  await fs.promises.unlink(filename)
}
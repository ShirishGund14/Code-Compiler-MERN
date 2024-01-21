const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`);

  // console.log(outPath);

  return new Promise((resolve, reject) => {
    exec(
      //.\a.exe
      `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}`,
      (error, stdout, stderr) => {
        error && reject({error,stderr});
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  })
};


module.exports = {
  executeCpp,
};

const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
  const jobId = path.basename(filepath, path.extname(filepath));
  const outPath = path.join(outputPath, jobId);

  console.log(`Compiling ${filepath} to ${outPath}`);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}`,
      (error, stdout, stderr) => {
        if (error || stderr) {
          console.error(`Error: ${error}`);
          console.error(`stderr: ${stderr}`);
          reject({ error, stderr });
        } else {
          console.log(`Execution successful:\n${stdout}`);
          resolve(stdout);
        }
      }
    );
  });
};

module.exports = {
  executeCpp,
};

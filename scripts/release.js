const { exec } = require('child_process');

function publishPackage() {
  exec('npm publish', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error publishing package: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

publishPackage();

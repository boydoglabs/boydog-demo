console.log("Preparing dev symlinks")

const exec = require('child_process').exec
const del = require('del');

(async () => {
  const deletedPaths = await del([
    "./node_modules/boydog",
    "./node_modules/boydog-client",
    "./node_modules/sharedb-attribute-binding",
  ])
  console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
})()

;[
  "boydog",
  "boydog-client",
  "sharedb-attribute-binding",
].forEach(m => {
  let child = exec(`cd ./git_modules/${ m } && npm link && cd .. && npm link ${ m }`, err => {
    if (err !== null) console.log('error creating link to repository', m, err);
  })
})

console.log("Done preparing dev symlinks")
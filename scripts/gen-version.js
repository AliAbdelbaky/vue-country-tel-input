
const fs = require('fs');

const args = process.argv.slice(2);

if (args.length !== 1) {
    console.log('Please provide one argument: major, minor, or patch **');
    process.exit(1);
}
const versionType = args[0].toLowerCase();
const validTypes = ['major', 'minor', 'patch'];

if (!validTypes.includes(versionType)) {
    console.log('Invalid version type. Please choose major, minor, or patch');
    process.exit(1);
}

// Read the package.json file
const packageData = fs.readFileSync('package.json', 'utf8');
const packageJson = JSON.parse(packageData);

// Increment the version number
const currentVersion = packageJson.version;
const versionParts = currentVersion.split('.').map(Number);
if (versionType === 'major') {
    versionParts[0]++; // Increment the major version
    versionParts[1] = 0; // Reset the minor version
    versionParts[2] = 0; // Reset the patch version
} else if (versionType === 'minor') {
    versionParts[1]++; // Increment the minor version
    versionParts[2] = 0; // Reset the patch version
} else {
    versionParts[2]++; // Increment the patch version
}

// Update the package.json with the new version number
packageJson.version = versionParts.join('.');

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
fs.writeFileSync(require('path').resolve(__dirname, '..', 'src', 'version.ts'), `export default '${packageJson.version}'\n`);

console.log(`Version number is -> ${packageJson.version}`);
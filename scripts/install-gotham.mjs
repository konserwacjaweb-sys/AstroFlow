import fs from "node:fs";
import path from "node:path";

const weightToAliases = {
	"100": ["100", "thin"],
	"200": ["200", "extralight", "extra-light", "xlight", "x-light", "ultralight", "ultra-light"],
	"300": ["300", "light"],
	"400": ["400", "book", "regular"],
	"500": ["500", "medium"],
	"600": ["600", "semibold", "semi-bold", "demi", "demibold", "demi-bold"],
	"700": ["700", "bold"],
	"800": ["800", "extrabold", "extra-bold", "heavy"],
	"900": ["900", "black"],
};

const args = process.argv.slice(2);

function getArgValue(name) {
	const flag = `--${name}`;
	const inline = args.find((arg) => arg.startsWith(`${flag}=`));
	if (inline) {
		return inline.slice(flag.length + 1);
	}

	const index = args.indexOf(flag);
	if (index >= 0 && args[index + 1]) {
		return args[index + 1];
	}

	return undefined;
}

function printUsage() {
	console.log("Usage: npm run install:gotham -- --source /absolute/or/relative/path/to/fonts");
	console.log("Expected source files: Gotham weights 100-900 in .woff2 (required) and .woff (optional).");
}

const sourceArg = getArgValue("source");

if (!sourceArg) {
	printUsage();
	process.exit(1);
}

const workspaceRoot = process.cwd();
const sourceDir = path.resolve(workspaceRoot, sourceArg);
const targetDir = path.resolve(workspaceRoot, "public/fonts");

if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
	console.error(`Source directory not found: ${sourceDir}`);
	process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name);

function normalize(str) {
	return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const normalizedFiles = files.map((name) => ({
	original: name,
	normalized: normalize(path.parse(name).name),
	ext: path.extname(name).toLowerCase(),
}));

function findMatch(weight, ext) {
	const aliases = weightToAliases[weight];
	if (!aliases) {
		return undefined;
	}

	return normalizedFiles.find((file) => {
		if (file.ext !== ext) {
			return false;
		}

		if (!file.normalized.includes("gotham")) {
			return false;
		}

		return aliases.some((alias) => file.normalized.includes(normalize(alias)));
	});
}

const missingWoff2 = [];
const copied = [];

for (const weight of Object.keys(weightToAliases)) {
	const woff2 = findMatch(weight, ".woff2");
	const woff = findMatch(weight, ".woff");

	if (!woff2) {
		missingWoff2.push(weight);
		continue;
	}

	const woff2Target = `Gotham-${weight}.woff2`;
	fs.copyFileSync(path.join(sourceDir, woff2.original), path.join(targetDir, woff2Target));
	copied.push(woff2Target);

	if (woff) {
		const woffTarget = `Gotham-${weight}.woff`;
		fs.copyFileSync(path.join(sourceDir, woff.original), path.join(targetDir, woffTarget));
		copied.push(woffTarget);
	}
}

if (missingWoff2.length > 0) {
	console.error("Missing required .woff2 files for Gotham weights:", missingWoff2.join(", "));
	console.error("Tip: include files containing both 'Gotham' and one of these labels per weight (e.g. Thin, Book, Bold or 100..900).");
	process.exit(1);
}

console.log(`Installed Gotham weights 100-900 to ${targetDir}`);
console.log(`Copied files (${copied.length}):`);
for (const name of copied) {
	console.log(`- ${name}`);
}

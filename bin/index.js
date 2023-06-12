#! /usr/bin/env node
// import yargs from 'yargs';
// import chalk from 'chalk';

const yargs = require("yargs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const icons = [
  {
    name: "bug",
    icon: "🐛",
  },
  {
    name: "ship",
    icon: "🚀",
  },
  {
    name: "start",
    icon: "🎉",
  },
  {
    name: "checkmark",
    icon: "✅",
  },
  {
    name: "rewrite",
    icon: "♻️",
  },
  {
    name: "remove",
    icon: "⚰️",
  },
  {
    name: "new",
    icon: "✨",
  },
  {
    name: "performance",
    icon: "⚡️",
  },
  {
    name: 'rename',
    icon: '🚚'
  }
];

// const usage = chalk.keyword('violet')("\nUsage: mycli -l <language>  -s <sentence> \n"
// + boxen(chalk.green("\n" + "Translates a sentence to specific language" + "\n"), {padding: 1, borderColor: 'green', dimBorder: true}) + "\n");

const options = yargs
  // .usage(usage)
  .option("m", {
    alias: "message",
    describe: "Enter a message to commit",
    type: "string",
    demandOption: false,
  })
  .option("i", {
    alias: "icon",
    describe: "Icon to prefix commit message with",
    type: "string",
    demandOption: false,
  })
  .option("s", {
    alias: "startup",
    describe: "opens up all brantu windows and terminal",
    type: "string",
    demandOption: false,
  })
  .option("h", {
    alias: "help",
    describe: "show all the icons",
    type: "string",
    demandOption: false,
  })
  .option("b", {
    alias: "branch",
    describe: "provide branch if you are pushing for first time",
    type: "string",
    demandOption: false,
  })
  .help(true).argv;

const argv = require("yargs/yargs")(process.argv.slice(2)).argv;
console.log("argv", argv);

if (argv.m && argv.m != true) {
  pushToGit();
} else if (argv.s) {
  openBrantu();
} else if (argv.h) {
  icons.map((icon) => console.log(`${icon.icon} ${icon.name}`));
} else {
  yargs.showHelp();
}

async function pushToGit() {
  try {
    if (!argv.m) throw Error("Undefined message");
    let icon = "";
    if (argv.i) {
      const iconObject = icons.find((i) => i.name === argv.i);
      if (iconObject) icon = iconObject.icon;
    }
    console.log(`This is your commit message: ${icon} ${argv.m}`);
    await exec("git add .");
    await exec(`git commit -m '${icon} ${argv.m}'`);
    if (argv.b) {
      await exec(`git push -u origin ${argv.b}`);
    } else {
      await exec("git push");
    }
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
}

async function openBrantu() {
  try {
    // Brantu ERP
    await exec(
      `osascript -e 'tell app "Terminal" to do script "cd /Users/dhruvjain/Documents/brantu/brantu-erp && code . && npm run dev"'`
    );
    // Brantu API
    await exec(
      `osascript -e 'tell app "Terminal" to do script "cd /Users/dhruvjain/Documents/brantu/brantu-api && code . && npm run dev"'`
    );
    // Brantu elprices model
    await exec(
      `osascript -e 'tell app "Terminal" to do script "cd /Users/dhruvjain/Documents/brantu/elprices-models && code ."'`
    );
    // Brantu website
    await exec(
      `osascript -e 'tell app "Terminal" to do script "cd /Users/dhruvjain/Documents/brantu/brantu-website && nvm use 12 && code . && npm run dev"'`
    );
  } catch (e) {
    console.log(e);
  }
}

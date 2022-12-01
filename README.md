# advent-of-code

Contains NodeJS solutions for [https://adventofcode.com](https://adventofcode.com) problems by year/day.

# Getting Started

- Clone the repo
- Install dependencies with `yarn`
- Run a specific day's puzzle with `yarn start 2018:1:2` to run the second problem of the first day of 2018.
  - The script can also assume the current year and day if desired so `yarn start 1:2` is equivalent to `yarn start currentYear:1:2` and `yarn start 2` is equivalent to `yarn start currentYear:currentDay:2`
  - The script can also modify the input file name if the day's puzzle is configured to support it. Running `yarn start 2 test` will set the `INPUT` environment variable to `test.txt` and will run the `currentYear/currentDay/index-2.ts` script file. That file should reference `process.env.INPUT` to load the correct file.

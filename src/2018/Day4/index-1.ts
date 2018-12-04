import { sortBy } from "lodash";
import { parseInput } from "../../util/parse-input";

class Message {
  public time: Date;
  constructor(timeStamp: string, public message: string) {
    const [year, month, day, hours, minutes] = timeStamp
      .split(/[-\s:]/g)
      .map(Number);
    this.time = new Date(year, month - 1, day, hours, minutes);
  }

  getGuardId() {
    let matches = this.message.match(/#(\d+)/);
    return matches && matches[1];
  }
}

const input = parseInput(
  v => {
    const parts = v.slice(1).split("] ");
    return new Message(parts[0], parts[1].trim());
  },
  __dirname,
  "input.txt"
);

const timeline = sortBy(input, "time");
let guardId;

const guards: {
  [id: string]: {
    guardId: string;
    messages: Message[];
    total: number;
  };
} = {};

function initGuardRecord(id) {
  if (!guards[id]) {
    guards[id] = {
      guardId: id,
      messages: [],
      total: 0
    };
  }
}

let sleepStart: Date;

timeline.forEach(message => {
  guardId = message.getGuardId() || guardId;
  initGuardRecord(guardId);

  guards[guardId].messages.push(message);

  switch (message.message) {
    case "falls asleep": {
      sleepStart = message.time;
      break;
    }
    case "wakes up": {
      const diff = Math.abs(+sleepStart - +message.time);
      const minutes = Math.floor(diff / 1000 / 60);
      sleepStart = undefined;

      guards[guardId].total += minutes;
      break;
    }
  }
});

const sleepiestGuard = sortBy(Object.values(guards), "total").pop();
const asleepOnMinute: { [minute: string]: number } = {};

sleepiestGuard.messages.forEach(message => {
  switch (message.message) {
    case "falls asleep": {
      sleepStart = message.time;
      break;
    }
    case "wakes up": {
      const diff = Math.abs(+sleepStart - +message.time);
      for (
        let minute = sleepStart.getMinutes();
        minute < message.time.getMinutes();
        minute++
      ) {
        asleepOnMinute[minute] = asleepOnMinute[minute] || 0;
        asleepOnMinute[minute] += 1;
      }
      break;
    }
  }
});

const usuallyAsleepOnMinute = sortBy(
  Object.entries(asleepOnMinute).map(([minute, count]) => ({ minute, count })),
  "count"
).pop();

console.log(+sleepiestGuard.guardId * +usuallyAsleepOnMinute.minute);

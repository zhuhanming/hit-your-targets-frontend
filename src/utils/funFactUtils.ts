/* eslint-disable no-case-declarations */
import ToDo from 'interfaces/ToDo';
import { getDisplayDate } from './timeUtils';

export enum FactType {
  TEXT,
  STAT
}

export enum StatType {
  COMPLETION_RATE,
  NUMBER_OF_INCOMPLETE_TASKS,
  NUMBER_OF_COMPLETE_TASKS,
  MOST_COMPLETED_TASK_PERCENTAGE,
  OLDEST_TASK_CREATION_DATE,
  MOST_COMMON_TAG
}

export interface FunFact {
  type: FactType;
  intro: string;
  stat: string | StatType;
  end: string;
}

// Data container - contains possible fun facts
export const funFacts: FunFact[] = [
  {
    type: FactType.TEXT,
    intro: 'This app was built in',
    stat: 'REACT',
    end: 'How cool is that?'
  },
  {
    type: FactType.TEXT,
    intro: 'Love Trello? Then check out',
    stat: 'KANBAN',
    end: "View. You'll love it!"
  },
  {
    type: FactType.TEXT,
    intro: 'This app was built for',
    stat: 'CVWO',
    end: 'Check out their cool initiatives!'
  },
  {
    type: FactType.TEXT,
    intro: 'Want a quick view of your tasks?',
    stat: '👈🏻',
    end: 'Tasks for Today is here for you!'
  },
  // {
  //   type: FactType.TEXT,
  //   intro: 'This app was built by',
  //   stat: 'zhuhanming',
  //   end: 'Check out my GitHub!'
  // },
  {
    type: FactType.TEXT,
    intro: "We're here to help you",
    stat: '🏹',
    end: "your targets! Let's do it together!"
  },
  {
    type: FactType.TEXT,
    intro: 'Many hold on to their todo list for',
    stat: 'YEARS',
    end: 'How long would you hold on to yours?'
  },
  {
    type: FactType.TEXT,
    intro: 'Do you know?',
    stat: '50%',
    end:
      'of people write down tasks they have done before checking them off. Do you?'
  },
  {
    type: FactType.TEXT,
    intro: 'People enjoy making todo lists.',
    stat: '96%',
    end: 'do, in fact. Do you?'
  },
  {
    type: FactType.STAT,
    intro: 'You have completed',
    stat: StatType.COMPLETION_RATE,
    end: 'of your tasks!'
  },
  {
    type: FactType.STAT,
    intro: 'You currently have',
    stat: StatType.NUMBER_OF_INCOMPLETE_TASKS,
    end: 'tasks in progress!'
  },
  {
    type: FactType.STAT,
    intro: 'You have completed',
    stat: StatType.NUMBER_OF_COMPLETE_TASKS,
    end: 'tasks!'
  },
  {
    type: FactType.STAT,
    intro: 'The task nearest to completion is at',
    stat: StatType.MOST_COMPLETED_TASK_PERCENTAGE,
    end: 'completion!'
  },
  {
    type: FactType.STAT,
    intro: 'Your earliest task was created at',
    stat: StatType.OLDEST_TASK_CREATION_DATE,
    end: 'Keep it up!'
  },
  {
    type: FactType.STAT,
    intro: 'Your most used tag is',
    stat: StatType.MOST_COMMON_TAG,
    end: 'Amazing!'
  },
  {
    type: FactType.TEXT,
    intro: "Thank you for supporting us. You're",
    stat: '👍',
    end: 'Cannot have done it without you!'
  },
  {
    type: FactType.TEXT,
    intro: "If you want a new fact, you'll need to",
    stat: 'RELOG',
    end: "But you wouldn't do that, would you?"
  }
];

// Fetches a random fun fact
const generateFunFact = (): FunFact => {
  return funFacts[Math.floor(Math.random() * funFacts.length)];
};

// Helps to compute the information to display
const getStats = (
  todos: ToDo[],
  intro: string,
  end: string,
  stat: string | StatType
): {
  intro: string;
  stat: string;
  end: string;
} => {
  let finalStat;
  let finalIntro = intro;
  let finalEnd = end;
  const completedTasksLength = todos.filter(t => t.completed).length;
  const todosWithSubtodos = todos.filter(t => t.subtodos.length > 0);

  switch (stat) {
    case StatType.COMPLETION_RATE:
      if (completedTasksLength === 0) {
        finalIntro = 'You have yet to complete';
        finalStat = 'ANY';
        finalEnd += ' Get started with the menu on the left now!';
      } else {
        finalStat = `${Math.round(
          (completedTasksLength / todos.length) * 100
        )}%`;
      }
      break;
    case StatType.NUMBER_OF_COMPLETE_TASKS:
      finalStat = completedTasksLength;
      if (finalStat === 0) {
        finalEnd += ' Time to work harder!';
      }
      break;
    case StatType.NUMBER_OF_INCOMPLETE_TASKS:
      finalStat = todos.length - completedTasksLength;
      if (finalStat === 0) {
        finalStat = 'ALL';
        finalEnd = 'of your tasks! Good job!';
      }
      break;
    case StatType.OLDEST_TASK_CREATION_DATE:
      const todoSlice = todos.slice();
      todoSlice.sort(
        (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
      );
      finalStat = getDisplayDate(todoSlice[0].createdAt);
      break;
    case StatType.MOST_COMPLETED_TASK_PERCENTAGE:
      if (
        todosWithSubtodos.length === 0 &&
        todos.length > completedTasksLength
      ) {
        finalStat = '0%';
        finalEnd += ' You need to work harder!';
      } else {
        finalStat = todos
          .filter(t => !t.completed)
          .map(
            t => t.subtodos.filter(s => s.completed).length / t.subtodos.length
          );
        finalStat.sort();
        [finalStat] = finalStat;
        finalStat = `${Math.ceil(finalStat * 100)}%`;
        if (finalStat === 0) {
          finalStat = '0%';
          finalEnd += ' You need to work harder!';
        }
      }
      break;
    case StatType.MOST_COMMON_TAG:
      const allTags = todos.reduce(
        (a, { tags }) => a.concat(tags),
        [] as string[]
      );
      const counts = allTags.reduce((d, tag) => {
        // eslint-disable-next-line no-param-reassign
        d[tag] = (d[tag] || 0) + 1;
        return d;
      }, {});
      const maxCount = Math.max(...(Object.values(counts) as number[]));
      const mostFrequent = Object.keys(counts).filter(
        k => counts[k] === maxCount
      );
      if (mostFrequent.length === 0) {
        finalIntro = 'You have yet to create any';
        finalStat = 'TAGS';
        finalEnd = 'Try it out now!';
      } else {
        [finalStat] = mostFrequent;
      }
      break;
    default:
      break;
  }
  return { intro: finalIntro, end: finalEnd, stat: finalStat };
};

export { generateFunFact, getStats };

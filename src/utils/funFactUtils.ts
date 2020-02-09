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

const generateFunFact = (): FunFact => {
  return funFacts[Math.floor(Math.random() * funFacts.length)];
};

export { generateFunFact };

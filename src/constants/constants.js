export const GoalDuration = [
  {
    label: 'week',
    value: 7
  },
  {
    label: 'month',
    value: 30
  },
  {
    label: 'threeMonth',
    value: 90
  },
  {
    label: 'halfYear',
    value: 180
  },
  {
    label: 'year',
    value: 365
  }
];

export const GoalPeriodicity = [
  {
    label: 'daily',
    plural: 'days',
    value: 0
  },
  {
    label: 'weekly',
    plural: 'weeks',
    value: 7
  },
  {
    label: 'everyTwoWeeks',
    plural: 'fortnight',
    value: 14
  },
  {
    label: 'monthly',
    plural: 'months',
    value: 30
  },
];

export const GoalUnitName = [
  {
    label: 'Item',
    value: null
  },
  {
    label: 'Minutes',
    value: 'minutes'
  },
  {
    label: 'Hours',
    value: 'hours'
  },
];

export const GoalsScreenDropdownData = [
  {
    label: 'myGoals',
    value: 0
  },
  {
    label: 'archievedGoals',
    value: 1
  }
];

export const Week = [
  {
    label: 'MON',
    value: 0
  },
  {
    label: 'TUE',
    value: 1
  },
  {
    label: 'WED',
    value: 2
  },
  {
    label: 'THU',
    value: 3
  },
  {
    label: 'FRI',
    value: 4
  },
  {
    label: 'SAT',
    value: 5
  },
  {
    label: 'SUN',
    value: 6
  },
];

export const Year = [
  {
    label: 'Jan',
    value: 0
  },
  {
    label: 'Feb',
    value: 1
  },
  {
    label: 'Mar',
    value: 2
  },
  {
    label: 'Apr',
    value: 3
  },
  {
    label: 'May',
    value: 4
  },
  {
    label: 'Jun',
    value: 5
  },
  {
    label: 'Jul',
    value: 6
  },
  {
    label: 'Aug',
    value: 7
  },
  {
    label: 'Sep',
    value: 8
  },
  {
    label: 'Oct',
    value: 9
  },
  {
    label: 'Nov',
    value: 10
  },
  {
    label: 'Dec',
    value: 11
  }
];

export const LanguagesFull = {
  en: 'English',
  ua: 'Ukrainian',
}

export const getLanguageShort = (lang) => {
  switch (lang) {
    case 'English':
    case 'Англійська': {
      return 'en';
    }

    case 'Ukrainian':
    case 'Українська': {
      return 'ua';
    }

    default: {
      return undefined;
    }
  }

}

export const FEEDS_PAGINATION_OFFSET = 10;
export const GOALS_PAGINATION_OFFSET = 7;
export const DEEP_LINK = 'challengeapp://challengeapp';
import * as ActionTypes from '../actions';

const initialState = {
  loading: {
    continuedGoal: true
  },
  error: '',
  predefinedGoals: [],
  activeGoals: {
    categoriesOffsets: {},
    goals: [],
  },
  archivedGoals: {
    years: [],
    goals: [],
    offset: 0,
    categoriesOffsets: {},
    isMoreYearsAvailable: true,
  },
  friendsGoals: {},
  goalTypes: {
    strava: [],
    goodreads: [],
  },
  goalArchived: false,
  createdGoals: [],
  categories: [],
  searchCategories: [],
  formattedCategories: [],
  continuedGoal: null,
  quantitativeGoal: null,
  recordChanged: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_PREDEFINED_GOALS_REQUEST: {
      return {
        ...state,
        error: '',
      }
    }
    case ActionTypes.GET_PREDEFINED_GOALS_SUCCESS: {
      return {
        ...state,
        predefinedGoals: payload.data
      }
    }
    case ActionTypes.GET_PREDEFINED_GOALS_FAILURE: {
      return {
        ...state,
        error: payload.response.data
      }
    }

    case ActionTypes.GET_ACTIVE_GOALS_REQUEST: {
      return {
        ...state,
        error: ''
      }
    }
    case ActionTypes.GET_ACTIVE_GOALS_SUCCESS: {
      const { categoriesOffsets, data } = payload;
      
      return {
        ...state,
        activeGoals: {
          ...state.activeGoals,
          goals: data,
          categoriesOffsets,
        },
      }
    }
    case ActionTypes.GET_ACTIVE_GOALS_FAILURE: {
      return {
        ...state,
        error: payload.response.data
      }
    }

    case ActionTypes.GET_MORE_ACTIVE_GOALS_SUCCESS: {
      const { updatedActiveGoals, updatedCategoriesOffsets } = payload;

      return {
        ...state,
        activeGoals: {
          ...state.activeGoals,
          goals: updatedActiveGoals,
          categoriesOffsets: updatedCategoriesOffsets,
        },
      }
    }

    case ActionTypes.GET_ARCHIVED_GOALS_YEARS_REQUEST_SUCCESS: {
      const { years, isMoreYearsAvailable } = payload;

      return {
        ...state,
        archivedGoals: {
          ...state.archivedGoals,
          years,
          isMoreYearsAvailable,
        },
      }
    }

    case ActionTypes.GET_MORE_ARCHIVED_GOALS_CATEGORY_REQUEST_SUCCESS: {
      const { updatedGoals, updatedCategoryOffsets } = payload;

      return {
        ...state,
        archivedGoals: {
          ...state.archivedGoals,
          goals: updatedGoals,
          categoriesOffsets: updatedCategoryOffsets,
        }
      }
    }

    case ActionTypes.GET_ARCHIVED_GOALS_REQUEST: {
      return {
        ...state,
        error: ''
      }
    }
    case ActionTypes.GET_ARCHIVED_GOALS_SUCCESS: {
      const { updatedGoals, offset, isMoreYearsAvailable } = payload;

      return {
        ...state,
        archivedGoals: {
          ...state.archivedGoals,
          goals: updatedGoals,
          isMoreYearsAvailable,
          offset,
        },
      }
    }
    case ActionTypes.GET_ARCHIVED_GOALS_FAILURE: {
      return {
        ...state,
        error: payload.response.data
      }
    }

    case ActionTypes.CREATE_GOALS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: '',
      }
    }
    case ActionTypes.CREATE_GOALS_SUCCESS: {
      const { newCreatedGoals, newActiveGoals } = payload;

      return {
        ...state,
        loading: false,
        createdGoals: newCreatedGoals,
        activeGoals: {
          ...state.activeGoals,
          goals: newActiveGoals
        }
      }
    }
    case ActionTypes.CREATE_GOALS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: payload.response.data
      }
    }

    case ActionTypes.DELETE_GOAL_REQUEST: {
      return {
        ...state,
        error: ''
      }
    }
    case ActionTypes.DELETE_GOAL_SUCCESS: {
      const { newCreatedGoals, newActiveGoals } = payload;

      return {
        ...state,
        createdGoals: newCreatedGoals,
        activeGoals: {
          ...state.activeGoals,
          goals: newActiveGoals
        }
      }
    }
    case ActionTypes.DELETE_GOAL_FAILURE: {
      return {
        ...state,
        error: payload.response.data
      }
    }

    case ActionTypes.ARCHIVE_GOAL_REQUEST: {
      return {
        ...state,
        error: ''
      }
    }
    case ActionTypes.ARCHIVE_GOAL_SUCCESS: {
      const { newActiveGoals, newArchivedGoals } = payload;

      return {
        ...state,
        activeGoals: {
          ...state.activeGoals,
          goals: newActiveGoals
        },
        archivedGoals: {
          ...state.archivedGoals,
          goals: newArchivedGoals
        },
        goalArchived: true,
        error: ''
      }
    }
    case ActionTypes.ARCHIVE_GOAL_FAILURE: {
      return {
        ...state,
        error: payload.response && payload.response.data
      }
    }

    case ActionTypes.UNARCHIVE_GOAL_REQUEST: {
      return {
        ...state,
        error: ''
      }
    }
    case ActionTypes.UNARCHIVE_GOAL_SUCCESS: {
      const { newActiveGoals, newArchivedGoals } = payload;

      return {
        ...state,
        activeGoals: {
          ...state.activeGoals,
          newActiveGoals
        },
        archivedGoals: {
          ...state.archivedGoals,
          goals: newArchivedGoals
        },
        error: ''
      }
    }
    case ActionTypes.UNARCHIVE_GOAL_FAILURE: {
      return {
        ...state,
        error: payload.response.data
      }
    }

    case ActionTypes.COPY_GOAL_REQUEST: {
      return {
        ...state,
        error: '',
      }
    }
    case ActionTypes.COPY_GOAL_SUCCESS: {

      return {
        ...state,
        activeGoals: {
          ...state.activeGoals,
          goals: payload
        }
      }
    }
    case ActionTypes.COPY_GOAL_FAILURE: {
      return {
        ...state,
        error: payload.response.data
      }
    }

    case ActionTypes.CHANGE_PRIVATE_REQUEST: {
      return {
        ...state,
        error: ''
      }
    }
    case ActionTypes.CHANGE_PRIVATE_SUCCESS: {
      return {
        ...state,
        activeGoals: {
          ...state.activeGoals,
          goals: payload
        }
      }
    }
    case ActionTypes.CHANGE_PRIVATE_FAILURE: {
      return {
        ...state,
        error: payload.response.data
      }
    }

    case ActionTypes.GET_CATEGORIES_REQUEST: {
      return {
        ...state,
        error: '',
      }
    }
    case ActionTypes.GET_CATEGORIES_SUCCESS: {
      const { categories, searchCategories, formattedCategories } = payload;

      return {
        ...state,
        categories,
        searchCategories,
        formattedCategories
      }
    }
    case ActionTypes.GET_CATEGORIES_FAILURE: {
      return {
        ...state,
        error: payload.response.data
      }
    }

    case ActionTypes.GET_CONTINUED_GOAL_REQUEST: {
      return {
        ...state,
        quantitativeGoal: null,
        loading: {
          ...state.loading,
          continuedGoal: true
        },
        error: '',
      }
    }
    case ActionTypes.GET_CONTINUED_GOAL_SUCCESS: {
      return {
        ...state,
        continuedGoal: payload.data,
        loading: {
          ...state.loading,
          continuedGoal: false
        },
      }
    }
    case ActionTypes.GET_CONTINUED_GOAL_SUCCESS: {
      return {
        ...state,
        error: payload.response.data,
        loading: {
          ...state.loading,
          continuedGoal: false
        },
      }
    }

    case ActionTypes.GET_QUANTITATIVE_GOAL_REQUEST: {
      return {
        ...state,
        continuedGoal: null,
        error: '',
      }
    }
    case ActionTypes.GET_QUANTITATIVE_GOAL_SUCCESS: {
      return {
        ...state,
        quantitativeGoal: payload.data,
      }
    }
    case ActionTypes.GET_QUANTITATIVE_GOAL_FAILURE: {
      return {
        ...state,
        error: payload.response.data,
      }
    }

    case ActionTypes.ADD_CONTINUED_RECORD_REQUEST: {
      return {
        ...state,
        recordChanged: false,
        error: ''
      }
    }
    case ActionTypes.ADD_CONTINUED_RECORD_SUCCESS: {
      return {
        ...state,
        recordChanged: true
      }
    }
    case ActionTypes.ADD_CONTINUED_RECORD_FAILURE: {
      return {
        ...state,
        error: payload.response.data
      }
    }

    case ActionTypes.ADD_QUANTITATIVE_RECORD_REQUEST: {
      return {
        ...state,
        recordChanged: false,
        error: ''
      }
    }
    case ActionTypes.ADD_QUANTITATIVE_RECORD_SUCCESS: {
      return {
        ...state,
        recordChanged: true
      }
    }
    case ActionTypes.ADD_QUANTITATIVE_RECORD_FAILURE: {
      return {
        ...state,
        error: payload.response.data
      }
    }

    case ActionTypes.EDIT_CONTINUED_RECORD_REQUEST: {
      return {
        ...state,
        recordChanged: false,
        error: ''
      }
    }
    case ActionTypes.EDIT_CONTINUED_RECORD_SUCCESS: {
      return {
        ...state,
        recordChanged: true
      }
    }
    case ActionTypes.EDIT_CONTINUED_RECORD_FAILURE: {
      return {
        ...state,
        error: payload.response.data
      }
    }

    case ActionTypes.EDIT_QUANTITATIVE_RECORD_REQUEST: {
      return {
        ...state,
        recordChanged: false,
        error: ''
      }
    }
    case ActionTypes.EDIT_QUANTITATIVE_RECORD_SUCCESS: {
      return {
        ...state,
        recordChanged: true
      }
    }
    case ActionTypes.EDIT_QUANTITATIVE_RECORD_FAILURE: {
      return {
        ...state,
        error: payload.response.data
      }
    }

    case ActionTypes.DELETE_QUANTITATIVE_RECORD_REQUEST: {
      return {
        ...state,
        error: ''
      }
    }
    case ActionTypes.DELETE_QUANTITATIVE_RECORD_SUCCESS: {
      return {
        ...state,
        quantitativeGoal: {
          ...state.quantitativeGoal,
          entries: state.quantitativeGoal.entries.filter((entry) => entry.id !== payload)
        }
      }
    }
    case ActionTypes.DELETE_QUANTITATIVE_RECORD_FAILURE: {
      return {
        ...state,
        error: payload.response.data
      }
    }

    case ActionTypes.FRIEND_GOALS_REQUEST_SUCCESS: {
      return {
        ...state,
        friendsGoals: payload,
      }
    }

    case ActionTypes.GET_MORE_FRIEND_GOALS_SUCCESS: {
      return {
        ...state,
        friendsGoals: payload,
      }
    }

    case ActionTypes.FRIEND_DELETE_REQUEST_SUCCESS: {
      return {
        ...state,
        friendsGoals: payload.updatedFriendsGoals,
      }
    }

    case ActionTypes.RESET_ARCHIVE_GOAL_STATUS: {
      return {
        ...state,
        goalArchived: false
      }
    }

    case ActionTypes.RESET_CREATED_GOALS: {
      return {
        ...state,
        createdGoals: []
      }
    }

    case ActionTypes.STRAVA_TYPES_REQUEST_SUCCESS: {
      return {
        ...state,
        goalTypes: {
          ...state.goalTypes,
          strava: payload,
        }
      }
    }

    case ActionTypes.GOODREADS_TYPES_REQUEST_SUCCESS: {
      return {
        ...state,
        goalTypes: {
          ...state.goalTypes,
          goodreads: payload,
        }
      }
    }

    default: {
      return state;
    }
  }
};

export default () => {
  return {
    title: 'HistoryFlow',
    shortTitle: 'HF',
    ui: {
      infoBoxShowed: false
    },

    dicts: {},

    rootScenario: { // global scenario of the project
      context: {}
      // context: {
      //   name: '',
      //   rootElement: null,
      //   info_fields: [],
      //   start_date: {},
      //   end_date: {},
      //   elements_types: [],
      //   links_types: [],
      //   additional_ids: [],
      //   bbox: [],
      //   step_size: '',
      //   weight: 1,
      //   disable_others: false,
      //   dataset: []
      // }
    },
    scenario: {
      contexts: []
    },
    elements: [],
    shapes: [],
    selectedElementsIds: [],
    currentElementId: '',

    timeline: {
      // currentDate: moment(),
      // startDate: moment('-5000/01/01'),
      // endDate: moment(new Date()),
      // visibleDates: {
      //   startDate: moment('-230/01/01'),
      //   endDate: moment('-190/01/01')
      // },
      // period: {
      //   startDate: moment('-220/01/01'),
      //   endDate: moment('-200/01/01')
      // }
    }

  }
}

import ScenarioMap from '@/views/Scenario/ScenarioMap'
import ScenarioBox from '@/views/Scenario/ScenarioBox'
import ScenarioTimeLine from '@/views/Scenario/ScenarioTimeline'

import store from '@/store'

export default [{
  path: 'scenarios/:scenarioName',
  name: 'scenario',
  components: {
    map: ScenarioMap,
    infobox: ScenarioBox,
    timeline: ScenarioTimeLine
  },
  beforeEnter: async (to, from, next) => {
    await store.dispatch('fetchScenario', to.params.scenarioName)
    next()
  }
}]

import { createAction } from 'redux-act'

export const fetchContents = createAction('FETCH_CONTENTS')

export const changeChartTurn = createAction('CHANGE_CHART_TURN')
export const fallChartButton = createAction('FALL_CHART_BUTTON')

export const showResults = createAction('SHOW_RESULTS')

export const match = createAction('MATCH')

export const changePage = createAction('CHANGE_PAGE', page => page)
export const changeTownDemand = createAction('CHANGE_TOWN_DEMAND')

export const intoLoading = createAction('INTO_LOADING')
export const exitLoading = createAction('EXIT_LOADING')

export const openParticipantPage = createAction('open participant page')

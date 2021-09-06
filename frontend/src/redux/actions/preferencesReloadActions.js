export const startPreferenceReload = () => {
  return {
    type: "START_PREFERENCES_RELOAD",
    payload: true
  }
}

export const endPreferenceReload = () => {
  return {
    type: "END_PREFERENCES_RELOAD",
    payload: false
  }
}
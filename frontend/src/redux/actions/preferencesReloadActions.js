export const startPreferenceReload = () => {
  return {
    type: "START_RELOAD",
    payload: true
  }
}

export const endPreferenceReload = () => {
  return {
    type: "END_RELOAD",
    payload: false
  }
}
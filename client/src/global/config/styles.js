import color from 'tinycolor2'

const defaults = {
  primaryColor: '#1058d2',
  secondaryColor: '#f86204',
  offBlack: '#222',
  offWhite: '#f3f3f3',
  errorColor: '#FF3333',
  highlightColor: '#fcf820',
  defaultFontSize: 14,
  defaultFontBiggerSize: 16,
  defaultFontSmallerSize: 11,
  defaultFontFamily: `'Open Sans', 'Roboto', sans-serif`,
  defaultFontColor: '#222',
  defaultLineHeight: '1.5em',
  defaultH1Size: 32,
  defaultH2Size: 28,
  defaultH3Size: 24,
  defaultH4Size: 20,
  defaultH5Size: 18,
  defaultH6Size: 16,
  defaultGray1: '#949494',
  defaultGray2: '#a2a2a2',
  defaultGray3: '#b0b0b0',
  defaultGray4: '#bdbdbd',
  defaultHSpace: 5,
  defaultVSpace: 4,
  defaultIconSizeXL: 42,
  defaultIconSizeLarge: 34,
  defaultIconSizeMedium: 26,
  defaultIconSizeSmall: 18,
  defaultIconSizeXS: 12,
  borderRadiusButton: 4,
  mobileBreakpoint: 520,
  shadowSize: 5
}

const fn = {}
fn.calcVSpace = (factor = 1, unit = 'px') =>
  `${defaults.defaultVSpace * factor + unit}`
fn.calcHSpace = (factor = 1, unit = 'px') =>
  `${defaults.defaultHSpace * factor + unit}`
fn.calcSpace = (factor, unit) =>
  `${fn.calcVSpace(factor, unit)} ${fn.calcHSpace(factor, unit)}`

// This function is slightly skewed to identify more colors as 'dark' than 'light'
fn.isLightish = (currentColor) =>
  color(currentColor).darken(8).isLight()

fn.lighten = (currentColor, amount = 10) => {
  const colorObj = color(currentColor)
  const halfAmount = Math.floor(amount / 2)
  return colorObj.lighten(amount).saturate(halfAmount).toString()
}
fn.darken = (currentColor, amount = 10) => {
  const colorObj = color(currentColor)
  const halfAmount = Math.floor(amount / 2)
  return colorObj.darken(amount).desaturate(halfAmount).toString()
}
fn.intensifyColor = (currentColor, amount) =>
  fn.isLightish(currentColor)
    ? color(currentColor).lighten(amount).saturate(amount * 1.5).toString()
    : color(currentColor).darken(amount).saturate(amount * 1.5).toString()
fn.diminishColor = (currentColor, amount) =>
  fn.isLightish(currentColor)
    ? color(currentColor).darken(amount).desaturate(amount * 1.5).toString()
    : color(currentColor).lighten(amount).desaturate(amount * 1.5).toString()
fn.getInverse = (currentColor) =>
  fn.isLightish(currentColor) ? defaults.offBlack : defaults.offWhite

const derived = {
  primaryInverse: fn.getInverse(defaults.primaryColor),
  secondaryInverse: fn.getInverse(defaults.secondaryColor),
  boxShadow: `0 ${defaults.shadowSize + 1}px ${defaults.shadowSize}px -${Math.max(defaults.shadowSize - 1, 0)}px rgba(0,0,0,0.4)`
}

export default {
  ...defaults,
  ...derived,
  ...fn
}

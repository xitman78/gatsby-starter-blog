import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = ({rhythm, scale}) => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    "h1": {
      fontFamily: 'Merriweather',
      fontWeight: '700',
      fontSize: scale(1.1).fontSize,
      lineHeight: scale(1.1).lineHeight,
    },
    "h3": {
      fontFamily: 'Merriweather',
      fontWeight: '600',
      fontSize: scale(0.4).fontSize,
      //lineHeight: scale(0.5).lineHeight,
    },
  }
}

Wordpress2016.bodyFontFamily = ['Source Serif Pro'];
Wordpress2016.baseFontSize = '18px';

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale

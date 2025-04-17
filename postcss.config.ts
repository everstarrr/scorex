import { Plugin } from 'postcss'

interface AutoprefixerOptions {
  overrideBrowserslist?: string[]
}

interface PostCSSConfig {
  plugins: {
    [key: string]: Plugin | AutoprefixerOptions | boolean
  }
}

const config: PostCSSConfig = {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: [
        '>1%',
        'last 4 versions',
        'not dead'
      ]
    } as AutoprefixerOptions
  }
}

export default config
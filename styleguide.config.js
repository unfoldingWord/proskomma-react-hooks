const path = require('path');
module.exports = {
  usageMode: 'expand',
  exampleMode: 'expand',
  components: 'src/documentation/**/*.{js,jsx,ts,tsx}',
  moduleAliases: { 'proskomma-react-hooks': path.resolve(__dirname, 'src') },
  getComponentPathLine: componentPath => {
    const name = path.basename(componentPath, '.js')
    return `import { ${name.split('.')[0]} } from 'proskomma-react-hooks';`
  },
  handlers: componentPath => (
    require('react-docgen').defaultHandlers.concat(
      require('react-docgen-external-proptypes-handler')(componentPath),
      require('react-docgen-displayname-handler').createDisplayNameHandler(componentPath)
    )
  ),
  // styles: {
  //   stringValue: { whiteSpace: 'pre' },
  // }
};
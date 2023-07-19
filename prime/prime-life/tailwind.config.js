/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  "./node_modules/flowbite/**/*.js"
  ],
  darkMode:"class",
  theme: {
    extend: {
      fontFamily:{
        myfontfamily:"Open Sans",
      },
    fontSize:{
      myfontsize:"20px",
      myfontsizeeee:"19px",
     tilemyfontsizeeee:"18px",
    },
    letterSpacing:{
      myletterspacing:'0'
    },
    fontWeight:{
      myfontweight:"200",
      myfontweightttt:"600"
    },
    colors:{
      mycolor:'#0056b3',
      Smycolor:'#F9D308',
      darkModeColor:'#0F172A'
    }
    

    },
  },
  plugins: [require('flowbite/plugin')],
}
# Build for testing
Either run 'npm run start' or invoke/click on '_start.bat', a browser tab should open on your default browser, on 'localhost:3000/warfarm'

# Build for prod
Either run 'npm run build' or invoke/click on '__build.bat', the build will be inside the 'out/' folder

'__serve.bat' should be to test the export locally, but right now it doesn't work (seems to be due to the way basePath is set in the config, which is necessary for the build to work on GitHub Pages)

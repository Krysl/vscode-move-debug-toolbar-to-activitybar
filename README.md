# Move VSCode "debug-toolbar" to Activity Bar

[![screen recording](https://user-images.githubusercontent.com/5905801/232450757-84fdbbee-85f2-4cf0-9ef3-314433dd6012.png)](https://user-images.githubusercontent.com/5905801/232447929-67c23793-e2a6-433c-bdc2-c96c96fc8613.mp4)

> [Debug Toolbar often blocks file names](https://github.com/microsoft/vscode/issues/2513).  
> Currently the debug actions pane is always displayed at the top center position. This often blocks the file names.  
> ![](https://cloud.githubusercontent.com/assets/5600301/12657076/68b60460-c5b6-11e5-8580-cc8fc297a9fb.png)  
> It would be helpful to find a better place for the pane or add the ability to move the debug actions pane.  

So, I write some code to move it. 
Thanks for the extension [Custom CSS and JS Loader](https://marketplace.visualstudio.com/items?itemName=be5invis.vscode-custom-css), I can inject javascript code into VSCode.

## Installation
1. First, download the compiled js file "custom.js" in this page (https://github.com/Krysl/vscode-move-debug-toolbar-to-activitybar/releases/latest) to some place in you computer
2. Next, you will need to install the [Custom CSS and JS Loader](https://marketplace.visualstudio.com/items?itemName=be5invis.vscode-custom-css) extension from Visual Studio Code Marketplace. Be sure to carefully follow the instructions provided with the extension, so that VS Code can patch itself properly.
3. Finally, open your VS Code settings.json file and add the following lines. 
    ```json
    "vscode_custom_css.imports": [
        "file:///D:/path/to/the/file/custom.js",
      ],
    ```

## special thanks
- @n370
  - Original code posted in [comments](https://github.com/microsoft/vscode/issues/2513#issuecomment-348506599) inspired me a lot
- @be5invis
  - An awesome [extension](https://github.com/be5invis/vscode-custom-css) makes this idea a reality

#exactribution-ga plugin

A Universal Analytics plugin to enhance the accuracy of Google Analytics. Re-attributes traffic from 'dark social' to 'toolbar / shared' and optionally hard-codes in returning visits as '(direct) / (none)' instead of preserving campaign information (for more information on this, [read this Google documentation](https://developers.google.com/analytics/devguides/platform/campaign-flow).

##Getting Started

###Requirements
In order for this plugin to work, you must not be supplying a custom client ID.

###Implementation
Include the plugin script below where the Google Analytics Tag is loaded.

    <!-- Incorrect -->
    <script src="/exactribution.ga.js" type="text/javascript"></script>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-XXXXXX-YY', 'auto');
      ga('send', 'pageview');

    </script>
    
    <!-- Correct -->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-XXXXXX-YY', 'auto');
      ga('send', 'pageview');

    </script>
    <script src="/exactribution.ga.js" type="text/javascript"></script>

Use the 'require' command immediately after the 'create' command to include the plugin. Pass it the name of the plugin and a configuration object.

    // Incorrect
    ga('create', 'UA-XXXXXX-YY', 'auto');
    ga('send', 'pageview');
    ga('require', 'exactribution', {forceDirect: true, customDimension: 1});

    // Correct
    ga('create', 'UA-XXXXXX-YY', 'auto');
    ga('require', 'exactribution', {forceDirect: true, customDimension: 1});
    ga('send', 'pageview');
    
###Config
####config.forceDirect
If set to true, it will manually write in (direct) / (none) when no referrer is present.

####config.customDimension
If a value is present, it will try and store any referring CIDs as the supplied Custom Dimension.

###Warnings
This plugin will overwrite whatever is in the anchor (everything past the # in your URL) once it fires. If your website makes extensive use of the anchor for navigation, this could severely damage the user experience.

#exactribution Google Analytics Plugin

A Universal Analytics plugin to enhance the accuracy of Google Analytics. Re-attributes traffic with no referral information with a stored, non-matching client ID to 'toolbar / shared'.

##Getting Started

###Requirements
In order for this plugin to work, you must not be supplying a custom client ID - just the Google Analytics default setting. You'll also need to modify your on-page code.

###Implementation
Include the plugin script below where the Google Analytics Tag is loaded.

    <!-- Incorrect Placement -->
    <script src="/exactribution.js" type="text/javascript"></script>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-XXXXXX-YY', 'auto');
      ga('send', 'pageview');

    </script>
    
    <!-- Correct Placement -->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-XXXXXX-YY', 'auto');
      ga('send', 'pageview');

    </script>
    <script src="/exactribution.js" type="text/javascript"></script>

Modify your default snippet to include the 'require' command immediately after the 'create' command to include the plugin. Pass it the name of the plugin and a configuration object.

    // Incorrect
    ga('create', 'UA-XXXXXX-YY', 'auto');
    ga('send', 'pageview');
    ga('require', 'exactribution', {customDimension: 1});

    // Correct
    ga('create', 'UA-XXXXXX-YY', 'auto');
    ga('require', 'exactribution', {customDimension: 1});
    ga('send', 'pageview');
    
###Config

####config.customDimension
If a stored client ID from a referring user is present, it will be stored in the supplied dimension index.

###Warnings
This plugin will overwrite whatever is in the anchor (everything past the # in your URL) once it fires. If your website makes extensive use of the anchor for navigation, this could severely damage the user experience. Please be careful about deploying this plugin and test thoroughly - **it could break your entire website** - you have been warned.

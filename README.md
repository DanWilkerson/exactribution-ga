#ga-url-share-plugin
===================

A plugin to track when users share URLs from the toolbar using the Google Analytics & force direct traffic 

##Getting Started

###Requirements
In order for this plugin to work:
- You must be using Universal Analytics 
- You must include the exactribution.js script below the Google Analytics snippet

    <!-- Incorrect -->
    <script src="/exactribution.js" type="text/javascript"></script>
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
    <script src="/exactribution.js" type="text/javascript"></script>

- You must not be using a custom client ID
    
###Config
####config.forceDirect
If set to true, it will manually write in (direct) / (none) when no referrer is present.

####config.customDimension
If a value is present, it will try and store any referring CIDs as the supplied Custom Dimension.

###Warnings
This plugin will overwrite whatever is in the anchor (everything past the # in your URL) once it fires. If your website makes extensive use of the anchor for navigation, this could severely damage the user experience.

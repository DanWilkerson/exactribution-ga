ga-url-share-plugin
===================

A plugin to track when users share URLs from the toolbar using the Google Analytics &amp; the Measurement Protocol

##Getting Started

###Requirements
In order for this plugin to work, you need to already be storing your users' Client ID as a Custom Dimension. To do this, create a Custom Dimension called Client ID and adjust your default tracking code to store the "clientId" value of your tracker.

###Config
You must replace the following values added to the end of the script with actual values:
"UA_NUMBER" - the UA number of the account you want to send the data into. Currently this plugin only supports one UA number.
"OPT_GLOBAL_OBJECT_NAME" - If you've renamed your global GA object from the default ( "ga" ), enter the new object name here.
"OPT_CUSTOM_DIMENSION_NUMBER" - Stores the client ID of the referred user in association with the client ID of the referring user. Useful for mapping how users share with one another
"OPT_CUSTOM_METRIC_NUMBER" - Increments a counter of the client ID who referred the user. Useful for determining what users refer the most traffic to your site.

###Warnings
This plugin will overwrite whatever is in the anchor (everything past the # in your URL) once it fires. If your website makes extensive use of the anchor for navigation, this could severely damage the user experience.

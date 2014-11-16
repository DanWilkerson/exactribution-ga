<script>

  ( function( document, window, uaNumber, globalObjectName, customDimensionNumber, customMetricNumber ) {

    if( uaNumber === "UA-XXXXX-XX" || typeof uaNumber === 'undefined' ) {

      throw "UA Number must be defined.";
    
    }

    if( customDimensionNumber === "OPT_CUSTOM_DIMENSION_NUMBER" && customMetricNumber === "OPT_CUSTOM_METRIC_NUMBER" ) {

      throw "You must assign a Custom Dimension or Custom Metric for tracking.";

    }

    var compressNum = {

     encodeNumber: function( baseTen ) {

        if( isNaN( parseInt( baseTen ) ) ) {

          return false;

        }

        var alphabet      = {0:"A",1:"B",2:"C",3:"D",4:"E",5:"F",6:"G",7:"H",8:"I",9:"J",10:"K",11:"L",12:"M",13:"N",14:"O",15:"P",16:"Q",17:"R",18:"S",19:"T",20:"U",21:"V",22:"W",23:"X",24:"Y",25:"Z",26:"a",27:"b",28:"c",29:"d",30:"e",31:"f",32:"g",33:"h",34:"i",35:"j",36:"k",37:"l",38:"m",39:"n",40:"o",41:"p",42:"q",43:"r",44:"s",45:"t",46:"u",47:"v",48:"w",49:"x",50:"y",51:"z",52:"0",53:"1",54:"2",55:"3",56:"4",57:"5",58:"6",59:"7",60:"8",61:"9",62:"-",63:"_",64:"$",65:".",66:"+",67:"!",68:"*",69:"'",70:"(",71:")"};
        var baseSixtyFour = "";
        var number        = baseTen;

        while( number !== 0 ) {

          var n         = alphabet[ number % 72 ];
          number        = Math.floor( number / 72, 0 );
          baseSixtyFour = n + baseSixtyFour;

        }

        return baseSixtyFour;

      },

      decodeNumber: function( baseSixtyFour ) {

        var baseSixtyFour = baseSixtyFour.toString();

        var alphabet = {A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,a:26,b:27,c:28,d:29,e:30,f:31,g:32,h:33,i:34,j:35,k:36,l:37,m:38,n:39,o:40,p:41,q:42,r:43,s:44,t:45,u:46,v:47,w:48,x:49,y:50,z:51,0:52,1:53,2:54,3:55,4:56,5:57,6:58,7:59,8:60,9:61,"-":62,_:63,$:64,".":65,"+":66,"!":67,"*":68,"'":69,"(":70,")":71};
        var baseTen  = "";
        var number   = baseSixtyFour;

        for ( var i = 0; i < baseSixtyFour.length; i++ ) {

          var n  = number.charAt(i);
          baseTen = baseTen * 72 + ( alphabet[ n ] + 0 );

        }

        return baseTen;

      }

    };

    var clientEncodingService = {

      encodeClientId: function( id ) {

        var encodedId = false;
        var idParts   = id.split( /\./g );

        if( idParts.length === 2 ) {

          encodedId = compressNum.encodeNumber( idParts[0] ) + "." + compressNum.encodeNumber( idParts[1] );

        }

        return encodedId;

      },

      decodeClientId: function( id ) {

        var decodedId = false;
        var idParts = id.split( /\./g );

        if( idParts.length === 2 ) {

          decodedId = compressNum.decodeNumber( idParts[0] ) + "." + compressNum.decodeNumber( idParts[1] );

        }

        return decodedId;

      }

    };


    var ga          = window[ globalObjectName ] || window.ga;
    var cid         = getCid( uaNumber );
    var encodedCid  = cid ? clientEncodingService.encodeClientId( cid ) : false;
    var currentHash = document.location.hash.replace( "#", '');

    if( !cid ) {

      throw "There is no CID set";

    }

    if( cid.search( /\d+\.\d+$/ ) === -1 ) {

      throw "This plugin doesn't currently support custom client IDs.";

    }

    if( currentHash.length > 0 ) {

      var decodedHashValues = clientEncodingService.decodeClientId( currentHash );
      var sendGaHit         = checkIfDifferentId( decodedHashValues, cid );

      if( sendGaHit ) {

        var config = {

          "tid": uaNumber,
          "cid": decodedHashValues,
          "ec" : "Piggyback Event",
          "ea" : "Cross-user Plugin",
          "el" : cid,
          "ev" : 0,
          "ni" : 1

        }

        if( customDimensionNumber !== "OPT_CUSTOM_DIMENSION_NUMBER" ) {

          config[ "cd" + customDimensionNumber ] = cid;

        }


        if( customMetricNumber !== "OPT_CUSTOM_METRIC_NUMBER" ) {

          config[ "cd" + customMetricNumber ] = 1;

        }

        sendGaEvent( config );

      }

    }

    if( encodedCid && encodedCid !== currentHash ) {

      document.location.hash = encodedCid;

    }

    function getCid( uaNumber ) {

      var availableTrackers = ga.getAll();

      for( var i = 0; i < availableTrackers.length; i++ ) {

        if( availableTrackers[i].get( "trackingId" ) === uaNumber ) {

          return availableTrackers[i].get( "clientId" );

        }

      }

      return false;

    }

    function checkIfDifferentId( value, cid ) {

      var isStoredId    = false;
      var isDifferentId = true;

      if( value.search( /\d{8,10}.\d{10}$/ ) > -1 ) {

        isStoredId = true;

      }

      if( value === cid ) {

        isDifferentId = false;

      }

      return ( isStoredId && isDifferentId );

    }

    function sendGaEvent( config ) {

      var parameterArray = [];
      var xhr            = new XMLHttpRequest();

      config.v = "1";
      config.t = "event";

      for( var i in config ) {

        if( config[i] ) {

          parameterArray.push( i + "=" + encodeURIComponent( config[i] ) );

        }

      }

      var payload = parameterArray.join( "&" );

      xhr.open( "POST", "http://www.google-analytics.com/collect", true );

      xhr.send( payload );

    }

  } )( document, window, "UA_NUMBER", "GLOBAL_OBJECT_NAME", "OPT_CUSTOM_DIMENSION_NUMBER", "OPT_CUSTOM_METRIC_NUMBER" );

</script>
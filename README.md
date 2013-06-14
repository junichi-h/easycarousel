[jQuery](http://jquery.com/) - plugin :: easycarousel
======================

This plugin is to make infinity carousel very easily using jQuery.
usage
------
### sample code ###
    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="jquery.easycarousel-min.js"></script>
    <script type="text/javascript">
      jQuery('.carousel ul').easyCarusel({
        duration: 2400,
        hasIndicator: true,
        indi: jQuery('#indicator ul')
      });
    </script>


parameter
----------------
+   `shownTime` :  Number
    time how much time you want show.


+   `duration` :  Number
    animation speed.


+   `easing` :  Function
    easing type. have to check [jQuery.easing](http://gsgd.co.uk/sandbox/jquery/easing/)

+   `hasIndicator` :  Boolean
    have indicator button or not.

+   `indi` :  Object
    jQuery Object, indicator button DOM.

+   `on` :  String
    class name which is to activate for inidicator button.
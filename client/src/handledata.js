//Store data for mapping and plotting
var pastLocations = []; //Should be [lon,lat]
var altitudes = [];     //Should be [time (seconds), alt]
var tracker = [];       //Used to track points of the Rocket with long, Lat, Alt
var speed = [];         //Captures the distance between the current point and the last point
var verticalVelocity = []; 

var t0 = -1;

//For now, temporarily during testing, "time" will just be an integer index.
// Sometime soon I'll make sure a timestamp gets added server-side
// which can then be converted to "seconds since recording started" here.
timeIndex = 0;

function handle(data){
    // Show text =================================================
    var label = document.getElementById("datafield");
    if(label != null){
        label.innerHTML = data["raw"]
    }

    document.getElementById("longitude").innerHTML = Math.round(data["longitude"] * 100) / 100;
    document.getElementById("latitude").innerHTML = Math.round (data["latitude"] * 100) / 100;
    document.getElementById("altitude").innerHTML = Math.round (data["altitude"] * 100) / 100;

    var lat = data["latitude"];
    var lon = data["longitude"];
    var alt = data["altitude"];
    //set global variables to current latlon
    centerlat = lat;
    centerlon = lon;
    // Figuring out speed with lon, lat and alt
    var x = alt * Math.cos(lat) * Math.sin(lon);
    var y = alt * Math.sin(lat);
    var z = alt * Math.cos(lat) * Math.sin(lon);
    var point = [x,y,z];

    // Display current position on map ============================
    var rocketIcon = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon,lat])),
        name: "Rocket"
    });

    currentPositionSource.clear();                //Remove previous markers 
    currentPositionSource.addFeature(rocketIcon); //Add the new marker
   
    // Add to trail on map ========================================
    pastLocations.push([lon,lat]);
    var points = pastLocations.map(x => ol.proj.fromLonLat(x));
    var newLine = new ol.Feature({
        geometry: new ol.geom.LineString(points),
        name: "Rocket trail"
    });

    // There's probably an O(1) way to do this, rather than the current O(n),
    // But O(n) is fine for now.
    trailSource.clear();
    trailSource.addFeature(newLine); 

    // Record altitude for plotting ===============================

    // old:
    //altitudes.push([timeIndex,data["altitude"]]);

    // new:
    if (altitudes.length == 0){
        // Set "start time"
        t0 = parseFloat(data["timestamp"]);
    }
    timediff = (parseFloat(data["timestamp"])-t0)/1000; //Seconds since t0
    console.log(data["timestamp"] + " " + t0);
    altitudes.push([timediff,data["altitude"]]);
   
    // Record points of the rocket in $tracker
    // Record the distance between the points in $speed.
    tracker.push(point);
    if(tracker.length == 1){
        speed.push([timeIndex,0]);
    }
    else{
        // calculate speed based on tracker
        var lastPoint = tracker[tracker.length-2];
        var dist = Math.sqrt(Math.pow(point[0]-lastPoint[0], 2) + Math.pow(point[1]-lastPoint[1], 2) + Math.pow(point[2]-lastPoint[2], 2));
        speed.push([timeIndex,dist]);
    }

    timeIndex += 1;

    //tempData = [[[0,10],[2,5],[3,7]]];
    /*
    $.plot($("#flotAltitudeChart"),[altitudes],{});
    $.plot($("#flotSpeedChart"),[speed],{});
    */

}

//Update map to current position of rocket's lat long

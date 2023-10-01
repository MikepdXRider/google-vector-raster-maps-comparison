

//cache that goodness
const elMapContainer = document.getElementById("map-container");
const isVectorView = window.location.href.includes('/vector/');


// unpack query params
const urlSearchparams = new URLSearchParams(window.location.search);
const QUERY_API_KEY = urlSearchparams.get('api_key');
const VECTOR_MAP_ID = urlSearchparams.get('vector_map_id');
const OPTIMIZE_MARKERS = urlSearchparams.get('optimize_markers');
const ADVANCED_MARKERS = urlSearchparams.get('advanced_markers');
let QUERY_MARKER_COUNT = Number(urlSearchparams.get('marker_count'));

// validate query params
const areBaseQueryParamsInvalid = !QUERY_API_KEY || QUERY_MARKER_COUNT == NaN;
const areVectorQueryParamsInvalid = areBaseQueryParamsInvalid || !VECTOR_MAP_ID
if(isVectorView && areVectorQueryParamsInvalid){
    throw new Error("Invalid vector_map_id query param");
} else if (areBaseQueryParamsInvalid){
    throw new Error("Invalid api_key and/or marker_count query params");
}
if(QUERY_MARKER_COUNT > 25000){
    console.error("Marker_count must be 25000 or less. Defaulting to 25000 markers");
    QUERY_MARKER_COUNT = 25000;
}

// used for logging
let initializing = true;


// some basic helper functions to keep things readable and consistent
const formatLngLatObj = (lng, lat) => {return {lat, lng}};
const formatValidRange = (low, high) => {return {low, high}};

/**
 * 
 * @param {int} desiredMarkerCount - The number of desired individual markers data
 * @returns {array} Array of objects containing marker position data
 * @example 
 * returns
 *    [  
 *      { lng: exampleValue, lat: exampleValue },
 *      { lng: exampleValue, lat: exampleValue },
 *    ]
 * 
 */
function generateMarkerData(desiredMarkerCount){
    const validLatRange = formatValidRange(-80, 80);
    const validLngRange = formatValidRange(-150, 150);

    const markerDataArr = []; // gets populated by for loop
    let currLat = validLatRange.low;
    let currLng = validLngRange.low;
    for(let i = 1; i<=desiredMarkerCount; i++) {
        if(currLng == validLngRange.high){
            currLat++
            currLng = validLngRange.low
        }
        const markerData = formatLngLatObj(currLng, currLat);
        markerDataArr.push(markerData)
        currLng++
    }

    return markerDataArr;
}

function setupPerformanceLogs(googleMap) {
    let dragEvent = false;
    googleMap.addListener('dragend', function() {
        console.time('Dragend ➡️ Idle');
        dragEvent = true;
    });

    googleMap.addListener('idle', function() {
        if(dragEvent){
            console.timeEnd('Dragend ➡️ Idle');
            dragEvent = false;
        }
    });
    
    googleMap.addListener('tilesloaded', function() {
        if(initializing){
            console.timeEnd('Init ➡️ Tiles Loaded');
            initializing = false;
        }
    });

}


/**
 * 
 * @param {instance} GoogleMapInstance 
 * @param {object} lngLatObj 
 * 
 * @description Sets a marker on the map. Also appends the new marker data to the `window.GOOGLE_MARKERS_ARRAY` value.
 * 
 */
function setMarkers(GoogleMapInstance, markerData, markerInitializer){
    if(!window.GOOGLE_MARKERS_ARRAY){
        window.GOOGLE_MARKERS_ARRAY = [];
    }

    const markerOptions = {
        map: GoogleMapInstance,
    }

    if(OPTIMIZE_MARKERS !== null && !ADVANCED_MARKERS){
        markerOptions.optimize = OPTIMIZE_MARKERS === 'false' ? false : true;
    }

    markerData.forEach((lngLat) => {
        const newMarker = new markerInitializer({...markerOptions, position: lngLat})
        window.GOOGLE_MARKERS_ARRAY.push(newMarker)
    });
}


/**
 *
 *  @description 
 * * sets google maps initialization options
 * * defaults to raster map.
 * * if in vector view, initializes with vector map id.
 * * calls generateMarkerData
 * * loops markerData and calls setMarker
 * 
 * @use 
 * used as a callback in the javascript google maps script src attribute
 * 
 */
async function initMap () {
    console.time('Init ➡️ Tiles Loaded');

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    //set options - keep as simple as possible   
    const googleMapOptions = {
        center: { lat: -77, lng: -51 },
        zoom: 3,
        // prevents gray bars on pan
        restriction: {
            latLngBounds: {
                north: 85,
                south: -85,
                west: -180,
                east: 180
            }
        },
        minZoom: 3,
        maxZoom: 12,
    }

    //  if in vector map, set the mapId to trigger vector map time
    if(isVectorView) googleMapOptions.mapId = VECTOR_MAP_ID;

    // 🚀 send it!
    const googleMap = new Map(elMapContainer, googleMapOptions);
    // save it to window for review
    window.GOOGLE_MAP = googleMap;
    
    // generate marker data
    const markerDataArr = generateMarkerData(QUERY_MARKER_COUNT);
    const finalMarkerType = ADVANCED_MARKERS ? AdvancedMarkerElement : google.maps.Marker
    setMarkers(googleMap, markerDataArr, finalMarkerType);

    setupPerformanceLogs(googleMap);
};


// Create the script tag, set the appropriate attributes/params
const elScript = document.createElement('script');
elScript.src = `https://maps.googleapis.com/maps/api/js?key=${QUERY_API_KEY}&callback=initMap`;
elScript.async = true;
// Append the 'script' element to 'head'
document.head.appendChild(elScript);



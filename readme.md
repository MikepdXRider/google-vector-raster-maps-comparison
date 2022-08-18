### Google Vector vs. Raster Map Comparison
A light-weight app built to view/test the performance of Google's Vector v. Raster map types. 

### Setting up local environment/server
- Clone repo down into local system
- `npm i` in terminal
- Launch live/local server - Recommend using [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for easy live/local server management. 

### Things you'll need
- In order to generate a raster and vector map, you will need a [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#create-api-keys). 
- In order to generate a vector map, you will need a [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#create-api-keys) and [Google Vector Maps Map Id](https://developers.google.com/maps/documentation/javascript/webgl#vector-id).

### How to use
To present an easy-to-use API for initializing and viewing maps, all necessary information to initialize maps is passed via query params.
#### Raster map
- Navigate to `domain/raster/?api_key=<placeholder>?marker_count=<placeholder>`
- Replace placeholders with your Google Maps API Key and the number of desired markers. 
- Example: `localhost:5500/raster/?api_key=0123456789
#### Vector Map
- Navigate to `domain/vector/?api_key=<placeholder>?vector_map_id=<placeholder>?marker_count=<placeholder>`
- Replace placeholders with your Google Maps API Key, Google Maps Vector Map Id, and number of desired markers.
#### General/limitations
- Marker count is limited to 25000 markers. If a value larger than 25000 is passed in the 'marker_count' param, the map will only render 25000 markers. 




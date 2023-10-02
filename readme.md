### Google Vector vs. Raster Map Comparison
A light-weight app built to view/test the performance of Google's Vector v. Raster map types. 

### Setting up local environment/server
- Clone repo down into local system
- `npm i` in terminal
- `npm run start` to compile javascript and build live server.
- `npm run build` to compile javascript. 

### Things you'll need
- In order to generate a raster and vector map, you will need a [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#create-api-keys). 
- In order to generate a vector map, you will need a [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#create-api-keys) and [Google Vector Maps Map Id](https://developers.google.com/maps/documentation/javascript/webgl#vector-id).

### How to use
To present an easy-to-use API for initializing and viewing maps, all necessary information to initialize maps is passed via query params.
#### Raster map
- Navigate to `domain/raster/?api_key=<placeholder>&marker_count=<placeholder>&optimize_markers=<placeholder>`
- Replace placeholders with your Google Maps API Key and the number of desired markers. The `optimize_markers` query param is optional. If ommited, google with automatically handle optimization, passing true or false forces the setting. 
- Example: `localhost:5500/raster/?api_key=0123456789&marker_count=500
#### Vector Map
- Navigate to `domain/vector/?api_key=<placeholder>?vector_map_id=<placeholder>&marker_count=<placeholder>&optimize_markers=<placeholder>`
- Replace placeholders with your Google Maps API Key, Google Maps Vector Map Id, and number of desired markers. The `optimize_markers` query param is optional. If ommited, google with automatically handle optimization, passing true or false forces the setting. 
#### General/limitations
- Marker count is limited to 25000 markers. If a value larger than 25000 is passed in the 'marker_count' param, the map will only render 25000 markers. 
### Helpful Resources
- [Google Maps Javascript API Documentation](https://developers.google.com/maps/documentation/javascript)
- [Google Marker Clustering](https://developers.google.com/maps/documentation/javascript/marker-clustering)
- [Google Markers Examples](https://developers.google.com/maps/documentation/javascript/examples/marker-simple)
- [Google Map Examples](https://developers.google.com/maps/documentation/javascript/examples/map-simple)
- [Webpack](https://webpack.js.org/)



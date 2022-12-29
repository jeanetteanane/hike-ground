mapboxgl.accessToken = tokenMap;
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: hikeground.geometry.coordinates, // starting position [lng, lat]
    zoom: 7, // starting zoom
  });

  map.addControl(new mapboxgl.NavigationControl());

  new mapboxgl.Marker()
    .setLngLat(hikeground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset:25})
        .setHTML(
            `<h3>${hikeground.title}</h3><p>${hikeground.location}</p>`
        )
    )
    .addTo(map)

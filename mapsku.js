// Inisialisasi peta dengan posisi tengah Kabupaten Pesawaran
var map = L.map('mapsku').setView([-5.45, 105.1], 10);

// Tile layer
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors | Tiles by Humanitarian OpenStreetMap Team'
}).addTo(map);

// Popup khusus Cagar Budaya
function popCagarBudaya(feature, layer) {
  const nama = feature.properties?.NAMOBJ || feature.properties?.name || "Tanpa Nama";
  layer.bindPopup(`<strong>Cagar Budaya:</strong> ${nama}`);
}

// Popup khusus Kantor Pos
function popKantorPos(feature, layer) {
  const nama = feature.properties?.NAMOBJ || feature.properties?.name || "Tanpa Nama";
  layer.bindPopup(`<strong>Kantor Pos:</strong> ${nama}`);
}

// Popup khusus SPBU
function popSPBU(feature, layer) {
  const nama = feature.properties?.NAMOBJ || feature.properties?.name || "Tanpa Nama";
  layer.bindPopup(`<strong>SPBU:</strong> ${nama}`);
}

// Batas Administrasi
var batasAdm = new L.GeoJSON.AJAX("administrasi_pesawaran.geojson", {
  style: {
    color: "#FF5733",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.1
  }
}).addTo(map);

// Cagar Budaya
var cagarBudaya = new L.GeoJSON.AJAX("cagar_budaya.geojson", {
  onEachFeature: popCagarBudaya,
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 8,
      fillColor: "#FFD700", // emas
      color: "#FFA500",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.85
    });
  }
}).addTo(map);

// Kantor Pos
var kantorPos = new L.GeoJSON.AJAX("kantor_pos.geojson", {
  onEachFeature: popKantorPos,
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 8,
      fillColor: "#007bff", // biru
      color: "#0056b3",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.85
    });
  }
}).addTo(map);

// SPBU
var spbu = new L.GeoJSON.AJAX("spbu.geojson", {
  onEachFeature: popSPBU,
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 8,
      fillColor: "#ff4d4d", // merah terang
      color: "#cc0000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.85
    });
  }
}).addTo(map);

// Kontrol Layer
L.control.layers(null, {
  "Batas Administrasi": batasAdm,
  "Cagar Budaya": cagarBudaya,
  "Kantor Pos": kantorPos,
  "SPBU": spbu
}, {
  collapsed: false
}).addTo(map);
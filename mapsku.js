// Inisialisasi peta dengan posisi tengah Kabupaten Pesawaran
var map = L.map('mapsku').setView([-5.45, 105.1], 10);

// Tambahkan tile layer
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors | Tiles by Humanitarian OpenStreetMap Team'
}).addTo(map);

// Fungsi popup universal dengan penanganan properti yang fleksibel
function buatPopup(jenis) {
  return function(feature, layer) {
    let nama = "Tanpa Nama";
    if (feature.properties) {
      if (feature.properties.NAMOBJ && feature.properties.NAMOBJ.trim() !== "") {
        nama = feature.properties.NAMOBJ;
      } else if (feature.properties.name && feature.properties.name.trim() !== "") {
        nama = feature.properties.name;
      } else {
        const fallback = Object.values(feature.properties).find(
          val => typeof val === 'string' && val.trim() !== ""
        );
        if (fallback) nama = fallback;
      }
    }
    layer.bindPopup(`<strong>${jenis}:</strong> ${nama}`);
  };
}

// Layer Batas Administrasi
var batasAdm = new L.GeoJSON.AJAX("administrasi_pesawaran.geojson", {
  style: {
    color: "#FF5733",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.1
  },
  onEachFeature: buatPopup("Wilayah") // Tambahkan popup ke polygon juga
}).addTo(map);

// Layer Cagar Budaya
var cagarBudaya = new L.GeoJSON.AJAX("cagar_budaya.geojson", {
  onEachFeature: buatPopup("Cagar Budaya"),
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 8,
      fillColor: "#FFD700", // Emas
      color: "#FFA500",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.85
    });
  }
}).addTo(map);

// Layer Kantor Pos
var kantorPos = new L.GeoJSON.AJAX("kantor_pos.geojson", {
  onEachFeature: buatPopup("Kantor Pos"),
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 8,
      fillColor: "#007bff", // Biru
      color: "#0056b3",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.85
    });
  }
}).addTo(map);

// Layer SPBU
var spbu = new L.GeoJSON.AJAX("spbu.geojson", {
  onEachFeature: buatPopup("SPBU"),
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 8,
      fillColor: "#ff4d4d", // Merah terang
      color: "#cc0000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.85
    });
  }
}).addTo(map);

// Kontrol Layer (Layer Switcher)
L.control.layers(null, {
  "Batas Administrasi": batasAdm,
  "Cagar Budaya": cagarBudaya,
  "Kantor Pos": kantorPos,
  "SPBU": spbu
}, {
  collapsed: false
}).addTo(map);

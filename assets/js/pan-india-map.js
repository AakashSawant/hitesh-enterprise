 // Initialize map centered on India
  var map = L.map('indiaMap').setView([22.9734, 78.6569], 5);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // State markers with approximate coordinates
  const states = [
    { name: "Gujarat", lat: 22.2587, lon: 71.1924 },
    { name: "Rajasthan", lat: 27.0238, lon: 74.2179 },
    { name: "Delhi", lat: 28.7041, lon: 77.1025 },
    { name: "Punjab", lat: 31.1471, lon: 75.3412 },
    { name: "Haryana", lat: 29.0588, lon: 76.0856 },
    { name: "Uttar Pradesh", lat: 26.8467, lon: 80.9462 },
    { name: "Madhya Pradesh", lat: 22.9734, lon: 78.6569 },
    { name: "Maharashtra", lat: 19.7515, lon: 75.7139 },
    { name: "Tamil Nadu", lat: 11.1271, lon: 78.6569 },
    { name: "Karnataka", lat: 15.3173, lon: 75.7139 },
    { name: "Telangana", lat: 18.1124, lon: 79.0193 },
    { name: "West Bengal", lat: 22.9868, lon: 87.8550 }
  ];

  states.forEach(state => {
    L.marker([state.lat, state.lon])
      .addTo(map)
      .bindPopup(`<strong>${state.name}</strong>`);
  });
import Feature from "ol/Feature.js";
import Geolocation from "ol/Geolocation.js";
import Map from "ol/Map.js";
import Point from "ol/geom/Point.js";
import View from "ol/View.js";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";
import { OSM, Vector as VectorSource } from "ol/source.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";

//Generar una vista con coordenadas y zoom iniciales
const view = new View({
  center: [-11322460.087016312, 2410083.6458656345],
  zoom: 15,
});

const geolocation = new Geolocation({
  // enableHighAccuracy must be set to true to have the heading value.
  trackingOptions: {
    enableHighAccuracy: true,
  },
  projection: view.getProjection(),
});
//Encontrar posición actual
geolocation.setTracking(true);

const source = new VectorSource({
  wrapX: false,
});

const vector = new VectorLayer({
  source: source,
});
//Crear mapa con sus capas
const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    vector,
  ],
  target: "map",
  view: view,
});
//Función para llamar elementos html por id
function el(id) {
  return document.getElementById(id);
}

// handle geolocation error.
geolocation.on("error", function (error) {
  const info = document.getElementById("info");
  info.innerHTML = error.message;
  info.style.display = "";
});
//Calculo de precisión 
const accuracyFeature = new Feature();
geolocation.on("change:accuracyGeometry", function () {
  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});

//Creación de punto para la posición propia
const positionFeature = new Feature();
positionFeature.setStyle(
  new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({
        color: "#3399CC",
      }),
      stroke: new Stroke({
        color: "#fff",
        width: 2,
      }),
    }),
  })
);
//Generación de halo para la posición propia
geolocation.on("change:position", function () {
  const coordinates = geolocation.getPosition();
  positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
});
//Creación de punto con la precisión 
new VectorLayer({
  map: map,
  source: new VectorSource({
    features: [accuracyFeature, positionFeature],
  }),
});

//Esquina superior izquierda
function addFixedFeature() {
  const coordinates = [-11324553.92342625,2411365.884843269];
  const geom = new Point(coordinates);
  const feature = new Feature(geom);
  feature.setStyle(
    new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({
          color: "#008000",
        }),
      }),
    })
  );
  source.addFeature(feature);
}
//Esquina superior derecha
function addFixedFeature2() {
    const coordinates = [-11320553.92342625,2411365.884843269];
    const geom = new Point(coordinates);
    const feature = new Feature(geom);
    feature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: "#008000",
          }),
        }),
      })
    );
    source.addFeature(feature);
  }
  //Esquina inferior derecha
function addFixedFeature3() {
    const coordinates = [-11320553.92342625,2408665.884843269];
    const geom = new Point(coordinates);
    const feature = new Feature(geom);
    feature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: "#008000",
          }),
        }),
      })
    );
    source.addFeature(feature);
  }

//Esquina inferior izquierda
function addFixedFeature4() {
    const coordinates = [-11324553.92342625,2408665.884843269];
    const geom = new Point(coordinates);
    const feature = new Feature(geom);
    feature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: "#008000",
          }),
        }),
      })
    );
    source.addFeature(feature);
}
//Llamada de funciones para ingresar puntos límite
addFixedFeature();
addFixedFeature2();
addFixedFeature3();
addFixedFeature4();
//Llamada de función para ingresar punto de coordenadas escritas
addFixedFeature5();

//Lógica para recibir información de pantalla anterior
document.getElementById("nombre").innerHTML = localStorage.getItem("textvalue1")
document.getElementById("latitud").innerHTML = localStorage.getItem("textvalue2")
document.getElementById("longitud").innerHTML = localStorage.getItem("textvalue3")

//Función para añadir coordenadas escritas
function addFixedFeature5() {
    const latitudRecibida = localStorage.getItem("textvalue2");
    const longitudRecibida = localStorage.getItem("textvalue3");
    const coordinates = [latitudRecibida,longitudRecibida];
    const geom = new Point(coordinates);
    const feature = new Feature(geom);
    feature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: "#ffff00",
          }),
          stroke: new Stroke({
            color: "#FF0000",
            width: 3,
          })
        }),
      })
    );
    source.addFeature(feature);
  }


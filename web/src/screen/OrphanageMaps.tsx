import React from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Map, TileLayer } from "react-leaflet";

import mapMarkerPng from "../images/map-marker.svg";

import "../styles/global.css";
import "../styles/screen/orphanage-map.css";
import "leaflet/dist/leaflet.css";

function OrphanageMaps() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerPng} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Caeté</strong>
                    <span>Minas Gerais</span>
                </footer>
            </aside>

            <Map
                center={[-19.8838259,-43.6564426]}
                zoom={14.25}
                style={{ width: "100%", height: "100%" }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </Map>

            <Link to="" id="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    );
}

export default OrphanageMaps;
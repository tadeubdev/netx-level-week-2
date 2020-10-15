import React, {useEffect, useState} from "react";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import mapMarkerPng from "../images/map-marker.svg";
import mapIcon from "../utils/mapIcons";

import "../styles/screen/orphanage-map.css";
import api from "../services/api";

interface Orphanage {
    id: number,
    name: string,
    latitude: number,
    longitude: number,
}

function OrphanageMaps() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get("orphanages").then(({ data }) => setOrphanages(data))
    }, []);

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

                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            icon={mapIcon}
                            position={[orphanage.latitude, orphanage.longitude]}
                            key={orphanage.id}
                        >
                            <Popup
                                closeButton={false}
                                minWidth={240}
                                maxWidth={240}
                                className="map-popup"
                            >
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={28} color="#fff" />
                                </Link>
                            </Popup>
                        </Marker>
                    );
                })}
            </Map>

            <Link to="/orphanages/create" id="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    );
}

export default OrphanageMaps;
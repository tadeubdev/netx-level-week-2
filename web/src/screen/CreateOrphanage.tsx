import React, {ChangeEvent, FormEvent, useState} from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import {LeafletMouseEvent} from "leaflet";
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import mapIcon from "../utils/mapIcons";
import '../styles/screen/create-orphanage.css';
import api from "../services/api";

export default function CreateOrphanage() {
  const initialPosition = {
    latitude: -19.8996461,
    longitude: -43.6687686,
  };

  const [position, setPosition] = useState({ latitude: 0, longitude: 0});

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [open_hours, setOpenHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const history = useHistory();

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();
    data.append("name", name);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("about", about);
    data.append("instructions", instructions);
    data.append("open_hours", open_hours);
    data.append("open_on_weekends", String(open_on_weekends));

    images.forEach(image => {
      data.append("images", image);
    })

    await api.post("orphanages", data);

    alert("Cadastro realizado com sucesso!");

    history.push("/app");
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });
    setPreviewImages(selectedImagesPreview);
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[initialPosition.latitude, initialPosition.longitude]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {position.latitude !== 0 && (
                  <Marker
                      interactive={false}
                      icon={mapIcon}
                      position={[
                          position.latitude,
                          position.longitude
                      ]}
                  />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                  id="name"
                  value={name}
                  onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                  id="name"
                  maxLength={300}
                  value={about}
                  onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                <label className="new-image" htmlFor="image[]">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

                {previewImages.map(image => {
                  return (
                      <img key={image} src={image} alt={name} />
                  );
                })}

                <input
                    type="file"
                    id="image[]"
                    multiple
                    onChange={handleSelectImages}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                  id="instructions"
                  value={instructions}
                  onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                  id="opening_hours"
                  value={open_hours}
                  onChange={event => setOpenHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                    type="button"
                    className={open_on_weekends? "active": ""}
                    onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                    type="button"
                    className={!open_on_weekends? "active": ""}
                    onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;

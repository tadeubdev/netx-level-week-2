import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";

import Orphanage from "../models/Orphanage";
import orphanageView from "../views/orphanages_view";

export default {

    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ["images"]
        });

        return response.status(201).json(orphanageView.renderMany(orphanages));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ["images"]
        });

        return response.status(201).json(orphanageView.render(orphanage));
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        await orphanagesRepository.delete(id);

        return response.status(201).json({ message: "Deleted successfully!" });
    },

    async create(request: Request, response: Response) {
        const {
            name, latitude, longitude, about, instructions, open_hours, open_on_weekends
        } = request.body;

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename };
        });

        const orphanagesRepository = getRepository(Orphanage);

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            open_hours,
            open_on_weekends: open_on_weekends === "true",
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            open_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const orphanage = orphanagesRepository.create(data);

        await orphanagesRepository.save(orphanage);

        return response.status(201).json(orphanage);
    }

};
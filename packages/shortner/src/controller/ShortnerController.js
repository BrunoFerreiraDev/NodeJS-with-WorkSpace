import crypto from 'crypto';
import parser from 'ua-parser-js';
import userAgent from 'user-agents';
import ShortnerModel from '../model/ShortnerModel.js';

class ShortnerController {
    async index(request, response) {
        const shortners = await ShortnerModel.find();
        response.json({ items: shortners });
    }

    async getOne(request, response) {
        const { id } = request.params;
        try {
            const shortner = await ShortnerModel.findById(id);

            if (!shortner) {
                return response.status(404).json({ message: 'Shortner not found' });
            }

            response.json({ shortner });
        } catch (error) {
            console.error(error);
            response.json({ message: 'An unexpected error happened' });
        }
    }

    async store(request, response) {
        const { link = '' } = request.body;
        const [hash] = crypto.randomUUID().split('-');

        if (!link.trim()) {
            return response.status(400).json({ message: 'link is missing' });
        }

        const shortner = await ShortnerModel.create({
            link,
            hash,
            ownerId: request.loggedUser.id,
        });

        response.json({ message: 'Shortner created', shortner });
    }

    async update(request, response) {
        const { link = '' } = request.body;
        const { id } = request.params;

        try {
            const shortner = await ShortnerModel.findByIdAndUpdate(id, { link }, { new: true });

            if (!shortner) {
                return response.status(404).json({ message: 'Shortner not found' });
            }

            response.json({ shortner });
        } catch (error) {
            console.error(error);
            response.json({ message: 'An unexpected error happened' });
        }
    }

    async remove(request, response) {
        const { id } = request.params;
        try {
            const shortner = await ShortnerModel.findById(id);

            if (!shortner) {
                return response.status(404).json({ message: 'Shortner not found' });
            }

            shortner.remove();

            response.json({ message: 'shortener removed' });
        } catch (error) {
            console.error(error);
            response.json({ message: 'An unexpected error happened' });
        }
    }

    async redirect(request, response) {
        const { hash } = request.params;

        const shortner = await ShortnerModel.findOne({ hash });

        if (!shortner) {
            return response.redirect('/');
        }

        const metadata = {
            ip: request.ip,
            parser: parser(request.headers['user-agent']),
            userAgent: new userAgent(request.headers['user-agent'].data),
        };

        shortner.hits += 1;
        shortner.metadata = [...shortner.metadata, metadata];

        await shortner.save();

        response.redirect(shortner.link);
    }
}

export default ShortnerController;

import Repository from "./Repository";
import Image from "../../dtos/Image";
import MongoQuery from "../MongoQuery";
import {Error, ImageType} from "../../Structures";

/**
 * name of database collection
 */
const COLLECTION_NAME = 'images'

/**
 * streamlines operations within the images collection
 */
class ImageRepository {

    /**
     * repository
     */
    private readonly repository: Repository<Image>

    constructor(db_name: string) {
        this.repository = new Repository(db_name, COLLECTION_NAME)
    }

    /**
     * generates image id from type and object id
     */
    private static generateImageId(type: ImageType, id: string){
        return `${type}-${id}`
    }

    /**
     * inserts an image in the collection
     */
    setImage(type: ImageType, id: string, body) {
        const image_id = ImageRepository.generateImageId(type, id)

        const query = new MongoQuery()
            .searchFor('id', image_id)

        return this.repository.update(query, new Image(image_id, body))
    }

    /**
     * retrieves an image by its type and id
     */
    async getImageById(type: ImageType, id: string) {
        const image_id = ImageRepository.generateImageId(type, id)

        const query = new MongoQuery()
            .searchFor('id', image_id)

        const results = await this.repository.select(query)
        if (results.length <= 0) return Promise.reject(new Error(`Image not found - ${image_id}.`))

        return results[0].body.buffer
    }

}

export default ImageRepository
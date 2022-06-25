import { Schema, model, Document } from 'mongoose';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

type Product = Document & {
    id: number,
    brand: string,
    description: string,
    image: string,
    price: number,
    createdAt: Date,
    updatedAt: Date
};

const productSchema = new Schema({
    id: {
        type: Number
    },
    brand: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number
    }
}, {
    versionKey: false,
    timestamps: true
});


productSchema.plugin(mongoosePagination);
export const Product: Pagination<Product> = model<Product, Pagination<Product>>('Product', productSchema);
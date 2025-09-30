import { CreateOptions, FlattenMaps, HydratedDocument, Model, PopulateOptions, ProjectionType, QueryOptions, RootFilterQuery } from "mongoose";

export type Lean<T> = HydratedDocument<FlattenMaps<T>>;
export abstract class DatabaseRepository<TDocument> {
    //Constructor
    constructor(protected readonly model: Model<TDocument>) { }

    async findOne({
        filter,
        select,
        options,
    }: {
        filter: RootFilterQuery<TDocument>,
        select?: ProjectionType<TDocument> | null,
        options?: QueryOptions<TDocument> | null,
    }): Promise<Lean<TDocument> | HydratedDocument<TDocument> | null> {
        let doc = this.model.findOne(filter).select(select || "");
        if(options?.populate) {
            doc.populate(options.populate as PopulateOptions[]);
        }
        if (options?.lean) {
            doc.lean(options.lean);
        }
        return await doc.exec();
    }


    //Create
    async create({
        data,
        options,
    }: {
        data: Partial<TDocument>[],
        options?: CreateOptions | undefined,
    }): Promise<HydratedDocument<TDocument>[] | undefined> {
        return await this.model.create(data, options);
    }
}
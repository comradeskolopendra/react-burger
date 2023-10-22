declare module "*.png" {
    interface IImages {
        [image: string]: string;
    }

    const images: IImages;

    export = images;
}
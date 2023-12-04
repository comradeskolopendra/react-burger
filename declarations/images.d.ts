declare module "*.png" {
    interface IImages {
        [image: string]: string;
    }

    const images: IImages;

    export = images;
}

declare module "*.jpg" {
    interface IImages {
        [image: string]: string;
    }

    const images: IImages;

    export = images;
}
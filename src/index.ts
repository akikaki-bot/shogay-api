
import { readdirSync } from "fs";
import express, { Router } from "express";

export class ShoheiAPI {

    private loaderPlugins : { plugin : ( ( req : express.Request, res : express.Response, next: express.NextFunction ) => void ), name : string }[] = [];

    constructor(){
        this.loaderPlugins = [];
    }

    public registerPlugin( name : string , plugin : ( ( req : express.Request, res : express.Response, next: express.NextFunction ) => void ) ): this {
        this.loaderPlugins.push({ plugin, name });
        return this;
    }

    public startServer( port : number = 3000 ): void {
        const app = express();
        const routes = this.getRoutes();

        app.use( express.json() );
        app.use( express.urlencoded({ extended: true }) );
        
        let loadedRoutes = 0;
        const totalRoutes = routes.length;
        
        console.log('[Loader] Loading routes...');
        Promise.all(
            routes.map( async route => {
                const router = (await import(route)).default as Router | void;
                if( typeof router === 'undefined' || !router || typeof router !== 'function' ){
                    console.error(`[Loader -> ERROR] File ${route} is not a valid router`);
                    return;
                }
                app.use( router );
                loadedRoutes++;
                console.log(`[Loader] (${loadedRoutes}/${totalRoutes}) ${router.stack[0].route?.path}`);

                if( loadedRoutes === totalRoutes ){
                    console.log('[Loader] All routes loaded');

                    this.loaderPlugins.forEach( ( plugin, index ) => {
                        console.log(`[Loader] (${index + 1}/${this.loaderPlugins.length}) ${plugin.name} plugin loaded`);
                        app.use( plugin.plugin );
                    })
                }
            })
        );

        app.listen(port, () => {
            console.log('[Server] Server is running on port '+port);
        });
    }

    public getRoutes(): string[] {
        const routes = readdirSync(`${__dirname}/router`, { withFileTypes: true });
        const routers : string[] = []

        routes.forEach( route => {
            if( route.isDirectory() ){
                this.getDirectoryFileLists(`${__dirname}/router/${route.name}`, (file : string) => {
                    routers.push(file);
                });
            } else {
                routers.push(`${__dirname}/router/${route.name}`);
            }
        });

        return routers;
    }

    public isDirectory(path: string): boolean {
        return !path.includes('.');
    }

    /**
     * 
     * @param {string} path - path to directory
     * @param {Function} callback - called when file is found
     * @returns 
     */
    public getDirectoryFileLists( path: string, callback : Function ): void { 
        const apiFiles = readdirSync(path, { withFileTypes: true });

        apiFiles.forEach( dirent => {
            const FileFullpath = `${path}/${dirent.name}`;
            if( dirent.isDirectory() ){
                this.getDirectoryFileLists( FileFullpath, callback );
            } else {
                return callback(FileFullpath)
            }
        });
    }
}
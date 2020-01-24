/**
 * Defines all the requisites in HTTP
 */

import compress from 'compression';
import express from 'express';
import userAgent from 'express-useragent';
import ipware from 'ipware';
import hbs from 'express-handlebars';
import path from 'path';
import Log from './Log';
import Locals from '../providers/Locals';

class Http {
    static mount(_express) {
        Log.info('Booting the \'HTTP\' middleware...');

        // Enables the request body parser
        _express.use(express.json({
            limit: Locals.config().maxUploadLimit,
        }));

        _express.use(express.urlencoded({
            limit: Locals.config().maxUploadLimit,
            parameterLimit: Locals.config().maxParameterLimit,
            extended: false,
        }));

        // Disable the x-powered-by header in response
        _express.disable('x-powered-by');

        // API requesed details in request
        _express.use(userAgent.express());

        // Enables the "gzip" / "deflate" compression for response
        _express.use(compress());

        // Client IP Address in request
        _express.use((req, res, next) => {
            // eslint-disable-next-line camelcase
            const { get_ip } = ipware();
            req.requestIp = get_ip(req);
            next();
        });

        // HandleBar engine for temp
        _express.set('views', path.join(__dirname, '../views/'));
        _express.set('view engine', 'hbs');
        _express.engine('hbs', hbs({
            extname: 'hbs',
            defaultView: 'main',
            layoutsDir: path.join(__dirname, '../views/layouts/'),
            partialsDir: path.join(__dirname, '../views/partials/'),
        }));

        return _express;
    }
}

export default Http;

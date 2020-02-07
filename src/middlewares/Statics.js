/**
 * Defines all the app-statics
 *
 */

import * as path from 'path';
import * as express from 'express';

import Log from './Log';

class Statics {
    static mount(_express) {
        Log.info('Booting the \'Statics\' middleware...');

        // Loads Options
        const options = { maxAge: 31557600000 };

        // Load Statics
        _express.use('/public', express.static(path.join(__dirname, '../../public')));

        // Load Contract
        _express.use('/contracts', express.static(path.join(__dirname, '../../build/contracts')));

        // Load NPM Statics
        _express.use('/vendor', express.static(path.join(__dirname, '../../node_modules'), options));

        return _express;
    }
}

export default Statics;
import DB from '../../../providers/Database';

export default {
    isLoggedIn: async () => ({
        success: true,
        msg: 'Query Succesfull',
    }),
    resyncDB: async () => {
        await DB.reSync();
        return {
            success: true,
            msg: 'DB reSync has be done  Succesfull',
        };
    },
};

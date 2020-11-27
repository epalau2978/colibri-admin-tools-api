// puerto

process.env.PORT = process.env.PORT || 3000;


//entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//data base


let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/colibri_admin_tools'
} else {

    urlDB = 'mongodb+srv://colibri-admin:aHsTKHQVdzcbrU5O@cluster0.ego7l.mongodb.net/colibri'
}



process.env.URLDB = urlDB;
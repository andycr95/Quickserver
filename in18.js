var config = {
	site: 
	{
		language: 'es',
		html: 
		{
		  engine: 'jade',
		  minify: true
	 	}
 	},
	application: 
    {
      langs: ['en', 'es'],
      languages: 'en|es'
    },
};
 
module.exports = config;
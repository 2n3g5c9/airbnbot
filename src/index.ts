if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}

require('dotenv').config()
require('./server.ts')

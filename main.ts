import {Server} from './server/server'
import { Router } from './common/router';
import { animalRouter } from './routes/animal.router';
import { vehicleRouter } from './routes/vehicle.router';


const server = new Server();

const routers : Router[] = [
    animalRouter,
    vehicleRouter,
]

server.bootstrap(routers)
      .then(server => {
          console.log(`Server is listening on: `, server.application.address());
      })
      .catch(error => {
          console.log('Server failed to start');
          console.error(error);

          //server é parado caso ocorra algum erro
          process.exit(1);
      })
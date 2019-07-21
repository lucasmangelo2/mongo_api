import {Router} from '../common/router';
import * as restify from 'restify';

import {NotFoundError} from 'restify-errors';
import { Vehicle } from '../models/vehicle.model';

class VehicleRouter extends Router {

    constructor(){
        super();
    }

    applyRoutes(application: restify.Server) {
        application.get('/vehicle', (req, resp, next) =>{
            Vehicle.find()
                .then(this.render(resp,next))
                .catch(next);
        });

        application.get('/vehicle/:id', (req, resp, next) => {
            let id : string = req.params.id;
            Vehicle.findById(id)
                .then(this.render(resp,next))
                .catch(next);
        });

        application.post('/vehicle',(req, resp,next) => {
            let taks = new Vehicle(req.body);

            taks.save()
                .then(this.render(resp,next))
                .catch(next);;
        });

        application.patch('/vehicle/:id', (req,resp,next) =>{
            // retorna o objeto alterado
            const options = {new:true, runValidators: true};
            Vehicle.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp,next))
                .catch(next);
        });

        application.del('/vehicle/:id', (req,resp,next) =>{
            Vehicle.remove({_id: req.params.id})
                .exec()
                .then((cmdResult : any) => {
                    if(cmdResult.result.n){
                        resp.send(204);
                    }
                    else
                        throw new NotFoundError("Documento não encontrado");

                    return next();
                })
                .catch(next);
        });
    }
}

export const vehicleRouter = new VehicleRouter();
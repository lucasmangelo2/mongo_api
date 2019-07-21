import {Router} from '../common/router';
import * as restify from 'restify';

import {NotFoundError} from 'restify-errors';
import { Animal } from '../models/animal.model';

class AnimalRouter extends Router {

    constructor(){
        super();
    }

    applyRoutes(application: restify.Server) {
        application.get('/animal', (req, resp, next) =>{
            Animal.find()
                .then(this.render(resp,next))
                .catch(next);
        });

        application.get('/animal/:id', (req, resp, next) => {
            let id : string = req.params.id;
            Animal.findById(id)
                .then(this.render(resp,next))
                .catch(next);
        });

        application.post('/animal',(req, resp,next) => {
            let taks = new Animal(req.body);

            taks.save()
                .then(this.render(resp,next))
                .catch(next);;
        });

        application.patch('/animal/:id', (req,resp,next) =>{
            // retorna o objeto alterado
            const options = {new:true, runValidators: true};
            Animal.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp,next))
                .catch(next);
        });

        application.del('/animal/:id', (req,resp,next) =>{
            Animal.remove({_id: req.params.id})
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

export const animalRouter = new AnimalRouter();
import * as restfy from 'restify'


export const handlerError = (req: restfy.Request, resp: restfy.Response, err, done) => {
    
    err.toJSON = () => {
        return {
            message: err.message
        }
    }

    switch(err.name){
        case 'MongoError':
            if(err.code == 11000)
                err.statusCode = 400;
            
            break;
        case 'ValidationError':
            err.statusCode = 400;
            const messages: any[] = []

            // tratamento adequado para validação de campos no mongoose
            for(let index in err.errors)
                messages.push({message: err.errors[index].message})
            
            err.toJSON = () => {
                return {
                    erros: messages
                }
            }

            break;
    }

    done();
}
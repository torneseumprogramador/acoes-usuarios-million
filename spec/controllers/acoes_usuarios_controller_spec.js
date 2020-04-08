const supertest = require('supertest');
const  AcoesUsuario = require('../../app/models/acoes_usuario');
const TOKEN="87uj99882320of"
const app = require('../../app.js');

const request = supertest(app);



describe("AcoesUsuariosController", () =>{
    beforeEach(async() => {
      await AcoesUsuario.deleteMany({}, async(err, removed) => {
        await AcoesUsuario.create({
          codigo_usuario: 5,
          codigo_acao: 5,
          valor_investido: 1500000
          
        });
  
        await AcoesUsuario.create({
            codigo_usuario: 6,
            codigo_acao: 6,
            valor_investido: 5500000
            
          });
    
        });
      });
    });

    describe('POST/acoes-usuarios.json-Deve retornar se o controller acoes-usuarios(AcoesUsuariosController)',() =>{

        it('cadastrou um registro  acoes_usuario', async(done) =>{

            body={
                codigo_usuario:11,
                codigo_acao:11,
                valor_investido:99000000
            }

            const response = await request.post('/acoes-usuarios.json').set('token',TOKEN).send(body)
            expect(response.status).toBe(201);
            done();
        })
    })
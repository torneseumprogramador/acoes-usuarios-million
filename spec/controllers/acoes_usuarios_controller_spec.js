const supertest = require('supertest');
const  AcoesUsuario = require('../../app/models/acoes_usuario');
const app = require('../../app.js');
const request = supertest(app);

const TOKEN= "87uj99882320of"

describe("AcoesUsuariosController", () =>{
    beforeEach(async() => {
      await AcoesUsuario.deleteMany({}, async(err, removed) => {
        await AcoesUsuario.create({
          codigo_usuario: 5,
          codigo_acao: "ciel3",
          valor_investido: 1500000,
          percentual: 7.20
          
        });
  
        await AcoesUsuario.create({
            codigo_usuario: 6,
            codigo_acao: "abev3",
            valor_investido: 5500000,
            percentual: 8.33
          });
        });
      });
    });

    describe('POST/acoes-usuarios.json-Deve retornar se o controller acoes-usuarios(AcoesUsuariosController)',() =>{

        it('cadastrou um registro acoes_usuario', async(done) =>{

            body = {
              codigo_usuario:11,
              codigo_acao:"abev4",
              valor_investido:99000000,
              percentual: 6.13
            }

            const response = await request.post('/acoes-usuarios.json').set('token',TOKEN).send(body);
            expect(response.status).toBe(201);
            done();
        });
      });


     describe('GET/acoes-usuarios.json - Deve Buscar  registros cadastrados',() =>{
      it('Deve retornar o Statuscode 200 ', async(done) =>{
        const response = await request.get('/acoes-usuarios.json').set('token',TOKEN);
        expect(response.status).toBe(200);
        done();
      });
     });

    
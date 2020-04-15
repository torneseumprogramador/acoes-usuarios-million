const AcoesUsuario = require("../../app/models/acoes_usuario");
describe("AcoesUsuario", () => {

  beforeEach(async() => {
    await AcoesUsuario.deleteMany({}, async(err,removed) => {
      
      await AcoesUsuario.create({
        codigo_usuario: 1,
        codigo_acao:"petr4",
        valor_investido: 15.30,
        percentual: 7
      })
      
      await AcoesUsuario.create({
        codigo_usuario: 1,
        codigo_acao:"petr4",
        valor_investido: 1220,
        percentual: 4
      })
    
      await AcoesUsuario.create({
        codigo_usuario: 2,
        codigo_acao:"petr4",
        valor_investido: 158,
        percentual: 6.5
      })
      
      await AcoesUsuario.create({
        codigo_usuario: 1,
        codigo_acao:"bidi4",
        valor_investido: 185,
        percentual: 11
      })
    })
  })

  describe("Deve retornar se o modelo de AcoesUsuario", () => {
    it('retornou o valor investido', (done) => {
        AcoesUsuario.findOne({}).exec( async(err, acao) => {
        let nome = `teste ${new Date().getTime()}`;
        let valorInvestido = await AcoesUsuario.valorInvestidoPorAcao(acao.codigo_usuario, acao.codigo_acao)  ;
        expect(valorInvestido.total != null && valorInvestido.total != undefined).toBe(true);
        expect(valorInvestido.acao != null && valorInvestido.acao != undefined).toBe(true);
        done();
      })
    });
  })
   
   it('Foi criado',(done)=>{AcoesUsuario.create({codigo_usuario: "1",codigo_acao:"ZM007",valor_investido:45,percentual:15},(err,res)=>{
     expect(err == undefined  || err == null).toBe(true)})
     done();
  })

    it('alterou  o valor investido', async(done) => {
      let acao = await AcoesUsuario.create({
        codigo_usuario:"6546asd654a",
        codigo_acao: "Sab4",
        valor_investido: 3600,
        percentual: 8
      });

      let acao_alterada = await AcoesUsuario.findByIdAndUpdate( acao._id, {valor_investido: 1550,percentual:50},{new: true});
      
      expect(acao_alterada !==null  && acao_alterada !==undefined).toBe(true)
      expect(acao_alterada.valor_investido == 1550).toBe(true)
      done();
    });
  
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
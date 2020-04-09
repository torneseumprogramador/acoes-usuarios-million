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
    it('retornou o valor investido', () => {
      let acao = AcoesUsuario.findOne({}).exec( async(err, acao) => {
        let nome = `teste ${new Date().getTime()}`;
        let valorInvestido = await AcoesUsuario.valorInvestidoPorAcao(acao.codigo_usuario, acao.codigo_acao);
        expect(valorInvestido.total != null && valorInvestido.total != undefined).toBe(true);
        expect(valorInvestido.acao != null && valorInvestido.acao != undefined).toBe(true);
      })
    });
  })
})
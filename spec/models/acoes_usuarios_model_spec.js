const AcaoUsuario = require("../../app/models/acao_usuario");
describe("AcoesUsuarioController", () => {

  beforeEach(async() => {
    await AcaoUsuario.deleteMany({}, async(err,removed) => {
      
      await AcaoUsuario.create({
        codigo_usuario: 1,
        codigo_acao:"petr4",
        valor_investido: 15.30})
      
      await AcaoUsuario.create({
        codigo_usuario: 1,
        codigo_acao:"petr4",
        valor_investido: 1220})
    
      await AcaoUsuario.create({
        codigo_usuario: 2,
        codigo_acao:"petr4",
        valor_investido: 158})
      
      await AcaoUsuario.create({
        codigo_usuario: 1,
        codigo_acao:"bidi4",
        valor_investido: 185})
    })
  })

  describe("Deve retornar se o modelo de AcaoUsuario", () => {
    it('retornou os valores investidos', () => {
      let nome = `teste ${new Date().getTime()}`;
      let acoes = AcaoUsuario.valorInvestidoPorAcao();
      acoes.map((acao) => {
        console.log(acao);
      })
    });
  })
})